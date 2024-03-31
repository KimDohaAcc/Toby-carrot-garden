import React from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";

const StoryQuizEmotionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "imaage camera";
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
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
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

const ImageArea = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 0 1;
  text-align: center;
`;

const ConteentArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  flex: 0 0 12.5%;
`;

const QuizImage = styled.img`
  height: 100%;
  width: auto;
  position: relative;
  display: block;
  border: 1px solid black;
  margin: 0 auto;
`;

const StoryQuizEmotions = ({ imageUrl, quizId, content }) => {
  return (
    <StoryQuizEmotionsContainer>
      <StoryQuizEmotionsTitleArea>
        <h1>StoryQuizEmotions</h1>
      </StoryQuizEmotionsTitleArea>
      <StoryQuizEmotionsImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </StoryQuizEmotionsImageArea>
      <StoryQuizEmotionCanmeraArea>
        <CameraArea>
          <QuizWebCam quizId={quizId} />
        </CameraArea>
      </StoryQuizEmotionCanmeraArea>
    </StoryQuizEmotionsContainer>
  );
};

export default StoryQuizEmotions;
