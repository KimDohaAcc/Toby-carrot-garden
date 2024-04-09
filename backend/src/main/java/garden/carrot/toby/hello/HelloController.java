package garden.carrot.toby.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.dto.ApiResponse;
import garden.carrot.toby.common.exception.CustomException;

@RestController
public class HelloController {

	@GetMapping("/hello")
	public ApiResponse<String> hello() {
		String returnData = "Hello World!";
		// throw CustomException.builder().errorCode(ErrorCode.BAD_PARAMETER).data(returnData).build();
		throw new CustomException(ErrorCode.BAD_PARAMETER, returnData);
		// return ApiResponse.success(SuccessCode.GET_SUCCESS, returnData);
	}
}
