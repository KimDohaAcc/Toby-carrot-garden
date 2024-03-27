package garden.carrot.toby.domain.memberquiz.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.quizdata.entity.QuizData;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberQuiz extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quiz_data_id")
	private QuizData quizData;

	private String imageUrl;

	// 그림인 경우 일치율, 분석 이미지인 경우 100 또는 0
	@Setter
	private double score;

	@Builder
	public MemberQuiz(Member member, QuizData quizData, String imageUrl, double score) {
		this.member = member;
		this.quizData = quizData;
		this.imageUrl = imageUrl;
		this.score = score;
	}

}
