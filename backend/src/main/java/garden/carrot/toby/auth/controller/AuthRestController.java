package garden.carrot.toby.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.auth.constatnts.KakaoConstants;
import garden.carrot.toby.auth.dto.AuthDto;
import garden.carrot.toby.auth.service.AuthService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthRestController {
	private final AuthService authService;
	@Value("${DOMAIN.FRONT}")
	private String FRONTEND_DOMAIN; // 도메인:포트

	/*
		하는 일: 브라우저 페이지를 kakao 로그인 페이지로 리다이렉트
		이 api의 존재 이유: cliend_id, redirect_uri을 백엔드에서 관리하기 위함
	 */
	@GetMapping("/oauth2/kakao")
	public ApiResponse<AuthDto.kakaoUriResponse> kakaoOauth2(HttpServletRequest request) {
		String uri = "https://kauth.kakao.com/oauth/authorize?client_id=" + KakaoConstants.getClientId()
			+ "&redirect_uri=" + KakaoConstants.getRedirectUri() + "&response_type=code";

		return ApiResponse.success(SuccessCode.GET_SUCCESS, new AuthDto.kakaoUriResponse(uri));
	}
	/*
		하는 일: 토큰 코드 검증 후 response body 안에 토큰 값 넣어 줄 것임.
	 */

	@PostMapping("/token")
	public ApiResponse<AuthDto.SigninResponse> getOauth2Token(@RequestBody AuthDto.tokenRequest request) {
		AuthDto.SigninResponse tokens = authService.getOauthSigninToken(request.getTokenCode());
		return ApiResponse.success(SuccessCode.GET_SUCCESS, tokens);
	}
}
