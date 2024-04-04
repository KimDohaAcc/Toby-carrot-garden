package garden.carrot.toby.domain.storydata.repository;

import garden.carrot.toby.domain.storydata.entity.StoryData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryDataRepository extends JpaRepository<StoryData, Integer> {

	List<StoryData> findAllByPlaceData_Id(Integer placeDataId);
}
