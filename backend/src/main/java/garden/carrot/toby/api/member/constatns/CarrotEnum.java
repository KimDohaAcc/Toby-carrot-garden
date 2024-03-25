package garden.carrot.toby.api.member.constatns;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CarrotEnum {
	SCHOOL(1, 5),
	HOSPITAL(2, 6),
	STORE(3, 7),
	POLICE(4, 8);

	private final int placeId;
	private final int masterCarrotGrade;
}
