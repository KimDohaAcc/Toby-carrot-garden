package garden.carrot.toby.api.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
