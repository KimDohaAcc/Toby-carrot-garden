package garden.carrot.toby.api.story.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.api.member.dto.CarrotDto;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.service.StoryService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping()
@RequiredArgsConstructor
@Slf4j
public class StoryController {

	private final StoryService storyService;

	@PostMapping(value = "/quiz/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<String> submitQuiz(@ModelAttribute SubmitQuizRequest dto) throws Exception {
		String url = storyService.submitQuiz(dto);

		return ApiResponse.success(SuccessCode.POST_SUCCESS, url);
	}

	@PatchMapping(value = "/place/{place_id}/carrot")
	public ApiResponse<CarrotDto.PatchResponse> submitQuiz(@PathVariable("place_id") int placeId) {

		return ApiResponse.success(SuccessCode.PATCH_SUCCESS, storyService.patchCarrotCount(placeId));
	}

}
