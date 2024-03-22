package garden.carrot.toby.api.story.service;

import garden.carrot.toby.api.story.dto.QuizDto;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.util.KafkaProducer;
import garden.carrot.toby.common.s3.dto.S3Dto;
import garden.carrot.toby.common.s3.service.S3Service;
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

    public String submitQuiz(SubmitQuizRequest dto) {
        String memberId = "ssafy"; // 토큰으로 뭐시기 하는거

        S3Dto s3 = s3Service.uploadFile(dto.getAnalysisImage());

        ProducerData data = new ProducerData(s3.getFileKey(), memberId, dto.getQuizId(), "apple");
        kafkaProducer.sendMessage(data, "detection");
        return s3.getFileUrl();
    }
}
