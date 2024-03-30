import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getEmotionList, getObjectList } from "../../apis/analysisApi";
import RescoreModal from "../modals/rescoreModal";
// RecoreContentContainer 컴포넌트에 대한 스타일 정의
interface QuizItem {
  correctAnswer: string;
  imageUrl: string;
  createTime: string; // 'timestamp'를 'string'으로 처리
  score: number; // 'double' 타입은 'number'로 표현
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
  /* padding: 10px 20px; */
  /* margin: 10px; */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  flex: 0 0 50%;

  /* cursor: pointer; */
`;
const RecoreContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 5px solid black;
  flex-direction: row;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성
  padding: 10px;
`;
const RecoreContentContainer2 = styled.div`
  display: flex;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 5px solid black;
  flex-direction: column;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성
  padding: 10px;
  flex: 0 0 50%;
`;
const RecoreButtonContainer = styled.div`
  flex: 0 0 10%;
`;
const RecoreBox = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid yellow;
  flex-direction: row;
  flex: 0 0 40%;
`;
const RecoreBoxTitle = styled.div`
  height: 10%;
  width: 100%;

  border: 2px solid pink;
`;
const RecoreBoxImage = styled.div`
  width: 100%;
  flex: 0 0 60%;
  border: 2px solid green;
`;
const RecoreBoxAnswer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid green;
`;
const RecoreBoxAnswerText = styled.div`
  height: 50%;

  border: 2px solid green;
`;
const RecoreBoxAnswerCheck = styled.div`
  height: 50%;

  border: 2px solid green;
`;
const RecoreBoxRescore = styled.div`
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid green;
  display: flex;
  flex-direction: column;
`;
const RecoreBoxRescoreDate = styled.div`
  height: 50%;
  border: 2px solid green;
`;
const RecoreBoxRescoreButton = styled.div`
  height: 50%;
  border: 2px solid pink;
  display: flex;
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
`;
// const RecoreBoxContent = styled.div`
//   /* flex-direction: column; */
//   height: 40%;
//   width: 100%;
//   max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
//   border: 2px solid yellow;
// `;
// const ListItem = styled.div`
//   padding: 9%;
//   margin: 1% 0;
//   border: 1px solid gray;
// `;

const dummyData: QuizItem[] = [
  {
    correctAnswer: "사자",
    imageUrl: "https://example.com/image1.jpg",
    createTime: "20200482T33832912",
    score: 89.2,
    memberQuizId: 1,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 2,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 3,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    memberQuizId: 4,
    score: 90,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 5,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 5,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 7,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 8,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createTime: "20200482T33832912",
    score: 85,
    memberQuizId: 9,
  },
];

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
        if (emotionResponse.status === 200) {
          setEmotionQuizList(emotionResponse.result);
        }
        if (objectResponse.status === 200) {
          setObjectQuizList(objectResponse.result);
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

  return (
    <>
      <RecoreContentContainer>
        {/* Emotion Quizzes */}
        <RecoreContentContainer2>
          <RecoreButtonContainer>감정</RecoreButtonContainer>
          {emotionQuizList.map((quiz, index) => (
            <RecoreBox key={quiz.memberQuizId}>
              <RecoreBoxImage>
                <img src={quiz.imageUrl} alt={`Quiz ${quiz.memberQuizId}`} />
              </RecoreBoxImage>
              <RecoreBoxAnswer>
                <RecoreBoxAnswerText>
                  정답: {quiz.correctAnswer}
                </RecoreBoxAnswerText>
                <RecoreBoxAnswerCheck>점수: {quiz.score}</RecoreBoxAnswerCheck>
              </RecoreBoxAnswer>
              <RecoreBoxRescore>
                <RecoreBoxRescoreDate>{quiz.createTime}</RecoreBoxRescoreDate>
                <RecoreBoxRescoreButton>
                  <Button onClick={() => handleOpenModal(quiz.memberQuizId)}>
                    재채점
                  </Button>
                </RecoreBoxRescoreButton>
              </RecoreBoxRescore>
            </RecoreBox>
          ))}
        </RecoreContentContainer2>

        {/* Object Quizzes */}
        <RecoreContentContainer2>
          <RecoreButtonContainer>감정</RecoreButtonContainer>
          {objectQuizList.map((quiz, index) => (
            <RecoreBox key={quiz.memberQuizId}>
              <RecoreBoxImage>
                <img src={quiz.imageUrl} alt={`Quiz ${quiz.memberQuizId}`} />
              </RecoreBoxImage>
              <RecoreBoxAnswer>
                <RecoreBoxAnswerText>
                  정답: {quiz.correctAnswer}
                </RecoreBoxAnswerText>
                <RecoreBoxAnswerCheck>점수: {quiz.score}</RecoreBoxAnswerCheck>
              </RecoreBoxAnswer>
              <RecoreBoxRescore>
                <RecoreBoxRescoreDate>{quiz.createTime}</RecoreBoxRescoreDate>
                <RecoreBoxRescoreButton>
                  <Button onClick={() => handleOpenModal(quiz.memberQuizId)}>
                    재채점
                  </Button>
                </RecoreBoxRescoreButton>
              </RecoreBoxRescore>
            </RecoreBox>
          ))}
        </RecoreContentContainer2>
      </RecoreContentContainer>

      {isModalOpen && (
        <RescoreModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          quizId={currentQuizId}
        />
      )}
    </>
  );
};

export default RecoreContent;
