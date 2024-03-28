package garden.carrot.toby.domain.memberquiz.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface MemberQuizRepository extends JpaRepository<MemberQuiz, Integer> {

	@Query("SELECT mq FROM MemberQuiz mq "
		+ "WHERE mq.quizData.quizType = :quizType AND mq.member.id = :memberId AND DATEDIFF(now(), mq.createdTime) <= 7 "
		+ "ORDER BY mq.createdTime DESC")
	List<MemberQuiz> getMemberQuizByTypeAndMemberId(@Param("memberId") int memberId,
		@Param("quizType") QuizType quizType);

	@Query("SELECT AVG(mq.score) FROM MemberQuiz mq "
		+ "WHERE mq.quizData.quizType = :quizType AND mq.member.id = :memberId")
	Optional<Double> findAverageScoreByQuizTypeAndMemberId(
		@Param("quizType") QuizType quizType, @Param("memberId") int memberId);

	@Query("SELECT AVG(mq.score) FROM MemberQuiz mq WHERE mq.quizData.quizType = :quizType")
	Optional<Double> findAverageScoreByQuizType(QuizType quizType);

	@Query("SELECT AVG(mq.score) FROM MemberQuiz mq "
		+ "JOIN mq.member m "
		+ "WHERE mq.quizData.quizType = :quizType "
		+ "AND FUNCTION('YEAR', m.birthDate) = FUNCTION('YEAR', :birthDate)")
	Optional<Double> findAverageScoreByQuizTypeAndBirthYear(QuizType quizType, LocalDate birthDate);
}
