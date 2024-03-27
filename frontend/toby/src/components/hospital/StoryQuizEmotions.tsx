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
  flex-direction: column;
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

const CameraBtn = styled.button`
  color: #b65050;
`;

const StoryQuizEmotions = ({ imageUrl, content }) => {
  const handleTakePicture = () => {
    console.log("Take a picture");
  };

  return (
    <QuizContainer>
      <QuizTitleArea>
        <h1>StoryQuizEmotions</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <QuizImage src={imageUrl} alt="image" />
        <div style={{ fontSize: "3rem" }}>{content}</div>
      </QuizImageArea>
      <QuizCameraArea>
        <CameraArea>Camera</CameraArea>
        <CameraBtnArea>
          <CameraBtn
            onClick={() => {
              handleTakePicture();
            }}
          >
            찰칵 이미지
          </CameraBtn>
        </CameraBtnArea>
      </QuizCameraArea>
    </QuizContainer>
  );
};

export default StoryQuizEmotions;
