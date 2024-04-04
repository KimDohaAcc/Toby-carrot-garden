package garden.carrot.toby.common.exception;

import garden.carrot.toby.common.constants.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

	// exception의 원인이 된 값
	private Object data;
	private ErrorCode errorCode;

	public CustomException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}

	@Builder
	public CustomException(ErrorCode errorCode, Object data) {
		this(errorCode);
		this.data = data;
	}
}
