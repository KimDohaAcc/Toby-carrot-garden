package garden.carrot.toby.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
	private final StringBuilder sb = new StringBuilder();

	@ExceptionHandler(Exception.class)
	protected final ResponseEntity<String> handleAllExceptions(Exception ex) {
		log.error("Exception 발생!", ex);
		return ResponseEntity.badRequest().body(ex.getMessage());
	}
}
