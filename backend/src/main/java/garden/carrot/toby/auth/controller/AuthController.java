package garden.carrot.toby.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import garden.carrot.toby.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {
	private final AuthService authService;
	@Value("${DOMAIN.FRONT}")
	private String FRONTEND_DOMAIN; // 도메인:포트

	/*
	하는 일: 인가코드를 이용해 카카오 토큰 받고, 우리 토큰 만들고, 우리토큰 코드를 query String 형태로 돌려주기
	우리 토큰 코드를 주는 이유: 다시 토큰 받기 API 호출하면 거기서 토큰 코드 검증 후 response body 안에 토큰 값 넣어 줄 것임.
	의문: 그냥 브라우저 uri로 accessToken 주는 것보다 나은 점이 뭐지?
	gpt 답변:  URL에 포함된 토큰을 훔쳐간 공격자가 해당 토큰을 사용하여 사용자의 계정에 접근하거나 권한이 필요한 작업을 수행할 수 있습니다.
	 */
	@GetMapping("/oauth2/kakao/callback")
	public String kakaoCallback(@RequestParam String code) {
		System.out.println("인가코드: " + code);

		// 우리 서버가 발급해준 토큰 코드_레디스 안에 키 값으로 쓰임. value에는 accesstoken과 refreshtoken이 있음.
		String tokenCode;
		try {
			// TODO: 인가코드로 카카오토큰 받고 우리 토큰 레디스에 저장
			tokenCode = authService.kakaoCallback(code);
		} catch (Exception e) {
			exceptionUtil.sendExceptionToDiscord(e);
		}

		return "redirect:http://" + FRONTEND_DOMAIN + "/auth?tokenCode=" + tokenCode;
	}
}
