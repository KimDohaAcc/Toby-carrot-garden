import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDrawingsQuiz } from "../../apis/analysisApi";
import { format } from "date-fns";

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
  border-bottom: 3px solid #FFDCDC;
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
  border: 3px solid #fda7a7;
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

const translateAnswer = (answer) => {
  const translations = {
    door: "문",
    "t-shirt": "티셔츠",
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
      {drawingsList.map((drawing, index) => (
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
      ))}
    </ListContainer>
  );
};

export default ReportDrawings;
