package garden.carrot.toby.api.story.controller;

import garden.carrot.toby.api.member.dto.CarrotDto;
import garden.carrot.toby.api.story.dto.QuizDto.QuizResultResponse;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.dto.SceneDataDto;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizResponse;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StoryController {

    private final StoryService storyService;

    @PostMapping(value = "/quiz/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<SubmitQuizResponse> submitQuiz(@ModelAttribute SubmitQuizRequest dto) throws Exception {
        return ApiResponse.success(SuccessCode.POST_SUCCESS, storyService.submitQuiz(dto));
    }

    @GetMapping(value = "/quiz/{member_quiz_id}/result")
    public ApiResponse<QuizResultResponse> getQuizResult(@PathVariable("member_quiz_id") int memberQuizID) throws Exception {
        return ApiResponse.success(SuccessCode.GET_SUCCESS, storyService.getQuizResult(memberQuizID));
    }

    @GetMapping("/story/{storyId}")
    public ApiResponse<ListDto<SceneDataDto.SceneDataResponse>> getSceneList(@PathVariable Integer storyId) {
        return ApiResponse.success(SuccessCode.GET_SUCCESS, storyService.findSceneDataList(storyId));
    }

    @PatchMapping(value = "/place/{place_id}/carrot")
    public ApiResponse<CarrotDto.PatchResponse> setQuizCarrot(@PathVariable("place_id") int placeId) {

        return ApiResponse.success(SuccessCode.PATCH_SUCCESS, storyService.patchCarrotCount(placeId));
    }
}
