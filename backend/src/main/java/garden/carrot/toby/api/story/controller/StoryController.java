package garden.carrot.toby.api.story.controller;


import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.service.StoryService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class StoryController {

	private final StoryService storyService;

	@PostMapping(value = "/quiz/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<String> submitQuiz(@ModelAttribute SubmitQuizRequest dto) throws Exception{
		String url = storyService.submitQuiz(dto);

		return ApiResponse.success(SuccessCode.POST_SUCCESS, url);
	}

	@PostMapping(value = "/quiz/{quiz_id}/result", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<Integer> getQuizResult(@PathVariable("quiz_id") int quizID) throws Exception{
		int score = storyService.getQuizResult(quizID);

		return ApiResponse.success(SuccessCode.POST_SUCCESS, score);
	}


}
