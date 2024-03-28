package garden.carrot.toby.api.analysis.dto;

import garden.carrot.toby.domain.quizdata.entity.QuizType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticsDto {
	private QuizType quizType;
	private double correctRateAll;
	private double correctRateAge;
	private double correctRateMe;
}
