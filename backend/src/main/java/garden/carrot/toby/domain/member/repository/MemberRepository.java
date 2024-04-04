package garden.carrot.toby.domain.member.repository;

import garden.carrot.toby.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

	Optional<Member> findMemberBySerialNumber(long serialNumber);
}
