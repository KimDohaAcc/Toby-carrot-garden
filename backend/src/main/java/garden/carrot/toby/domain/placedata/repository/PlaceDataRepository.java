package garden.carrot.toby.domain.placedata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.placedata.entity.PlaceData;

@Repository
public interface PlaceDataRepository extends JpaRepository<PlaceData, Integer> {
}
