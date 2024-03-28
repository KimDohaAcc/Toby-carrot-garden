package garden.carrot.toby.api.analysis.dto;

import garden.carrot.toby.common.util.NumberUtil;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StatisticsDto {
	private QuizType quizType;
	private double correctRateAll;
	private double correctRateAge;
	private double correctRateMe;

	@Builder
	public StatisticsDto(QuizType quizType, double correctRateAll, double correctRateAge, double correctRateMe) {
		this.quizType = quizType;
		this.correctRateAll = NumberUtil.round(correctRateAll, 1);
		this.correctRateAge = NumberUtil.round(correctRateAge, 1);
		this.correctRateMe = NumberUtil.round(correctRateMe, 1);
	}
}


