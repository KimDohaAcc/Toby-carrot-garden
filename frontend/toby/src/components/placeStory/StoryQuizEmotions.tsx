import React from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";

const StoryQuizEmotionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "image camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  border: 1px solid black;
`;

const StoryQuizEmotionsTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizEmotionsImageArea = styled.div`
  grid-area: image;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizEmotionsImage = styled.img`
  height: 95%;
  border: 1px solid black;
`;

const StoryQuizEmotionCanmeraArea = styled.div`
  grid-area: camera;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const CameraArea = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
`;

// const CameraBtnArea = styled.div`
//   flex: 0 0 25%;
// `;

const CameraBtn = styled.button`
  color: #b65050;
`;

const StoryQuizEmotions = ({ imageUrl, quizId, content }) => {
  return (
    <StoryQuizEmotionsContainer>
      <StoryQuizEmotionsTitleArea>
        <h1>StoryQuizDetections</h1>
      </StoryQuizEmotionsTitleArea>
      <StoryQuizEmotionsImageArea>
        <StoryQuizEmotionsImage src={imageUrl} alt="image" />
        <div>{content}</div>
      </StoryQuizEmotionsImageArea>
      <StoryQuizEmotionCanmeraArea>
        <CameraArea>
          <QuizWebCam quizId={quizId} />
        </CameraArea>
        {/* <CameraBtnArea>
          <CameraBtn
            onClick={() => {
              handleTakePicture();
            }}
          >
            찰칵 이미지
          </CameraBtn>
        </CameraBtnArea> */}
      </StoryQuizEmotionCanmeraArea>
    </StoryQuizEmotionsContainer>
  );
};

export default StoryQuizEmotions;
