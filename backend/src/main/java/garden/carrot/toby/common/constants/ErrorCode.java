package garden.carrot.toby.common.constants;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	/* 400 BAD_REQUEST: 잘못된 요청 구문 */
	// 일반
	ALREADY_DELETED(BAD_REQUEST, "이미 삭제된 값입니다"),
	BAD_PARAMETER(BAD_REQUEST, "요청 파라미터가 잘못되었습니다."),
	BAD_PARAMETER_TYPE(BAD_REQUEST, "지원하지 않는 파라미터 형식입니다."),
	NO_TOKEN(BAD_REQUEST, "토큰이 존재하지 않습니다."),

	// 멤버
	MEMBER_NOT_FOUND(BAD_REQUEST, "id에 해당하는 멤버가 없습니다."),
	MEMBER_NOT_FOUND_WITH_NICKNAME(BAD_REQUEST, "닉네임에 해당하는 멤버가 없습니다."),

	/* 500 INTERNAL_SERVER_ERROR : 서버 오류 */
	SERVER_ERROR(INTERNAL_SERVER_ERROR, "서버 내부 오류로 인해 응답을 제공할 수 없습니다.");

	private final HttpStatus status;
	private final String message;
}
