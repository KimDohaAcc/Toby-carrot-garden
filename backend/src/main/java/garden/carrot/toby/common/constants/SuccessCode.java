package garden.carrot.toby.common.constants;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {
	// 일반
	GET_SUCCESS(OK, "조회 성공"),
	DELETE_SUCCESS(OK, "삭제 성공"),
	PATCH_SUCCESS(CREATED, "수정 성공"),
	POST_SUCCESS(CREATED, "생성 성공"),
	ACCEPT_SUCCESS(ACCEPTED, "수신 성공");

	private final HttpStatus status;
	private final String message;
}


