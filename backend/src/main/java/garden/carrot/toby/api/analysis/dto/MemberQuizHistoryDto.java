package garden.carrot.toby.api.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class MemberQuizHistoryDto {
    int memberQuizId;
    String correctAnswer;
    String imageUrl;
    LocalDateTime createTime;
    double score;

    public MemberQuizHistoryDto() {

    }
}
