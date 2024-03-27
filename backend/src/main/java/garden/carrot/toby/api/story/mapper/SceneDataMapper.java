package garden.carrot.toby.api.story.mapper;

import garden.carrot.toby.api.story.dto.QuizDto;
import garden.carrot.toby.api.story.dto.QuizDto.QuizDataResponse;
import garden.carrot.toby.api.story.dto.SceneDataDto;
import garden.carrot.toby.domain.quizdata.entity.QuizData;
import garden.carrot.toby.domain.scenedata.entity.SceneData;
import java.util.Optional;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SceneDataMapper {

	@Mapping(target = "sceneId", source = "id")
	@Mapping(target = "voice", source = "voiceUrl")
	@Mapping(target = "quiz", source = "quizData", qualifiedByName = "mapQuizDataResponse")
	SceneDataDto.SceneDataResponse toSceneResponse(SceneData sceneData);

	@Named("mapQuizDataResponse")
	default QuizDto.QuizDataResponse mapQuizDataResponse(QuizData quizData) {
		return Optional.ofNullable(quizData).map(quiz -> QuizDataResponse.builder()
			.quizId(quizData.getId())
			.quizType(quizData.getQuizType())
			.correctAnswer(quizData.getCorrectAnswer())
			.build()
		).orElse(null);
	}
}
