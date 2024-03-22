package garden.carrot.toby.domain.placedata.repository;

import garden.carrot.toby.domain.placedata.entity.PlaceData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceDataRepository extends JpaRepository<PlaceData, Integer> {

}
