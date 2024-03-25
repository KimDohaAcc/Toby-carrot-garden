package garden.carrot.toby.api.member.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ClearImageDto {

	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response {
		private int clearImageId;
		private String clearImageUrl;
		private int placeId;
		private LocalDateTime createdTime;
	}
}
