package garden.carrot.toby.api.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class CarrotDto {
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response {
		private int placeId;
		private int carrotCount;
		private int gradeMax;
		private int carrotGrade;
	}

	@Getter
	@AllArgsConstructor
	@ToString
	public static class PatchResponse {
		private int carrotCount;
	}
}
