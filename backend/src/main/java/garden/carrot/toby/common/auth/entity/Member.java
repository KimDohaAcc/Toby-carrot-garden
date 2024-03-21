package garden.carrot.toby.common.auth.entity;

import java.time.LocalDate;

import garden.carrot.toby.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Setter
	private String parentPassword;
	@Setter
	@Column(length = 30)
	private String nickname;
	@Setter
	private LocalDate birthDate;
	// 카카오에서 넘겨준 인증값
	@Column(unique = true)
	private Long serialNumber;

	public Member(Long serialNumber) {
		this.serialNumber = serialNumber;
	}

}
