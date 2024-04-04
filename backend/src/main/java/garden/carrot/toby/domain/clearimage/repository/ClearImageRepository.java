package garden.carrot.toby.domain.clearimage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import garden.carrot.toby.domain.clearimage.entity.ClearImage;

@Repository
public interface ClearImageRepository extends JpaRepository<ClearImage, Integer> {

	List<ClearImage> findAllByMemberIdOrderByCreatedTimeDesc(Integer memberId);
}
