package garden.carrot.toby.api.auth.controller;

import garden.carrot.toby.api.auth.service.AuthService;
import garden.carrot.toby.common.exception.ExceptionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

	@Value("${DOMAIN.FRONT}")
	private String FRONTEND_DOMAIN; // 도메인:포트

	private final AuthService authService;

	private final ExceptionUtil exceptionUtil;

	/**
	 * 하는 일: 인가코드를 이용해 카카오 토큰 받고, 우리 토큰 만들고, 우리토큰 코드를 query String 형태로 돌려주기 우리 토큰 코드를 주는 이유: 다시 토큰
	 * 받기 API 호출하면 거기서 토큰 코드 검증 후 response body 안에 토큰 값 넣어 줄 것임. URL에 포함된 토큰을 훔쳐간 공격자가 해당 토큰을 사용하여
	 * 사용자의 계정에 접근하거나 권한이 필요한 작업을 수행할 수 있으므로 토큰을 바로 uri에 넣어주지 않음
	 *
	 * @param code 카카오 서버가 발급해준 코드
	 * @return 프론트 페이지로 리다이렉트
	 */
	@GetMapping("/oauth2/kakao/callback")
	public String kakaoCallback(@RequestParam String code) {
		// 우리 서버가 발급해준 토큰 코드_레디스 안에 키 값으로 쓰임.
		String tokenCode = "error";

		try {
			// 인가코드로 카카오토큰 받고 우리 토큰 레디스에 저장
			tokenCode = authService.kakaoCallback(code);

		} catch (Exception e) {
			exceptionUtil.sendExceptionToDiscord(e);
		}

		return "redirect:" + FRONTEND_DOMAIN + "/auth?tokenCode=" + tokenCode;
	}
}
