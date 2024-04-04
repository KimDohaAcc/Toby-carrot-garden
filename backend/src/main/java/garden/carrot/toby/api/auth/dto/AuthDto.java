package garden.carrot.toby.api.auth.dto;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;
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
	public static class TokenRequest {

		private String tokenCode;

	}

	@Getter
	@AllArgsConstructor
	@ToString
	public static class KakaoUriResponse {

		private String uri;
	}

	@Getter
	@NoArgsConstructor
	public static class SignupExtraRequest {

		@Size(max = 30)
		private String name;
		private LocalDate birthDate;
		@Size(max = 4)
		private String parentPassword;
	}

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class SignupExtraResponse {

		private Integer memberId;
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
