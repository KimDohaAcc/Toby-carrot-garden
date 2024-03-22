package garden.carrot.toby.api.placedata.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class StoryDataDto {

	@Getter
	@NoArgsConstructor
	@ToString
	public static class StoryResponse {
		@Setter
		Integer storyId;
		String title;
		String storyImageUrl;
		String recommendAge;
	}
}
