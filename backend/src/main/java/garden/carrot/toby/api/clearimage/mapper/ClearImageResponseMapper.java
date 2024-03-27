package garden.carrot.toby.api.clearimage.mapper;

import garden.carrot.toby.api.clearimage.dto.ClearImageDto;
import garden.carrot.toby.domain.clearimage.entity.ClearImage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClearImageResponseMapper {

	ClearImageDto.ClearImageResponse toClearImageResponse(ClearImage clearImage);
}
