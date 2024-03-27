import React from "react";
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
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizDetectionsImage = styled.img`
  height: 95%;
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

// const CameraBtnArea = styled.div`
//   flex: 0 0 25%;
// `;

// const CameraBtn = styled.button`
//   color: #b65050;
// `;

const StoryQuizDetections = ({ imageUrl, quizId }) => {
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
      </StoryQuizDetectionsImageArea>
      <StoryQuizDetectionCanmeraArea>
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
      </StoryQuizDetectionCanmeraArea>
    </StoryQuizDetectionsContainer>
  );
};

export default StoryQuizDetections;
