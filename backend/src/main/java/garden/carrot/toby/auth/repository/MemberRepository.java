package garden.carrot.toby.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.auth.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	Optional<Member> findMemberBySerialNumber(long serialNumber);
}
