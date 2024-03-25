package garden.carrot.toby.api.auth.util;

import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberUtil {

	private final MemberRepository memberRepository;

	public Member getLoginMember() throws CustomException {
		// 현재 로그인한 유저의 id(pk)를 반환
		String authentication = SecurityContextHolder.getContext().getAuthentication().getName();

		if (authentication.equalsIgnoreCase("AnonymousUser")) {
			// 토큰 인증이 필요 없는 uri에서 해당 메서드 호출 할 경우 발생
			// JwtFilter에서 토큰 인증이 필요 없는 uri 목록 확인할 것
			throw new CustomException(ErrorCode.MEMBER_NOT_FOUND_WITH_TOKEN);
		}

		Integer memberId = Integer.parseInt(authentication);
		return memberRepository.findById(memberId)
			.orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND, memberId));
	}
}
