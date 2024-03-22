package garden.carrot.toby.api.placedata.mapper;

import garden.carrot.toby.api.placedata.dto.StoryDataDto;
import garden.carrot.toby.domain.storydata.entity.StoryData;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StoryDataMapper {

	@Mapping(target = "storyId", source = "id")
	StoryDataDto.StoryResponse toStoryResponse(StoryData storyData);
}
