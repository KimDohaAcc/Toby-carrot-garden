package garden.carrot.toby.api.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberQuizRegradeReqDto {

    int memberQuizId;
    double score;
}
