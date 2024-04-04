package garden.carrot.toby.domain.placedata.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.storydata.entity.StoryData;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
public class PlaceData extends BaseEntity {

	private String name;

	@OneToMany(mappedBy = "placeData", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	List<StoryData> storyDataList = new ArrayList<>();
}
