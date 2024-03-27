package garden.carrot.toby.api.story.controller;


import garden.carrot.toby.api.story.dto.QuizDto.QuizResultResponse;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizResponse;
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
	public ApiResponse<SubmitQuizResponse> submitQuiz(@ModelAttribute SubmitQuizRequest dto) throws Exception{
		return ApiResponse.success(SuccessCode.POST_SUCCESS, storyService.submitQuiz(dto));
	}

	@GetMapping(value = "/quiz/{quiz_id}/result")
	public ApiResponse<QuizResultResponse> getQuizResult(@PathVariable("quiz_id") int quizID) throws Exception{
		return ApiResponse.success(SuccessCode.GET_SUCCESS, storyService.getQuizResult(quizID));
	}


}
