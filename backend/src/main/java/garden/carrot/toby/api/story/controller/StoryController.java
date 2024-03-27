package garden.carrot.toby.api.story.controller;


import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.dto.SceneDataDto;
import garden.carrot.toby.api.story.service.StoryService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.common.dto.ListDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/story")
@RequiredArgsConstructor
@Slf4j
public class StoryController {

	private final StoryService storyService;

	@PostMapping(value = "/quiz/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<String> submitQuiz(@ModelAttribute SubmitQuizRequest dto) throws Exception {
		String url = storyService.submitQuiz(dto);

		return ApiResponse.success(SuccessCode.POST_SUCCESS, url);
	}

	@GetMapping("/{storyId}")
	public ApiResponse<ListDto<SceneDataDto.SceneDataResponse>> getSceneList(@PathVariable Integer storyId) {
		return ApiResponse.success(SuccessCode.GET_SUCCESS, storyService.findSceneDataList(storyId));
	}
}
