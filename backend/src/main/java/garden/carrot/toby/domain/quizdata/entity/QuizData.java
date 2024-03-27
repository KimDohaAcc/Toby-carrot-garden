package garden.carrot.toby.domain.quizdata.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.scenedata.entity.SceneData;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
public class QuizData extends BaseEntity {

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "scene_data_id")
	private SceneData sceneData;

	private String correctAnswer;

	@Enumerated(EnumType.STRING)
	private QuizType quizType;
}