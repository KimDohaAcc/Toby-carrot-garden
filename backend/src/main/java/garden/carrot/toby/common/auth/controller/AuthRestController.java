package garden.carrot.toby.common.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.common.auth.dto.AuthDto;
import garden.carrot.toby.common.auth.service.AuthService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthRestController {
	private final AuthService authService;
	/*
		하는 일: 토큰 코드 검증 후 response body 안에 토큰 값 넣어 줄 것임.
	 */

	@PostMapping("/token")
	public ApiResponse<AuthDto.SigninResponse> getOauth2Token(@RequestBody AuthDto.tokenRequest request) {
		AuthDto.SigninResponse tokens = authService.getOauthSigninToken(request.getTokenCode());
		return ApiResponse.success(SuccessCode.GET_SUCCESS, tokens);
	}
}
