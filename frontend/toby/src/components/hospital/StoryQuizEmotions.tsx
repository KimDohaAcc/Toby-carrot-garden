import React from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "image camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  border: 1px solid black;
`;

const QuizTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const QuizImageArea = styled.div`
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const QuizImage = styled.img`
  height: 95%;
  border: 1px solid black;
`;

const QuizCameraArea = styled.div`
  grid-area: camera;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const CameraArea = styled.div`
  flex: 0 0 75%;
`;

const CameraBtnArea = styled.div`
  flex: 0 0 25%;
`;

const StoryQuizEmotions = ({ imageUrl }) => {
  return (
    <QuizContainer>
      <QuizTitleArea>
        <h1>StoryQuizEmotions</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <QuizImage src={imageUrl} alt="image" />
      </QuizImageArea>
      <QuizCameraArea>
        <CameraArea>Camera</CameraArea>
        <CameraBtnArea>CameraBtn</CameraBtnArea>
      </QuizCameraArea>
    </QuizContainer>
  );
};

export default StoryQuizEmotions;
