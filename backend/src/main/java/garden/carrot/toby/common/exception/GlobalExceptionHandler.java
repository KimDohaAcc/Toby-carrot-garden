package garden.carrot.toby.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
	private final StringBuilder sb = new StringBuilder();

	@ExceptionHandler(Exception.class)
	protected final ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
		log.error("Exception 발생!", ex);

		ApiResponse<String> response = ApiResponse.globalError(HttpStatus.BAD_REQUEST, ex.getMessage());

		// Custom Exception인 경우 원인 제공
		if (ex instanceof CustomException customException) {
			response = ApiResponse.error(customException.getErrorCode(),
				(customException.getData().toString()));
		}

		return ResponseEntity.badRequest().body(response);
	}
}
