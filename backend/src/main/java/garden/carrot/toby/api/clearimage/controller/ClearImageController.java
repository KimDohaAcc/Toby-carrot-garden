package garden.carrot.toby.api.clearimage.controller;

import garden.carrot.toby.api.clearimage.service.ClearImageService;
import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ClearImageController {
	private final ClearImageService clearImageService;

//	@PostMapping("/clear_image")
//	public ApiResponse<>
}
