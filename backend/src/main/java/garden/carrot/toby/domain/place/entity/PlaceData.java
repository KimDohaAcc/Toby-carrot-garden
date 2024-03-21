package garden.carrot.toby.domain.place.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.story.entity.StoryData;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PlaceData extends BaseEntity {

	private String name;

	@OneToMany(mappedBy = "placeData", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	List<StoryData> storyDataList = new ArrayList<>();
}
