import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getEmotionList, getObjectList } from "../../apis/analysisApi";
import RescoreModal from "../modals/rescoreModal";
// RecoreContentContainer 컴포넌트에 대한 스타일 정의
interface QuizItem {
  correctAnswer: string;
  imageUrl: string;
  createdTime: string; // 'timestamp'를 'string'으로 처리
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
  flex-direction: column;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성
  padding: 10px;
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

  border: 2px solid yellow;
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
    createdTime: "20200482T33832912",
    score: 89.2,
    memberQuizId: 1,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 2,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 3,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    memberQuizId: 4,
    score: 90,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 5,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 5,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 7,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 8,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://example.com/image2.jpg",
    createdTime: "20200482T33832912",
    score: 85,
    memberQuizId: 9,
  },
];

const RecoreContent = () => {
  const [category, setCategory] = useState<string>("감정평가입니다.");
  const [quizList, setQuizList] = useState<QuizItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(null);

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await getEmotionList();
        if (response.status === 200 && response.result.list.length > 0) {
          setQuizList(response.result.list);
        } else {
          setQuizList(dummyData);
        }
      } catch (error) {
        console.error("Error fetching emotion data", error);
        setQuizList(dummyData);
      }
    };

    fetchEmotionData();
  }, []);

  const handleEmotionClick = async () => {
    setCategory("감정평가입니다.");
    try {
      const response = await getEmotionList();
      if (response.status === 200 && response.result.list.length > 0) {
        setQuizList(response.result.list);
      } else {
        setQuizList(dummyData);
      }
    } catch (error) {
      console.error("Error fetching emotion data", error);
      setQuizList(dummyData);
    }
  };

  const handleObjectClick = async () => {
    setCategory("사물평가입니다.");
    try {
      const response = await getObjectList();
      if (response.status === 200 && response.result.list.length > 0) {
        setQuizList(response.result.list);
      } else {
        setQuizList(dummyData);
      }
    } catch (error) {
      console.error("Error fetching object data", error);
      setQuizList(dummyData);
    }
  };
  const handleOpenModal = (quizId) => {
    setCurrentQuizId(quizId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuizId(null); // 모달을 닫을 때 현재 퀴즈 ID 리셋
  };

  return (
    <>
      <RecoreContentContainer>
        <RecoreButtonContainer>
          <Button onClick={handleEmotionClick}>감정</Button>
          <Button onClick={handleObjectClick}>사물</Button>
        </RecoreButtonContainer>
        <RecoreBoxTitle>{category}</RecoreBoxTitle>
        {quizList ? (
          quizList.map((quiz, index) => (
            <RecoreBox key={index}>
              <RecoreBoxImage>
                <img src={quiz.imageUrl} alt="Quiz" />
              </RecoreBoxImage>
              <RecoreBoxAnswer>
                <RecoreBoxAnswerText>
                  정답: {quiz.correctAnswer}
                </RecoreBoxAnswerText>
                <RecoreBoxAnswerCheck>점수: {quiz.score}</RecoreBoxAnswerCheck>
              </RecoreBoxAnswer>
              <RecoreBoxRescore>
                <RecoreBoxRescoreDate>
                  생성 시간: {quiz.createdTime}
                </RecoreBoxRescoreDate>
                <RecoreBoxRescoreButton>
                  <Button onClick={() => handleOpenModal(quiz.memberQuizId)}>
                    재채점
                  </Button>
                </RecoreBoxRescoreButton>
              </RecoreBoxRescore>
            </RecoreBox>
          ))
        ) : (
          <p>No data available</p>
        )}
      </RecoreContentContainer>
      <RescoreModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quizId={currentQuizId}
      />
    </>
  );
};

export default RecoreContent;
