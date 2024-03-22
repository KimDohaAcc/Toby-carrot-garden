package garden.carrot.toby.domain.memberQuiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;

public interface MemberQuizRepository extends JpaRepository<MemberQuiz, Integer> {


}
