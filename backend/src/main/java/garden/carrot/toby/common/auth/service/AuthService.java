package garden.carrot.toby.common.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import garden.carrot.toby.common.auth.dto.AuthDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AuthService {

	// code: 인가코드
	@Transactional
	public String kakaoCallback(String code) {
		// 인가코드로 카카오 토큰 받기

		// 카카오 토큰으로 유저 정보 확인

		// db에서 멤버 있는지 확인

		// 없으면 멤버 생성, signupComplete: false로 변경

		// 멤버 PK 이용해 access 토큰, refresh토큰 발급

		// 토큰코드 생성 - uuid 생성

		// 생성한 uuid를 키로 하고, accessToken, refreshToken, signupComplete 저장

		// 토큰 코드 리턴

		return "tokenCode";
	}

	@Transactional
	public AuthDto.SigninResponse getOauthSigninToken(String tokenCode) {
		// 레디스에서 tokenCode에 해당하는 값 찾아서 반환

		return null;
	}
}
