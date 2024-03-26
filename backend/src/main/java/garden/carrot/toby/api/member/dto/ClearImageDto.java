package garden.carrot.toby.api.member.dto;

import java.time.LocalDateTime;

import garden.carrot.toby.common.util.TimeUtil;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ClearImageDto {

	@Getter
	@NoArgsConstructor
	public static class Response {
		private int clearImageId;
		private String clearImageUrl;
		private int placeId;
		private String createdTime;

		@Builder
		public Response(int clearImageId, String clearImageUrl, int placeId, LocalDateTime createdTime) {
			this.clearImageId = clearImageId;
			this.clearImageUrl = clearImageUrl;
			this.placeId = placeId;
			this.createdTime = TimeUtil.formatLocalDateTime(createdTime);
		}
	}
}
