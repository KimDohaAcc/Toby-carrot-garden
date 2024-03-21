package garden.carrot.toby.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.common.constants.SuccessCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.hello.dto.HelloDto;

@RestController
@RequestMapping("hello-token")
public class HelloTokenController {

	@GetMapping("/")
	public ApiResponse<HelloDto.Response> getToken() {
		String returnData = "토큰 잘 들어있어요!";
		HelloDto.Response dto = new HelloDto.Response(returnData);
		return ApiResponse.success(SuccessCode.GET_SUCCESS, dto);
	}
}
