package garden.carrot.toby.auth.service;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import garden.carrot.toby.auth.dto.AuthDto;
import garden.carrot.toby.auth.dto.KakaoDto;
import garden.carrot.toby.auth.entity.Member;
import garden.carrot.toby.auth.jwt.TokenProvider;
import garden.carrot.toby.auth.repository.MemberRepository;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AuthService {
	private final ExternalApiService externalApiService;
	private final MemberRepository memberRepository;
	private final TokenProvider tokenProvider;
	private final RedisTemplate<String, AuthDto.SigninResponse> redisTemplate;

	// code: 인가코드
	@Transactional
	public String kakaoCallback(String code) {
		// === 인가코드로 카카오 토큰 받기

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
			e.printStackTrace();
			throw new CustomException(ErrorCode.KAKAO_TOKEN_NOT_ISSUED, code);
		}

		// === 카카오 토큰으로 유저 정보 확인
		URI kakaoUserInfoUri = UriComponentsBuilder
			.fromUriString("https://kapi.kakao.com/v2")
			.path("/user/me")
			.encode()
			.build()
			.toUri();
		String kakaoAccessToken = kakaoToken.getAccessToken();

		System.out.println("카카오 토큰: " + kakaoAccessToken);
		KakaoDto.UserInfo userInfo = null;
		try {
			userInfo = externalApiService.sendPostRequest(kakaoUserInfoUri, requestDto,
				KakaoDto.UserInfo.class, kakaoAccessToken);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException(ErrorCode.KAKAO_GET_USER_INFO_FAILED, kakaoAccessToken);
		}

		System.out.println(userInfo);

		// === db에서 멤버 있는지 확인, 없으면 멤버 생성
		Long kakaoUserId = userInfo.getId();
		// 추가 정보 입력 여부
		boolean signupComplete = false;
		Optional<Member> optionalMember = memberRepository.findMemberBySerialNumber(kakaoUserId);
		Member member = null;
		if (optionalMember.isEmpty()) {
			System.out.println("멤버 없어요~");
			member = new Member(kakaoUserId);
			memberRepository.save(member);
		}
		if (optionalMember.isPresent()) {
			System.out.println("멤버 있어요~");
			member = optionalMember.get();
			if (member.getBirthDate() != null && member.getNickname() != null && member.getParentPassword() != null) {
				signupComplete = true;
				System.out.println("회원가입 완료된 멤버네요~");
			}
		}

		// === 멤버 PK 이용해 access 토큰, refresh토큰 발급

		Authentication authentication = new UsernamePasswordAuthenticationToken(member.getId(),
			member.getSerialNumber());
		// SecurityContextHolder에 로그인 한 유저 정보 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);
		log.info("로그인 후 SecurityContextHolder에 저장된 사용자 :::::: {}",
			SecurityContextHolder.getContext().getAuthentication().getName());

		AuthDto.SigninResponse authResponse = tokenProvider.generateTokenResponse(authentication);
		authResponse.setSignupComplete(signupComplete);
		log.info("Authentication : {}", authentication.toString());
		System.out.println(authResponse);

		// Refresh Token Redis에 저장
		// tokenUtil.setRefreshToken(authResponse.getRefreshToken());

		// === 토큰코드 생성 - uuid 생성
		String uuid = UUID.randomUUID().toString();
		String tokenCode = "tokencode-" + uuid;

		// === 생성한 uuid를 키로 하고, accessToken, refreshToken, signupComplete 저장
		redisTemplate.opsForValue().set(tokenCode, authResponse);

		// === 토큰 코드 리턴

		return tokenCode;
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
}
