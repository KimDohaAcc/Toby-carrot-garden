package garden.carrot.toby.api.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import garden.carrot.toby.api.auth.dto.MemberDto;
import garden.carrot.toby.domain.member.entity.Member;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
	MemberDto.Response MemberToMemberDtoResponse(Member member);
}
