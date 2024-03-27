package garden.carrot.toby.api.analysis.controller;

import garden.carrot.toby.api.analysis.dto.MemberCertificateReqDto;
import garden.carrot.toby.api.analysis.dto.MemberQuizDto;
import garden.carrot.toby.api.analysis.dto.MemberQuizHistoryDto;
import garden.carrot.toby.api.analysis.dto.MemberQuizRegradeReqDto;
import garden.carrot.toby.api.analysis.service.AnalysisService;
import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("analysis")
public class AnalysisController {
    @Autowired
    private AnalysisService analysisService;

    @GetMapping("/")
    public ApiResponse<String> testConnect(HttpServletRequest request) {

        return ApiResponse.success(SuccessCode.GET_SUCCESS, "Hello Analysis");
    }

    // * 퀴즈 히스토리 리스트 *
    List<MemberQuizHistoryDto> getMemberQuizHistoryDtoListByType( QuizType quizType) {
        List<MemberQuiz> memberQuizList = analysisService.getMemberQuizList(quizType);
        List<MemberQuizHistoryDto> response = new ArrayList<>();

        for(MemberQuiz memberQuiz : memberQuizList) {
            response.add(
                    new MemberQuizHistoryDto(memberQuiz.getId(),memberQuiz.getQuizData().getCorrectAnswer(), memberQuiz.getImageUrl(), memberQuiz.getCreatedTime(), memberQuiz.getScore())
            );
        }

        return response;
    }

    @GetMapping("/drawings")
    @Operation(summary = "표현 퀴즈 목록", description = "사용자의 최근 7일 이내 표현 퀴즈 히스토리를 정렬하여 돌려준다")
    public ApiResponse<List<MemberQuizHistoryDto>> getDrawingsHistory() throws CustomException {
        List<MemberQuizHistoryDto> response = getMemberQuizHistoryDtoListByType(QuizType.DRAWINGS);

        return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
    }

    @GetMapping("/emotion")
    @Operation(summary = "인지, 감정 퀴즈 목록", description = "사용자의 최근 7일 이내 인지, 감정 퀴즈 히스토리를 정렬하여 돌려준다")
    public ApiResponse<List<MemberQuizHistoryDto>> getFeelingsHistory(@RequestParam("id") int memberId) throws CustomException {
        List<MemberQuizHistoryDto> response = getMemberQuizHistoryDtoListByType(QuizType.FEELINGS);

        return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
    }

    @GetMapping("/objects")
    @Operation(summary = "물체 인식 퀴즈 목록", description = "사용자의 최근 7일 이내 물체 인식 퀴즈 히스토리를 정렬하여 돌려준다")
    public ApiResponse<List<MemberQuizHistoryDto>> getObjectsHistory(@RequestParam("id") int memberId) throws CustomException {
        List<MemberQuizHistoryDto> response = getMemberQuizHistoryDtoListByType(QuizType.OBJECTS);

        return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
    }


    @PatchMapping("/regrade")
    @Operation(summary = "재채점 업데이트", description = "재채점 결과를 받아서 사용자 퀴즈의 점수를 업데이트한다.")
    public ApiResponse<MemberQuizDto> patchMemberQuizScore(@RequestBody MemberQuizRegradeReqDto memberQuizRegradeReqDto) throws CustomException {

        MemberQuiz updatedMemberQuiz = analysisService.updateScoreByMemberQuizId(memberQuizRegradeReqDto.getMemberQuizId(), memberQuizRegradeReqDto.getScore());
        MemberQuizDto response = new MemberQuizDto(updatedMemberQuiz.getId(), updatedMemberQuiz.getScore());

        return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
    }

    @PostMapping("/certificate")
    @Operation(summary = "부모 비밀번호 검증", description = "부모 비밀번호를 받아서 검증한다.")
    public ApiResponse<Map<String, Boolean>> patchMemberQuizScore(@RequestBody MemberCertificateReqDto memberCertificateReqDto) throws CustomException {
        Map<String, Boolean> response = new HashMap<>();

        boolean verifyResult = analysisService.verifyParentPassword(memberCertificateReqDto.getParentPassword());
        response.put("isCorrect", verifyResult);

        return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
    }
}
