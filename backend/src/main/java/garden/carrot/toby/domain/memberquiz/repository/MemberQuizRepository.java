package garden.carrot.toby.domain.memberquiz.repository;

import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberQuizRepository extends JpaRepository<MemberQuiz, Integer> {

    @Query("SELECT mq FROM MemberQuiz mq " +
            "WHERE mq.quizData.quizType = :quizType AND mq.member.id = :memberId AND DATEDIFF(now(), mq.createdTime) <= 7 " +
            "ORDER BY mq.createdTime DESC")
    List<MemberQuiz> getMemberQuizByTypeAndMemberId(@Param("memberId") int memberId, @Param("quizType") QuizType quizType);

    @Query("SELECT AVG(mq.score) FROM MemberQuiz mq " +
            "WHERE mq.quizData.quizType = :quizType AND mq.member.id = :memberId")
    double getAvgScoreByTypeAndMemberId(@Param("memberId") int memberId, @Param("quizType") QuizType quizType);
}
