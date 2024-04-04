package garden.carrot.toby.domain.member.entity;

import garden.carrot.toby.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

	private String parentPassword;
	@Column(length = 30)
	private String name;
	private LocalDate birthDate;
	// 카카오에서 넘겨준 인증값
	@Column(unique = true)
	private Long serialNumber;

	public Member(Long serialNumber) {
		this.serialNumber = serialNumber;
	}

	public void signup(String parentPassword, String name, LocalDate birthDate) {
		this.parentPassword = parentPassword;
		this.name = name;
		this.birthDate = birthDate;
	}

}
