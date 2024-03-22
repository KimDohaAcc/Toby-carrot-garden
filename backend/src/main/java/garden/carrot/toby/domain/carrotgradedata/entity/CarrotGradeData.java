package garden.carrot.toby.domain.carrotgradedata.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

@Entity
@Getter
public class CarrotGradeData extends BaseEntity {

	private int min;

	private int max;

	@Enumerated(EnumType.STRING)
	private Name name;
}
