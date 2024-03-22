package garden.carrot.toby.api.clearimage.service;

import garden.carrot.toby.api.clearimage.dto.ClearImageDto;
import garden.carrot.toby.api.clearimage.mapper.ClearImageMapper;
import garden.carrot.toby.domain.clearimage.repository.ClearImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClearImageService {
	private final ClearImageRepository clearImageRepository;
	private final ClearImageMapper clearImageMapper;

//	public ClearImageDto.ClearImageResponse saveClearImage()
}
