package garden.carrot.toby.api.auth.service;

import garden.carrot.toby.api.auth.dto.AuthDto;
import garden.carrot.toby.api.auth.dto.KakaoDto;
import garden.carrot.toby.api.auth.dto.MemberDto;
import garden.carrot.toby.api.auth.jwt.TokenProvider;
import garden.carrot.toby.api.auth.mapper.MemberMapper;
import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.exception.ExceptionUtil;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.member.repository.MemberRepository;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AuthService {

	private final ExceptionUtil exceptionUtil;
	private final ExternalApiService externalApiService;
	private final MemberRepository memberRepository;
	private final TokenProvider tokenProvider;
	private final RedisTemplate<String, AuthDto.SigninResponse> redisTemplate;
	private final MemberUtil memberUtil;
	private final PasswordEncoder passwordEncoder;
	private final MemberMapper memberMapper;

	/**
	 * 카카오 콜백
	 *
	 * @param code 카카오에서 발급해준 인가코드
	 * @return 우리 서버에서 발급해준 토큰코드. 토큰코드로 레디스에 있는 토큰 값을 찾을 수 있다.
	 */
	@Transactional
	public String kakaoCallback(String code) {
		// === 인가코드로 카카오 토큰 받기
		KakaoDto.TokenResponse kakaoToken = getKakaoToken(code);

		// === 카카오 토큰으로 유저 정보 확인
		KakaoDto.UserInfo userInfo = getKakaoUserInfo(kakaoToken);

		// === db에서 멤버 있는지 확인, 없으면 멤버 생성
		Long kakaoUserId = userInfo.getId();
		Member member = findOrCreateMemberBySerialNumber(kakaoUserId);

		// 추가 정보 입력 여부
		boolean signupComplete = isSignupComplete(member);

		// === 멤버 PK 이용해 access 토큰, refresh토큰 발급

		Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(),
			member.getSerialNumber());
		// SecurityContextHolder에 로그인 한 유저 정보 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);

		AuthDto.SigninResponse authResponse = tokenProvider.generateTokenResponse(authentication);
		authResponse.setSignupComplete(signupComplete);

		// Refresh Token Redis에 저장

		// === 토큰코드 생성 - uuid 생성
		String uuid = UUID.randomUUID().toString();
		String tokenCode = "tokencode-" + uuid;

		// === 생성한 uuid를 키로 하고, accessToken, refreshToken, signupComplete 저장
		redisTemplate.opsForValue().set(tokenCode, authResponse);

		// === 토큰 코드 리턴
		return tokenCode;
	}

	/**
	 * db에서 멤버 있는지 확인 후 없으면 create
	 *
	 * @param serialNumber 카카오 UserInfo의 id
	 * @return 찾은 멤버
	 */
	@Transactional
	public Member findOrCreateMemberBySerialNumber(Long serialNumber) throws CustomException {
		Optional<Member> optionalMember = memberRepository.findMemberBySerialNumber(serialNumber);
		Member member = null;
		// 멤버 없음
		if (optionalMember.isEmpty()) {
			member = new Member(serialNumber);
			memberRepository.save(member);

		}
		// 멤버 있음
		if (optionalMember.isPresent()) {
			member = optionalMember.get();

		}
		return member;
	}

	/**
	 * 회원가입 완료 여부 반환
	 *
	 * @param member DB에 저장된 멤버
	 * @return 찾은 멤버
	 */
	private boolean isSignupComplete(Member member) {
		// 회원가입 완료된 멤버
		return member.getBirthDate() != null && member.getName() != null
			&& member.getParentPassword() != null;
	}

	/**
	 * 인가코드로 카카오 토큰 받기
	 *
	 * @param code 카카오가 발급해준 인가코드
	 * @return 카카오 토큰
	 * @throws CustomException
	 */
	@Transactional
	public KakaoDto.TokenResponse getKakaoToken(String code) throws CustomException {
		// DTO 클래스 생성
		KakaoDto.TokenRequest requestDto = KakaoDto.TokenRequest.builder().code(code).build();
		URI kakaoTokenUri = UriComponentsBuilder
			.fromUriString("https://kauth.kakao.com")
			.path("/oauth/token")
			.encode()
			.build()
			.toUri();
		KakaoDto.TokenResponse kakaoToken = null;

		try {
			kakaoToken = externalApiService.sendPostRequest(kakaoTokenUri, requestDto,
				KakaoDto.TokenResponse.class);
		} catch (Exception e) {
			exceptionUtil.sendExceptionToDiscord(e);
			throw new CustomException(ErrorCode.KAKAO_TOKEN_NOT_ISSUED, code);
		}
		return kakaoToken;
	}

	/**
	 * 카카오 토큰으로 유저 정보 확인
	 *
	 * @param kakaoToken 카카오가 발급해준 xhzms
	 * @return 카카오 토큰
	 * @throws CustomException
	 */
	@Transactional
	public KakaoDto.UserInfo getKakaoUserInfo(KakaoDto.TokenResponse kakaoToken)
		throws CustomException {
		URI kakaoUserInfoUri = UriComponentsBuilder
			.fromUriString("https://kapi.kakao.com/v2")
			.path("/user/me")
			.encode()
			.build()
			.toUri();

		String kakaoAccessToken = kakaoToken.getAccessToken();

		KakaoDto.UserInfo userInfo = null;
		try {
			userInfo = externalApiService.sendPostRequest(kakaoUserInfoUri, null,
				KakaoDto.UserInfo.class, kakaoAccessToken);
		} catch (Exception e) {
			exceptionUtil.sendExceptionToDiscord(e);
			throw new CustomException(ErrorCode.KAKAO_GET_USER_INFO_FAILED, kakaoAccessToken);
		}

		return userInfo;
	}

	@Transactional
	public AuthDto.SigninResponse getOauthSigninToken(String tokenCode) throws CustomException {
		// 레디스에서 tokenCode에 해당하는 값 찾아서 반환
		AuthDto.SigninResponse redisResponse = redisTemplate.opsForValue().getAndDelete(tokenCode);

		if (redisResponse == null) {
			throw new CustomException(ErrorCode.BAD_TOKENCODE, tokenCode);
		}

		return redisResponse;
	}

	@Transactional
	public AuthDto.SignupExtraResponse signup(AuthDto.SignupExtraRequest request) {
		Member member = memberUtil.getLoginMember();
		String encodedPassword = passwordEncoder.encode(request.getParentPassword());
		member.signup(encodedPassword, request.getName(), request.getBirthDate());
		return new AuthDto.SignupExtraResponse(member.getId());
	}

	public MemberDto.Response getMemberInfo() {
		Member member = memberUtil.getLoginMember();
		if (!isSignupComplete(member)) {
			throw new CustomException(ErrorCode.SIGNUP_NOT_COMPLETE);
		}
		return memberMapper.MemberToMemberDtoResponse(member);
	}
}
