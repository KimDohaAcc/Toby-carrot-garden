package garden.carrot.toby.domain.scenedata.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.quizdata.entity.QuizData;
import garden.carrot.toby.domain.storydata.entity.StoryData;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
public class SceneData extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "story_data_id")
	@JsonBackReference
	private StoryData storyData;

	@Enumerated(EnumType.STRING)
	private SceneType sceneType;

	private String sceneImageUrl;

	private String content;

	private String voiceUrl;

	@OneToOne(mappedBy = "sceneData", cascade = CascadeType.ALL, orphanRemoval = true)
	private QuizData quizData;
}
