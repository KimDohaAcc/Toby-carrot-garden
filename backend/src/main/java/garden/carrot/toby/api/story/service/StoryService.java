package garden.carrot.toby.api.story.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.api.member.dto.CarrotDto;
import garden.carrot.toby.api.story.dto.QuizDto.ProducerData;
import garden.carrot.toby.api.story.dto.QuizDto.QuizResultResponse;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizRequest;
import garden.carrot.toby.api.story.dto.QuizDto.SubmitQuizResponse;
import garden.carrot.toby.api.story.util.KafkaProducer;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.redis.service.RedisService;
import garden.carrot.toby.common.s3.dto.S3Dto;
import garden.carrot.toby.common.s3.service.S3Service;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.membercarrot.entity.MemberCarrot;
import garden.carrot.toby.domain.membercarrot.repoository.MemberCarrotRepository;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.memberquiz.repository.MemberQuizRepository;
import garden.carrot.toby.domain.placedata.entity.PlaceData;
import garden.carrot.toby.domain.placedata.repository.PlaceDataRepository;
import garden.carrot.toby.domain.quizdata.entity.QuizData;
import garden.carrot.toby.domain.quizdata.repository.QuizDataRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoryService {

	private final MemberQuizRepository memberQuizRepository;
	private final QuizDataRepository quizDataRepository;
	private final PlaceDataRepository placeDataRepository;
	private final MemberCarrotRepository memberCarrotRepository;
	private final KafkaProducer kafkaProducer;
	private final S3Service s3Service;
	private final MemberUtil memberUtil;
	private final RedisService redisService;

	@Transactional
	public SubmitQuizResponse submitQuiz(SubmitQuizRequest dto) throws Exception{

		Member member = memberUtil.getLoginMember();
		QuizData quizData = quizDataRepository.findById(dto.getQuizId())
			.orElseThrow(() -> new CustomException(ErrorCode.NO_ID, dto.getQuizId()));

		// s3 데이터 저장
		S3Dto s3 = s3Service.uploadFile(dto.getAnalysisImage());

		// member Quiz 데이터 저장
		MemberQuiz quiz = MemberQuiz.builder()
			.member(member)
			.quizData(quizData)
			.imageUrl(s3.getFileUrl())
			.score(-1).build();
		memberQuizRepository.save(quiz);

		// kafka 데이터 전송
		ProducerData data = new ProducerData(s3.getFileKey()
			, member.getId(), quiz.getId(), quizData.getCorrectAnswer());
		kafkaProducer.sendMessage(data, quizData.getQuizType().toString());

		return new SubmitQuizResponse(s3.getFileUrl(), quiz.getId());
	}

	@Transactional
	public QuizResultResponse getQuizResult(int memberQuizID) {
		int memberId = memberUtil.getLoginMember().getId();

		String key = "quiz_answer_" + memberId  + "_" + memberQuizID;
		String redis = redisService.getValue(key);
		MemberQuiz quizData = memberQuizRepository.findById(memberQuizID)
			.orElseThrow(() -> new CustomException(ErrorCode.NO_ID, memberQuizID));
		double score = -1;
		if(redis != null){
			score = Double.parseDouble(redis);
			quizData.setScore(score);
		}else{
			score = quizData.getScore();
		}

        return new QuizResultResponse((int) score);
	}

	@Transactional
	public CarrotDto.PatchResponse patchCarrotCount(int placeId) {
		Member member = memberUtil.getLoginMember();

		// place가 존재하는지 확인
		PlaceData placeData = placeDataRepository.findById(placeId)
			.orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER, placeId));

		// placeId에 해당하는 당근 업그레이드
		MemberCarrot memberCarrot = memberCarrotRepository.findByMemberIdAndPlaceDataId(member.getId(), placeId)
			.orElseGet(() -> {
				return MemberCarrot.builder()
					.member(member)
					.placeData(placeData)
					.count(0)
					.build();
			});

		if (memberCarrot.getCount() < Integer.MAX_VALUE) {
			memberCarrot.setCount(memberCarrot.getCount() + 1);
		}
		memberCarrotRepository.save(memberCarrot);

		return new CarrotDto.PatchResponse(memberCarrot.getCount());
	}
}
