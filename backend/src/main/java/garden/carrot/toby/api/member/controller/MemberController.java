package garden.carrot.toby.api.member.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.api.member.dto.CarrotDto;
import garden.carrot.toby.api.member.dto.ClearImageDto;
import garden.carrot.toby.api.member.service.MemberService;
import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.common.dto.ListDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("member")
public class MemberController {
	private final MemberService memberService;

	/**
	 * 당근밭 정보 반환
	 */
	@GetMapping("/carrot")
	public ApiResponse<ListDto<CarrotDto.Response>> getCarrots() {
		ListDto<CarrotDto.Response> response = memberService.getCarrots();

		return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
	}

	/**
	 * 클리어 사진 목록 열람
	 */
	@GetMapping("/clear-image")
	public ApiResponse<ListDto<ClearImageDto.Response>> getClearImages() {
		ListDto<ClearImageDto.Response> response = memberService.getClearImages();

		return ApiResponse.success(SuccessCode.GET_SUCCESS, response);
	}
}
