package garden.carrot.toby.api.clearimage.service;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.api.clearimage.dto.ClearImageDto;
import garden.carrot.toby.api.clearimage.mapper.ClearImageResponseMapper;
import garden.carrot.toby.api.placedata.service.PlaceDataService;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.common.s3.service.S3Service;
import garden.carrot.toby.domain.clearimage.entity.ClearImage;
import garden.carrot.toby.domain.clearimage.repository.ClearImageRepository;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.placedata.entity.PlaceData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClearImageService {

	private final PlaceDataService placeDataService;
	private final ClearImageRepository clearImageRepository;
	private final ClearImageResponseMapper clearImageResponseMapper;
	private final MemberUtil memberUtil;
	private final S3Service s3Service;

	public ClearImageDto.ClearImageResponse saveClearImage(ClearImageDto.ClearImageRequest clearImageRequest) {
		Member member = memberUtil.getLoginMember();
		PlaceData placeData = placeDataService.getPlaceDataById(clearImageRequest.getPlaceId()).orElseThrow(() ->
			new CustomException(ErrorCode.NO_ID, "[place_id : " + clearImageRequest.getPlaceId() + "] is not exist"));
		String clearImageUrl = s3Service.uploadFile(clearImageRequest.getImage()).getFileUrl();

		ClearImage clearImage = ClearImage.builder()
			.member(member)
			.placeData(placeData)
			.clearImageUrl(clearImageUrl)
			.build();

		ClearImage save = clearImageRepository.save(clearImage);
		return clearImageResponseMapper.toClearImageResponse(save);
	}
}
