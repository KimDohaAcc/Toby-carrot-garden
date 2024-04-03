import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getEmotionList, getObjectList } from "../../apis/analysisApi";
import RescoreModal from "../modals/rescoreModal";
import { format } from "date-fns";
import { getRescore } from "../../apis/analysisApi";

interface QuizItem {
  correctAnswer: string;
  imageUrl: string;
  createTime: string;
  score: string | number; // 점수를 문자열 또는 숫자로 처리
  memberQuizId: number;
}

// interface QuizListResponse {
//   status: number;
//   message: string;
//   result: {
//     list: QuizItem[];
//   };
// }

const Button = styled.button`
  background-color: #80cee1;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.5vw;
`;

const RecoreContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
  flex-direction: row;
`;
const RecoreContentContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
  margin: 5px;
  box-sizing: border-box;
`;

const RecoreScrollArea = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 0 90%;
  width: 100%;
  height: 100%;
  border-radius: 5%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 14px solid #fff299;
  object-fit: contain;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e7d55c;
    border-radius: 5px;
  }
`;

const RecoreScrollArea2 = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 0 90%;
  width: 100%;
  height: 100%;
  border-radius: 5%;
  background-color: white;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 14px solid #fff299;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e7d55c;
    border-radius: 5px;
  }
`;
const RecoreButtonContainer = styled.div`
  width: auto;
  height: 100%;
  flex: 0 0 10%;
  position: relative;
`;
const RecoreButton = styled.img`
  width: auto;
  height: 100%;
  display: flex;
  position: absolute;
  left: 5%;
  top: 5%;
`;
const RecoreBox = styled.div`
  display: flex;
  justify-content: center;
  height: 80%;
  width: 80%;
  flex: 0 0 30%;
  object-fit: contain;
  padding: 5%;
  border-bottom: 10px solid #e7d55c;
`;

const RecoreBoxImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: contain;
  overflow: hidden;
  flex: 0 0 60%;
  left: 5%;
`;

const RecoreBoxAnswer = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  overflow: hidden;
  object-fit: contain;
  font-size: 2vw;
`;
const RecoreBoxAnswerText = styled.div`
  width: 100%;
  height: auto;
  flex: 0 0 25%;
  font-size: 2.5vw;
  margin: 5%;
`;
const RecoreBoxAnswerCheck = styled.div`
  width: 100%;
  height: auto;
  flex: 0 0 25%;
  margin: 5%;
`;

