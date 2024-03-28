import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDrawingsQuiz } from "../../apis/analysisApi";
import { getUserStorage } from "../../apis/userStorageApi";
const userStorage = getUserStorage();
const accessToken = userStorage.accessToken;

// 더미 데이터
const initialDrawingsList = [
  {
    correctAnswer: "사자",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 89.2,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  {
    correctAnswer: "호랑이",
    imageUrl: "https://placekitten.com/200/200", // 예시 이미지 URL
    createdTime: "2020-04-28T13:38:32.912",
    score: 85,
  },
  // 더 많은 퀴즈 데이터를 추가할 수 있습니다.
];

// 스타일링된 컴포넌트
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성
  /* max-height: 10%; // 적절한 최대 높이 설정 */
  width: 100%; // 컨테이너의 너비 설정
  height: 100%;
  max-height: 100%;
`;

const DrawingItem = styled.div`
  display: flex;
  flex: 0 0 20%;
  flex-direction: row;
  margin: 3%;
  /* align-items: center; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 그림 아이템에 그림자 효과 추가
  padding: 2%; // 패딩 추가
  width: 90%;
  height: 50vh;
`;

const Image = styled.img`
  width: 50%; // 이미지 크기 조정
  height: 100%;
  margin-right: 2%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReportDrawings = () => {
  const [drawingsList, setDrawingsList] = useState(initialDrawingsList);
  useEffect(() => {
    const fetchDrawingsQuiz = async () => {
      try {
        const response = await getDrawingsQuiz(); // API 호출
        if (
          response &&
          response.status === 200 &&
          response.result &&
          response.result.list
        ) {
          setDrawingsList(response.result.list); // 서버에서 받은 데이터로 상태 업데이트
        }
      } catch (error) {
        console.error("그림 퀴즈 데이터를 가져오는데 실패했습니다.", error);
        // API 호출에 실패했을 때 더미 데이터 유지
      }
    };

    fetchDrawingsQuiz();
  }, []);
  return (
    <ListContainer>
      {drawingsList.map((drawing, index) => (
        <DrawingItem key={index}>
          <Image src={drawing.imageUrl} alt={`Drawing ${index}`} />
          <InfoContainer>
            <div>
              <strong>정답:</strong> {drawing.correctAnswer}
            </div>
            <div>
              <strong>점수:</strong> {drawing.score}
            </div>
            <div>
              <strong>생성 시간:</strong> {drawing.createdTime}
            </div>
          </InfoContainer>
        </DrawingItem>
      ))}
    </ListContainer>
  );
};

export default ReportDrawings;
