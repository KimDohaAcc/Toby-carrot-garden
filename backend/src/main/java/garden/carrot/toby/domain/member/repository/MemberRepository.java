package garden.carrot.toby.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	Optional<Member> findMemberBySerialNumber(long serialNumber);
}
