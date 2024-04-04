package garden.carrot.toby.domain.scenedata.repository;

import garden.carrot.toby.domain.scenedata.entity.SceneData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SceneDataRepository extends JpaRepository<SceneData, Integer> {

	List<SceneData> findAllByStoryData_Id(Integer id);
}
