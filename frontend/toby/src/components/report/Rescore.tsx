import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getEmotionList, getObjectList } from "../../apis/analysisApi";
import RescoreModal from "../modals/rescoreModal";
import { format } from "date-fns";
import { getRescore } from "../../apis/analysisApi";
// RecoreContentContainer 컴포넌트에 대한 스타일 정의
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
  /* padding: 10px 20px; */
  /* margin: 10px; */
  background-color: #80cee1;
  color: white;
  border: none;
  border-radius: 15px;
  flex: 0 0 40%;
  height: 60%;
  font-size: 24px;

  /* cursor: pointer; */
`;
const RecoreContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: auto; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 5px solid black;
  flex-direction: row;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성

  flex-direction: row;
`;
const RecoreContentContainer2 = styled.div`
  display: flex;
  width: 100%;

  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 5px solid black;
  flex-direction: column;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성

  flex: 0 0 50%;
  position: relative; /* 이 부분 추가 */
`;
const RecoreButtonContainer = styled.div`
  position: sticky; /* 스크롤 시 상단에 고정 */
  top: 0; /* 컨테이너 상단에 붙임 */
  z-index: 10; /* 다른 콘텐츠 위에 오도록 z-index 설정 */
  background-color: white; /* 스크롤 시 내용이 겹치지 않도록 배경색 설정 */
  border: 2px solid blue;
  flex: 0 0 10%;
  overflow: hidden;
  object-fit: contain;
`;
const RecoreButton = styled.img`
  display: flex;
  position: absolute;
`;
const RecoreBox = styled.div`
  display: flex;
  height: 3%;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid yellow;
  flex-direction: row;
  flex: 0 0 40%;
  overflow: hidden;
  object-fit: contain;
`;
const RecoreBoxTitle = styled.div`
  height: 10%;
  width: 100%;

  border: 2px solid pink;
`;
const RecoreBoxImage = styled.img`
  width: 60%; // 이미지 너비를 컨테이너에 맞춥니다.
  height: 100%; // 이미지 높이를 자동으로 조정하여 비율을 유지합니다.
  max-height: 100%; // 컨테이너 높이의 최대 60%까지 허용합니다.
  object-fit: contain;
  border: 2px solid green;
  flex: 0 0 70%;
`;
const RecoreBoxAnswer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid green;
  flex: 0 0 30%;
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
  flex: 0 0 20%;
`;
const RecoreBoxRescoreDate = styled.div`
  height: 50%;
  border: 2px solid green;
`;
const RecoreBoxRescoreButton = styled.div`
  height: 50%;
  border: 2px solid pink;
  display: flex;
  justify-content: left; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
`;
const translateAnswer = (answer) => {
  const translations = {
    Surprise: "놀람",
    Happy: "행복",
    cup: "컵",
    bag: "가방",
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
          {/* <RecoreBoxTitle>감정</RecoreBoxTitle> */}
          {emotionQuizList.map((quiz, index) => (
            <RecoreBox key={quiz.memberQuizId}>
              <RecoreBoxImage
                src={quiz.imageUrl}
                alt={`Quiz ${quiz.memberQuizId}`}
              />
              <RecoreBoxAnswer>
                <RecoreBoxAnswerText>
                  <div style={{ fontSize: "70px" }}>
                    <strong>{quiz.correctAnswer}</strong>
                  </div>
                </RecoreBoxAnswerText>
                <RecoreBoxAnswerCheck>
                  <div style={{ fontSize: "70px" }}>
                    <strong>{quiz.score}</strong>
                  </div>
                </RecoreBoxAnswerCheck>
                <RecoreBoxRescoreDate>
                  {" "}
                  <div style={{ fontSize: "30px" }}>
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
        </RecoreContentContainer2>

        <RecoreContentContainer2>
          <RecoreButtonContainer>
            <RecoreButton src="/Image/button/ObjectButtonOn.png" />
          </RecoreButtonContainer>
          {objectQuizList.map((quiz, index) => (
            <RecoreBox key={quiz.memberQuizId}>
              <RecoreBoxImage
                src={quiz.imageUrl}
                alt={`Quiz ${quiz.memberQuizId}`}
              />
              <RecoreBoxAnswer>
                <RecoreBoxAnswerText>
                  <div style={{ fontSize: "70px" }}>
                    <strong>{quiz.correctAnswer}</strong>
                  </div>
                </RecoreBoxAnswerText>
                <RecoreBoxAnswerCheck>
                  <div style={{ fontSize: "70px" }}>
                    <strong>{quiz.score}</strong>
                  </div>
                </RecoreBoxAnswerCheck>
                <RecoreBoxRescoreDate>
                  {" "}
                  <div style={{ fontSize: "30px" }}>
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
