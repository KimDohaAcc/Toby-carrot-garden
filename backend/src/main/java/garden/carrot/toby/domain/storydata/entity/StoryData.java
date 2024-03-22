package garden.carrot.toby.domain.storydata.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.placedata.entity.PlaceData;
import garden.carrot.toby.domain.scenedata.entity.SceneData;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
public class StoryData extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "place_data_id")
	@JsonBackReference
	private PlaceData placeData;

	private String title;

	private String storyImageUrl;

	private String recommendAge;

	@OneToMany(mappedBy = "storyData", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<SceneData> sceneDataList = new ArrayList<>();
}
