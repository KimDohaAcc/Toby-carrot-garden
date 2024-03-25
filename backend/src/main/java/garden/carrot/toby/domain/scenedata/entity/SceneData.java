package garden.carrot.toby.domain.scenedata.entity;

import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.OneToMany;
import lombok.Getter;

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

	@OneToMany(mappedBy = "sceneData", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<QuizData> quizDataList = new ArrayList<>();
}
