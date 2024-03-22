package garden.carrot.toby.api.clearimage.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class ClearImageDto {
	@Getter
	@NoArgsConstructor
	@ToString
	public static class ClearImageResponse {
		private String clearImageUrl;
	}

	@NoArgsConstructor
	public static class ClearImageRequest {
		
	}
}
