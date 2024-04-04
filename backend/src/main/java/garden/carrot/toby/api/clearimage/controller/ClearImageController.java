package garden.carrot.toby.api.clearimage.controller;

import garden.carrot.toby.api.clearimage.dto.ClearImageDto;
import garden.carrot.toby.api.clearimage.service.ClearImageService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clear-image")
public class ClearImageController {

	private final ClearImageService clearImageService;

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<ClearImageDto.ClearImageResponse> saveClearImage(
		@Valid @ModelAttribute ClearImageDto.ClearImageRequest clearImageRequest) {
		return ApiResponse.success(SuccessCode.POST_SUCCESS, clearImageService.saveClearImage(clearImageRequest));
	}
}
