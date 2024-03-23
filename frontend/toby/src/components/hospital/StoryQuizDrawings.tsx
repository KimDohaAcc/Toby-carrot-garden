import React from "react";
import styled from "styled-components";

const QuizContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "image canvas";
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

const QuizCanvasArea = styled.div`
  grid-area: canvas;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizDrawings = ({ imageUrl }) => {
  return (
    <QuizContainer>
      <QuizTitleArea>
        <h1>StoryQuizDrawings</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <QuizImage src={imageUrl} alt="image" />
      </QuizImageArea>
      <QuizCanvasArea>
        <h1>Canvas</h1>
      </QuizCanvasArea>
    </QuizContainer>
  );
};

export default StoryQuizDrawings;
