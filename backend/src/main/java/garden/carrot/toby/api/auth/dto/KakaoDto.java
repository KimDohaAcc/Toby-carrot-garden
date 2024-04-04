package garden.carrot.toby.api.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import garden.carrot.toby.api.auth.constatnts.KakaoConstants;
import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
	@NoArgsConstructor
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

	@ToString
	@NoArgsConstructor
	@Getter
	public static class UserInfo {

		// json이랑 이름이 똑같은데도 값이 안 들어와서 JsonProperty 추가
		@JsonProperty("id")
		private Long id;
		@JsonProperty("connected_at")
		private String connectedAt; // Datetime을 String으로 표현
	}

}
