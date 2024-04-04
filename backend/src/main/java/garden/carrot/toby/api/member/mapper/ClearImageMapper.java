package garden.carrot.toby.api.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import garden.carrot.toby.api.member.dto.ClearImageDto;
import garden.carrot.toby.domain.clearimage.entity.ClearImage;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClearImageMapper {
	@Mapping(target = "clearImageId", source = "clearImage.id")
	@Mapping(target = "placeId", source = "clearImage.placeData.id")
	ClearImageDto.Response clearImageToClearImageDtoResponse(ClearImage clearImage);
}
