package garden.carrot.toby.common.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class AuthDto {
	@Getter
	@AllArgsConstructor
	public static class SigninResponse {

		private String accessToken;
		private String refreshToken;
		private Boolean signupComplete;
	}

}
