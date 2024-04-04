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
	NO_ID(BAD_REQUEST, "요청하신 정보가 없습니다"),
	ALREADY_DELETED(BAD_REQUEST, "이미 삭제된 값입니다"),
	BAD_PARAMETER(BAD_REQUEST, "요청 파라미터가 잘못되었습니다."),
	BAD_PARAMETER_TYPE(BAD_REQUEST, "지원하지 않는 파라미터 형식입니다."),
	FILE_SIZE_LIMIT(BAD_REQUEST, "파일 업로드는 2MB까지 가능합니다."),

	// 카카오 OAuth
	KAKAO_TOKEN_NOT_ISSUED(INTERNAL_SERVER_ERROR, "카카오 토큰 발급에 문제가 생겼습니다"),
	KAKAO_GET_USER_INFO_FAILED(INTERNAL_SERVER_ERROR, "카카오 유저 정보 조회에 문제가 생겼습니다"),

	// 토큰
	NO_TOKEN(BAD_REQUEST, "토큰이 존재하지 않습니다."),
	EXPIRED_TOKEN(UNAUTHORIZED, "토큰의 유효 기간이 만료되었습니다."),
	MALFORMED_TOKEN(UNAUTHORIZED, "토큰의 형식이 올바르지 않습니다."),
	INVALID_SIGNATURE_TOKEN(UNAUTHORIZED, "서명이 유효하지 않습니다."),
	UNSUPPORTED_JWT(UNAUTHORIZED, "지원하지 않는 JWT 기능이 사용되었습니다."),
	BAD_TOKENCODE(UNAUTHORIZED, "존재하지 않는 토큰코드입니다."),

	// 멤버
	MEMBER_NOT_FOUND(BAD_REQUEST, "id에 해당하는 멤버가 없습니다."),
	MEMBER_NOT_FOUND_WITH_TOKEN(BAD_REQUEST, "토큰인증을 하지 않는 곳에서 로그인한 멤버를 찾으려고 했습니다. 백엔드 문의 주세요."),
	SIGNUP_NOT_COMPLETE(BAD_REQUEST, "회원가입이 완료되지 않았습니다. 추가 정보를 입력해주세요."),

	// 당근
	INVALID_CARROT_COUNT(BAD_REQUEST, "당근 개수가 올바르지 않습니다. 0 ~ INTEGER.MAX_INT 값만 가능합니다."),

	// S3
	FILE_UPLOAD_FAIL(INTERNAL_SERVER_ERROR, "S3 파일 업로드에 실패하였습니다."),

	/* 500 INTERNAL_SERVER_ERROR : 서버 오류 */
	SERVER_ERROR(INTERNAL_SERVER_ERROR, "서버 내부 오류로 인해 응답을 제공할 수 없습니다.");

	private final HttpStatus status;
	private final String message;
}
