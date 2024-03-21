package garden.carrot.toby.domain.quiz.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.scene.entity.SceneData;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class QuizData extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "scene_data_id")
	private SceneData sceneData;

	private String correctAnswer;

	@Enumerated(EnumType.STRING)
	private QuizType quizType;
}
