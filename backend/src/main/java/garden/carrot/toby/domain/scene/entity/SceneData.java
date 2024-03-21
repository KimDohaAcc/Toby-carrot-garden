package garden.carrot.toby.domain.scene.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.story.entity.StoryData;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SceneData extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "story_data_id")
	private StoryData storyData;

	@Enumerated(EnumType.STRING)
	private SceneType sceneType;

	private String sceneImageUrl;

	private String content;

	private String voiceUrl;
}
