import React from "react";
import styled from "styled-components";

const StoryDrawingContainer = styled.div`
  display: grid;
  width: 90%;
  height: 90%;
  border: 2px solid black;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  grid-template-areas:
    "title title"
    "drawing1 drawing2";
`;

const Title = styled.div`
  grid-area: title;
  border: 2px solid black;
`;

const Drawing1 = styled.div`
  grid-area: drawing1;
  border: 2px solid black;
`;

const Drawing2 = styled.div`
  grid-area: drawing2;
  border: 2px solid black;
`;

const StoryDrawing = () => {
  return (
    <StoryDrawingContainer>
      <Title>주사기를 그려주세요</Title>
      <Drawing1>그림</Drawing1>
      <Drawing2>여기를 클릭하세요</Drawing2>
    </StoryDrawingContainer>
  );
};

export default StoryDrawing;
