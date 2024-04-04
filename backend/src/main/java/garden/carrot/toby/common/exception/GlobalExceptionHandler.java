package garden.carrot.toby.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

	private final StringBuilder sb = new StringBuilder();
	private final ExceptionUtil exceptionUtil;

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ApiResponse<String>> handleCustomException(CustomException customException) {
		log.error("Custom Exception 발생!", customException);

		String stringData =
			customException.getData() == null ? null : customException.getData().toString();
		ApiResponse<String> response = ApiResponse.error(customException.getErrorCode(),
			stringData);
		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<ApiResponse<String>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException ex) {
		log.error("handleMaxUploadSizeExceededException 발생!", ex);
		ApiResponse<String> response = ApiResponse.error(ErrorCode.FILE_SIZE_LIMIT, null);
		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(Exception.class)
	protected final ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
		log.error("Exception 발생!", ex);
		exceptionUtil.sendExceptionToDiscord(ex);

		ApiResponse<String> response = ApiResponse.globalError(HttpStatus.INTERNAL_SERVER_ERROR,
			ex.getMessage());

		return ResponseEntity.badRequest().body(response);
	}
}
