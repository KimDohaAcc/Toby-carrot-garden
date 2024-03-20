package garden.carrot.toby.common.auth.dto;

import java.io.Serializable;

import garden.carrot.toby.common.auth.constatnts.KakaoConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class KakaoDto {
	@Getter
	@ToString
	// 인가 코드로 토큰 발급을 요청
	public static class TokenRequest implements Serializable {

		private final String grantType = "authorization_code";
		private final String clientId = KakaoConstants.getClientId();
		private final String redirectUri = KakaoConstants.getRedirectUri();
		private final String code;
		// private String clientSecret;

		@Builder
		public TokenRequest(String code) {
			this.code = code;
		}

	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Setter
	@ToString
	// 인가 코드로 토큰 발급 받음
	public static class TokenResponse {

		private String tokenType;
		private String accessToken;
		private String idToken;
		private int expiresIn;
		private String refreshToken;
		private int refreshTokenExpiresIn;
		private String scope;
	}

}
