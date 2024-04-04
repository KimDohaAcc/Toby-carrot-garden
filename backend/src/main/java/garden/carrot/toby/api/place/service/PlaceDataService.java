package garden.carrot.toby.api.place.service;

import garden.carrot.toby.api.place.dto.StoryDataDto;
import garden.carrot.toby.api.place.mapper.StoryDataMapper;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.dto.ListDto;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.placedata.entity.PlaceData;
import garden.carrot.toby.domain.placedata.repository.PlaceDataRepository;
import garden.carrot.toby.domain.storydata.repository.StoryDataRepository;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceDataService {

	private final PlaceDataRepository placeDataRepository;
	private final StoryDataRepository storyDataRepository;
	private final StoryDataMapper storyDataMapper;


	public ListDto<StoryDataDto.StoryResponse> getStoryListByPlaceDataId(Integer placeDataId) {
		return Optional.ofNullable(storyDataRepository.findAllByPlaceData_Id(placeDataId))
			.filter(dataList -> !dataList.isEmpty())
			.map(dataList -> new ListDto<>(dataList.stream()
				.map(storyDataMapper::toStoryResponse)
				.collect(Collectors.toList())))
			.orElseThrow(() -> new CustomException(ErrorCode.NO_ID, "[place_id : " + placeDataId + "] does not exist"));
	}

	public Optional<PlaceData> getPlaceDataById(Integer placeDataId) {
		return placeDataRepository.findPlaceDataById(placeDataId);
	}
}
