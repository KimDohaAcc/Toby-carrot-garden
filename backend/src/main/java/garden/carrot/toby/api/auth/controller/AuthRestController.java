package garden.carrot.toby.api.auth.controller;

import garden.carrot.toby.api.auth.constatnts.KakaoConstants;
import garden.carrot.toby.api.auth.dto.AuthDto;
import garden.carrot.toby.api.auth.dto.MemberDto;
import garden.carrot.toby.api.auth.service.AuthService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthRestController {

	private final AuthService authService;

	/**
	 * 카카오 oauth2 로그인 주소 반환
	 */
	@GetMapping("/oauth2/kakao")
	public ApiResponse<AuthDto.KakaoUriResponse> kakaoOauth2(HttpServletRequest request) {
		String uri =
			"https://kauth.kakao.com/oauth/authorize?client_id=" + KakaoConstants.getClientId()
				+ "&redirect_uri=" + KakaoConstants.getRedirectUri() + "&response_type=code";

		return ApiResponse.success(SuccessCode.GET_SUCCESS, new AuthDto.KakaoUriResponse(uri));
	}

	/**
	 * 토큰 코드 검증 후 우리 서버 토큰 반환
	 */
	@PostMapping("/token")
	public ApiResponse<AuthDto.SigninResponse> getOauth2Token(
		@RequestBody AuthDto.TokenRequest request) {
		AuthDto.SigninResponse tokens = authService.getOauthSigninToken(request.getTokenCode());
		return ApiResponse.success(SuccessCode.GET_SUCCESS, tokens);
	}

	/**
	 * 회원가입 추가 진행
	 */
	@PostMapping("/signup")
	public ApiResponse<AuthDto.SignupExtraResponse> signup(
		@Valid @RequestBody AuthDto.SignupExtraRequest request) {
		AuthDto.SignupExtraResponse response = authService.signup(request);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
	}

	/**
	 * 자기 정보 반환
	 */
	@GetMapping("/member-info")
	public ApiResponse<MemberDto.Response> getMemberInfo() {
		MemberDto.Response response = authService.getMemberInfo();

		return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
	}
}
