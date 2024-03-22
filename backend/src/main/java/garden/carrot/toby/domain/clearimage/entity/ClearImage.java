package garden.carrot.toby.domain.clearimage.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import garden.carrot.toby.domain.placedata.entity.PlaceData;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClearImage extends BaseEntity {
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "member_id")
//	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "place_data_id")
	private PlaceData placeData;

	private String clearImageUrl;
}
