package garden.carrot.toby.domain.carrotgradedata.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.carrotgradedata.entity.CarrotGradeData;

@Repository
public interface CarrotGradeDataRepository extends JpaRepository<CarrotGradeData, Integer> {
	@Query("SELECT c FROM CarrotGradeData c WHERE :count BETWEEN c.min AND c.max")
	Optional<CarrotGradeData> findCarrotGradeIdByCount(@Param("count") int count);
}
