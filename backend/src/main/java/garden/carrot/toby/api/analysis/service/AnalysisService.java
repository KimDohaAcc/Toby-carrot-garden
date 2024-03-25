package garden.carrot.toby.api.analysis.service;

import garden.carrot.toby.common.constants.ErrorCode;
import garden.carrot.toby.common.exception.CustomException;
import garden.carrot.toby.domain.member.entity.Member;
import garden.carrot.toby.domain.member.repository.MemberRepository;
import garden.carrot.toby.domain.memberquiz.entity.MemberQuiz;
import garden.carrot.toby.domain.memberquiz.repository.MemberQuizRepository;
import garden.carrot.toby.domain.quizdata.entity.QuizType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AnalysisService {

    @Autowired
    private MemberQuizRepository memberQuizRepository;
    @Autowired
    private MemberRepository memberRepository;

    public List<MemberQuiz> getMemberQuizList(int memberId, QuizType quizType) throws CustomException {
        List<MemberQuiz> quizList = memberQuizRepository.getMemberQuizByTypeAndMemberId(memberId, quizType)
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER));

        for(MemberQuiz memberQuiz: quizList) {
            System.out.println(memberQuiz);
        }

        return quizList;
    }

    @Transactional
    public MemberQuiz updateScoreById(int memberId, double score) throws CustomException {
        MemberQuiz memberQuiz = memberQuizRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER));

        memberQuiz.setScore(score);
        memberQuizRepository.save(memberQuiz);

        return memberQuiz;
    }

    public boolean verifyParentPassword(int memberId, String parentPassword) throws CustomException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.BAD_PARAMETER));

        if(member != null && member.getParentPassword().equals(parentPassword)) {
            return true;
        }

        return false;
    }
}
