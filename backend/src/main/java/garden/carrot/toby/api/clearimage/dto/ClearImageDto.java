package garden.carrot.toby.api.clearimage.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

public class ClearImageDto {

	@Getter
	@AllArgsConstructor
	public static class ClearImageResponse {

		private String clearImageUrl;
	}

	@Getter
	@AllArgsConstructor
	public static class ClearImageRequest {

		@NotNull
		MultipartFile image;
		@NotNull
		Integer placeId;
	}
}
