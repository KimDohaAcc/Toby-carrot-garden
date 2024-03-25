package garden.carrot.toby.api.story.service;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.api.story.dto.QuizDto;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.util.KafkaProducer;
import garden.carrot.toby.common.s3.dto.S3Dto;
import garden.carrot.toby.common.s3.service.S3Service;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.memberQuiz.repository.MemberQuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoryService {

    private final MemberQuizRepository memberQuizRepository;
    private final KafkaProducer kafkaProducer;
    private final S3Service s3Service;
    private final MemberUtil memberUtil;

    public String submitQuiz(SubmitQuizRequest dto) {
        int memberId = memberUtil.getLoginMember().getId(); // 토큰으로 뭐시기 하는거

//        S3Dto s3 = s3Service.uploadFile(dto.getAnalysisImage());
//        ProducerData data = new ProducerData(s3.getFileKey(), memberId, dto.getQuizId(), "apple");

        ProducerData data = new ProducerData("6ab2f51e-154e-46b4-b7ef-7d5f65907d94", memberId, dto.getQuizId(), "apple");

        log.info("data : {}", data);
        kafkaProducer.sendMessage(data, "detection");
        return "uri";
    }
}
