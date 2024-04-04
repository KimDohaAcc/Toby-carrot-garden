package garden.carrot.toby.api.auth.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class MemberDto {
	@Getter
	@AllArgsConstructor
	@Builder
	public static class Response {
		private String name;
		private LocalDate birthDate;
	}
}
