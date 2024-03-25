package garden.carrot.toby.domain.quizdata.repository;

import garden.carrot.toby.domain.quizdata.entity.QuizData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDataRepository extends JpaRepository<QuizData, Integer> {

}
