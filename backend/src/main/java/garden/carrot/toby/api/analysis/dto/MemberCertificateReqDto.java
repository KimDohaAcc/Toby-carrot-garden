package garden.carrot.toby.api.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
//@AllArgsConstructor
public class MemberCertificateReqDto {
    String parentPassword;
    public MemberCertificateReqDto(){}

    public MemberCertificateReqDto(String parentPassword) {
        this.parentPassword = parentPassword;
    }
}