const RecoreBoxRescoreDate = styled.div`
  width: 100%;
  height: auto;
  flex: 0 0 25%;
  font-size: 1.5vw;
  margin: 5% 0px;
`;
const RecoreBoxRescoreButton = styled.div`
  width: 108%;
  height: auto;
  flex: 0 0 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const translateAnswer = (answer) => {
  const translations = {
    Surprise: "놀람",
    Happy: "행복",
    cup: "컵",
    bag: "가방",
    Sad: "슬픔",
  };

  return translations[answer] || answer; // 번역이 없으면 원본을 반환
};

const formatScore = (score) => {
  const scoreTranslations = {
    "-1": "통신 오류",
    "0": "오답",
    "100": "정답",
  };

  return scoreTranslations[score.toString()] || score; // 번역이 없으면 원본 점수를 반환
};

const RecoreContent = () => {
  const [emotionQuizList, setEmotionQuizList] = useState([]);
  const [objectQuizList, setObjectQuizList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const emotionResponse = await getEmotionList();
        const objectResponse = await getObjectList();
        if (emotionResponse.status === 200 && objectResponse.status === 200) {
          const formattedEmotionQuizzes = emotionResponse.result.map(
            (quiz) => ({
              ...quiz,
              correctAnswer: translateAnswer(quiz.correctAnswer),
              score: formatScore(quiz.score),
              createTime: format(new Date(quiz.createTime), "M월 d일 H시 m분"),
            })
          );
          const formattedObjectQuizzes = objectResponse.result.map((quiz) => ({
            ...quiz,
            correctAnswer: translateAnswer(quiz.correctAnswer),
            score: formatScore(quiz.score),
            createTime: format(new Date(quiz.createTime), "M월 d일 H시 m분"),
          }));
          setEmotionQuizList(formattedEmotionQuizzes);
          setObjectQuizList(formattedObjectQuizzes);
        }
      } catch (error) {
        console.error("Error fetching quiz data", error);
      }
    };

    fetchQuizData();
  }, []);
  const handleOpenModal = (quizId: number) => {
    setCurrentQuizId(quizId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuizId(null);
  };

  const handleRescore = async (quizId, newScore) => {
    try {
      const response = await getRescore(quizId, newScore);
      if (response.status === 200) {
        // 재채점 결과를 "정답" 또는 "오답" 문자열로 변환
        const formattedScore = formatScore(response.result.score.toString());

        // emotionQuizList와 objectQuizList 상태 업데이트
        const updatedEmotionQuizzes = emotionQuizList.map((quiz) =>
          quiz.memberQuizId === quizId
            ? { ...quiz, score: formattedScore }
            : quiz
        );
        setEmotionQuizList(updatedEmotionQuizzes);

        const updatedObjectQuizzes = objectQuizList.map((quiz) =>
          quiz.memberQuizId === quizId
            ? { ...quiz, score: formattedScore }
            : quiz
        );
        setObjectQuizList(updatedObjectQuizzes);

        handleCloseModal(); // 모달 닫기
      } else {
        console.error("Failed to rescore quiz");
      }
    } catch (error) {
      console.error("Error during rescore", error);
    }
  };

  return (
    <>
      <RecoreContentContainer>
        <RecoreContentContainer2>
          <RecoreButtonContainer>
            <RecoreButton src="/Image/button/EmotionButtonOn.png" />
          </RecoreButtonContainer>
          <RecoreScrollArea>
            {/* <RecoreBoxTitle>감정</RecoreBoxTitle> */}
            {emotionQuizList.map((quiz, index) => (
              <RecoreBox key={quiz.memberQuizId}>
                <RecoreBoxImage
                  src={quiz.imageUrl}
                  alt={`Quiz ${quiz.memberQuizId}`}
                />
                <RecoreBoxAnswer>
                  <RecoreBoxAnswerText>
                    <div>
                      <strong>정답 : {quiz.correctAnswer}</strong>
                    </div>
                  </RecoreBoxAnswerText>
                  <RecoreBoxAnswerCheck>
                    <div>
                      <strong>{quiz.score}</strong>
                    </div>
                  </RecoreBoxAnswerCheck>
                  <RecoreBoxRescoreDate>
                    {" "}
                    <div>
                      <strong>{quiz.createTime}</strong>
                    </div>
                  </RecoreBoxRescoreDate>
                  <RecoreBoxRescoreButton>
                    <Button onClick={() => handleOpenModal(quiz.memberQuizId)}>
                      재채점
                    </Button>
                  </RecoreBoxRescoreButton>
                </RecoreBoxAnswer>
              </RecoreBox>
            ))}
          </RecoreScrollArea>
        </RecoreContentContainer2>

        <RecoreContentContainer2>
          <RecoreButtonContainer>
            <RecoreButton src="/Image/button/ObjectButtonOn.png" />
          </RecoreButtonContainer>
          <RecoreScrollArea2>
            {objectQuizList.map((quiz, index) => (
              <RecoreBox key={quiz.memberQuizId}>
                <RecoreBoxImage
                  src={quiz.imageUrl}
                  alt={`Quiz ${quiz.memberQuizId}`}
                />
                <RecoreBoxAnswer>
                  <RecoreBoxAnswerText>
                    <div>
                      <strong>정답 : {quiz.correctAnswer}</strong>
                    </div>
                  </RecoreBoxAnswerText>
                  <RecoreBoxAnswerCheck>
                    <div>
                      <strong>{quiz.score}</strong>
                    </div>
                  </RecoreBoxAnswerCheck>
                  <RecoreBoxRescoreDate>
                    {" "}
                    <div>
                      <strong>{quiz.createTime}</strong>
                    </div>
                  </RecoreBoxRescoreDate>
                  <RecoreBoxRescoreButton>
                    <Button onClick={() => handleOpenModal(quiz.memberQuizId)}>
                      재채점
                    </Button>
                  </RecoreBoxRescoreButton>
                </RecoreBoxAnswer>
              </RecoreBox>
            ))}
          </RecoreScrollArea2>
        </RecoreContentContainer2>
      </RecoreContentContainer>

      {isModalOpen && (
        <RescoreModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          quizId={currentQuizId}
          onRescore={handleRescore} // 콜백 함수를 prop으로 전달
        />
      )}
    </>
  );
};

export default RecoreContent;
