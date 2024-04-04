package garden.carrot.toby.api.place.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class StoryDataDto {

	@Getter
	@AllArgsConstructor
	public static class StoryResponse {

		@Setter
		Integer storyId;
		String title;
		String storyImageUrl;
		String recommendAge;
	}
}
