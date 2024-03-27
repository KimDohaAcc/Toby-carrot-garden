package garden.carrot.toby.api.analysis.service;

import garden.carrot.toby.api.auth.util.MemberUtil;
import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.member.repository.MemberRepository;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.memberquiz.repository.MemberQuizRepository;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AnalysisService {

    private final MemberQuizRepository memberQuizRepository;
    private final MemberRepository memberRepository;
    private final MemberUtil memberUtil;
    private final PasswordEncoder passwordEncoder;

    public List<MemberQuiz> getMemberQuizList(QuizType quizType) throws CustomException {
        Member member = memberUtil.getLoginMember();
        List<MemberQuiz> memberQuizList = memberQuizRepository.getMemberQuizByTypeAndMemberId(member.getId(), quizType);
        if (memberQuizList.isEmpty()) {
            throw new CustomException(ErrorCode.BAD_PARAMETER);
        }

        return memberQuizList;
    }

    @Transactional
    public MemberQuiz updateScoreByMemberQuizId(int memberQuizId, double score) throws CustomException {
        MemberQuiz memberQuiz = memberQuizRepository.findById(memberQuizId)
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER));

        memberQuiz.setScore(score);
        memberQuizRepository.save(memberQuiz);

        return memberQuiz;
    }

    public boolean verifyParentPassword(String parentPassword) throws CustomException {
        Member memberLoginId = memberUtil.getLoginMember();
        Member member = memberRepository.findById(memberLoginId.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER));

        if(member != null && passwordEncoder.matches(parentPassword, member.getParentPassword())){
            return true;
        }
        return false;
    }
}
