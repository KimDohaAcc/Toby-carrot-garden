package garden.carrot.toby.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
	private final StringBuilder sb = new StringBuilder();
	private final ExceptionUtil exceptionUtil;

	@ExceptionHandler(Exception.class)
	protected final ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
		log.error("Exception 발생!", ex);

		ApiResponse<String> response = ApiResponse.globalError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());

		// Custom Exception인 경우 원인 제공
		if (ex instanceof CustomException customException) {
			String stringData = customException.getData() == null ? null : customException.getData().toString();
			response = ApiResponse.error(customException.getErrorCode(),
				stringData);
		} else {
			exceptionUtil.sendExceptionToDiscord(ex);
		}

		return ResponseEntity.badRequest().body(response);
	}
}
