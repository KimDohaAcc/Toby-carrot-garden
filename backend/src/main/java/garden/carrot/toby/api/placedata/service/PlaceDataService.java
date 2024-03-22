package garden.carrot.toby.api.placedata.service;

import garden.carrot.toby.api.placedata.dto.StoryDataDto;
import garden.carrot.toby.api.placedata.mapper.StoryDataMapper;
import garden.carrot.toby.common.dto.ListDto;
import garden.carrot.toby.domain.placedata.repository.PlaceDataRepository;
import garden.carrot.toby.domain.storydata.repository.StoryDataRepository;
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
		return new ListDto<>(storyDataRepository.findAllByPlaceData_Id(placeDataId).stream()
			.map(storyDataMapper::toStoryResponse)
			.collect(Collectors.toList()));
	}
}
