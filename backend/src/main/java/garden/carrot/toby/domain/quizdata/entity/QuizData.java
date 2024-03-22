package garden.carrot.toby.domain.quizdata.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.scenedata.entity.SceneData;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class QuizData extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "scene_data_id")
	@JsonBackReference
	private SceneData sceneData;

	private String correctAnswer;

	@Enumerated(EnumType.STRING)
	private QuizType quizType;
}