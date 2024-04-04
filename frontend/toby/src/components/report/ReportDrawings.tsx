import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDrawingsQuiz } from "../../apis/analysisApi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// 스타일링된 컴포넌트
const ListContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  object-fit: contain;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fda7a7;
    border-radius: 5px;
  }
`;

const DrawingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  /* margin: 5px; */
  border-bottom: 3px solid #ffdcdc;
`;
const NoImageArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; /* 기존 grid에서 flex로 변경 */
  /* flex-direction: column; 내용을 세로로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  background-color: #f5f5f5d9;
  border-radius: 30px;

  position: relative;
  overflow: hidden;
  object-fit: contain;
  height: 100%;
  width: 100%; /* 너비를 100%로 설정하여 부모 컨테이너를 꽉 채움 */
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  flex: 0 0 60%;
  object-fit: contain;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: contain;
  height: 80%;
  width: 80%;
  margin: 5%;
  border: 5px solid #fda7a7;
  background-image: url("/Image/modal/칠판.png");
  background-size: cover;
  background-repeat: no-repeat; /* 이미지 반복 없이 설정 */
  background-position: center; /* 이미지를 가운데 정렬 */
`;

const InfoContainer = styled.div`
  flex: 0 0 40%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 100%;
  height: auto;
  font-size: 3vw;
`;
const MiddleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  overflow: hidden;
  object-fit: contain;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const AlbumToby = styled.img`
  width: 22%; // Adjust size as needed
  margin-left: 3%; // Space between text and image
  right: 60%;
  overflow: hidden;
  object-fit: contain;
`;
const Score = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  flex: 0 0 25%;
  font-size: 2vw;
`;

const CreateTime = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  flex: 0 0 25%;
  font-size: 1.5vw;
`;
const GotoMainText = styled.div`
  cursor: pointer;
  color: #000;
  font-size: 40px;
  margin-bottom: 20px;
`;
const translateAnswer = (answer) => {
  const translations = {
    door: "문",
    "t-shirt": "티셔츠",
    pants: "바지",
    // You can add more translations here
  };

  // If the answer has a translation, return it; otherwise, return the original answer
  return translations[answer] || answer;
};

interface Drawing {
  imageUrl: string;
  correctAnswer: string;
  score: number;
  createTime: string;
}

const ReportDrawings = () => {
  const [drawingsList, setDrawingsList] = useState<Drawing[]>([]);
  const navigate = useNavigate();
  const handleGoToMain = () => {
    navigate("/main"); // '/main'으로 이동하는 함수
  };
  useEffect(() => {
    const fetchDrawingsQuiz = async () => {
      try {
        const response = await getDrawingsQuiz();
        if (response && Array.isArray(response.result)) {
          // 날짜 형식 변환 적용
          const updatedList = response.result.map((drawing) => ({
            ...drawing,
            correctAnswer: translateAnswer(drawing.correctAnswer),
            createTime: format(new Date(drawing.createTime), "M월 d일 H시 m분"),
          }));
          setDrawingsList(updatedList);
        } else {
          console.log("응답 데이터 형식이 예상과 다릅니다:", response);
        }
      } catch (error) {
        console.error("그림 퀴즈 데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchDrawingsQuiz();
  }, []);

  return (
    <ListContainer>
      {drawingsList.length > 0 ? (
        drawingsList.map((drawing, index) => (
          <DrawingItem key={index}>
            <ImageContainer>
              <Image src={drawing.imageUrl} alt={`Drawing ${index}`} />
            </ImageContainer>
            <InfoContainer>
              <Answer>{drawing.correctAnswer}</Answer>
              <Score>일치율&nbsp;&nbsp;{drawing.score}&nbsp;%</Score>
              <CreateTime>{drawing.createTime}</CreateTime>
            </InfoContainer>
          </DrawingItem>
        ))
      ) : (
        // 그림 목록이 비어 있을 때 표시될 UI
        <NoImageArea>
          <div> {/* Empty top container for spacing */} </div>
          <MiddleTextContainer>
            <h1>
              토비와 함께
              <br />
              사진 찍으러 가볼까요?
            </h1>
          </MiddleTextContainer>
          <BottomContainer>
            <GotoMainText onClick={handleGoToMain}>
              당근 모으러 가기 -▷
            </GotoMainText>
            <AlbumToby
              src="/Image/album/토비3.png"
              alt="albumtoby"
              onClick={handleGoToMain}
            />
          </BottomContainer>
        </NoImageArea>
      )}
    </ListContainer>
  );
};
export default ReportDrawings;
