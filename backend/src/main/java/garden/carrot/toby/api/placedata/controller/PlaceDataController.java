package garden.carrot.toby.api.placedata.controller;

import garden.carrot.toby.api.placedata.dto.StoryDataDto;
import garden.carrot.toby.api.placedata.service.PlaceDataService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.common.dto.ListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceDataController {

	private final PlaceDataService placeDataService;

	@GetMapping("/{placeId}")
	public ApiResponse<ListDto<StoryDataDto.StoryResponse>> getStoryListByPlaceId(@PathVariable Integer placeId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, placeDataService.getStoryListByPlaceDataId(placeId));
	}
}
