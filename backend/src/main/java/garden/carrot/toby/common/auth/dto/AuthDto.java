package garden.carrot.toby.common.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class AuthDto {
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
