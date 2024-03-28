import React, { useEffect } from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";

const StoryQuizDetectionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "image camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  border: 1px solid black;
`;

const StoryQuizDetectionsTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizDetectionsImageArea = styled.div`
  grid-area: image;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizDetectionsImage = styled.img`
  height: 90%;
  border: 1px solid black;
`;

const StoryQuizDetectionCanmeraArea = styled.div`
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

const StoryQuizDetections = ({ imageUrl, quizId, content }) => {
  // const handleTakePicture = () => {
  //   console.log("Take a picture");
  // };
  return (
    <StoryQuizDetectionsContainer>
      <StoryQuizDetectionsTitleArea>
        <h1>StoryQuizDetections</h1>
      </StoryQuizDetectionsTitleArea>
      <StoryQuizDetectionsImageArea>
        <StoryQuizDetectionsImage src={imageUrl} alt="image" />
        <div>{content}</div>
      </StoryQuizDetectionsImageArea>
      <StoryQuizDetectionCanmeraArea>
        <CameraArea>
          <QuizWebCam quizId={quizId} />
        </CameraArea>
      </StoryQuizDetectionCanmeraArea>
    </StoryQuizDetectionsContainer>
  );
};

export default StoryQuizDetections;
