package garden.carrot.toby.domain.membercarrot.repoository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.membercarrot.entity.MemberCarrot;

@Repository
public interface MemberCarrotRepository extends JpaRepository<MemberCarrot, Integer> {

	List<MemberCarrot> findAllByMemberIdOrderByPlaceData_Id(Integer memberId);
}
