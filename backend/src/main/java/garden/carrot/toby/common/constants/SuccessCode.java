package garden.carrot.toby.common.constants;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

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


