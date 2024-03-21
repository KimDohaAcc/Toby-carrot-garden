package garden.carrot.toby.common.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class AuthDto {

	@Getter
	@NoArgsConstructor
	@ToString
	@AllArgsConstructor
	public static class tokenRequest {
		private String tokenCode;

	}

	@Getter
	@AllArgsConstructor
	@ToString
	public static class kakaoUriResponse {
		private String uri;
	}

	@Getter
	@NoArgsConstructor
	@ToString
	public static class SigninResponse {
		private Integer memberId;
		private String accessToken;
		private String refreshToken;
		@Setter
		private Boolean signupComplete;

		@Builder
		public SigninResponse(String memberId, String accessToken, String refreshToken,
			Boolean signupComplete) {
			this.memberId = Integer.parseInt(memberId);
			this.accessToken = accessToken;
			this.refreshToken = refreshToken;
			this.signupComplete = signupComplete;
		}
	}

}
