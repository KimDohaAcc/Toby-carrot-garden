import React from "react";
import styled from "styled-components";

import StoryDrawing from "./StoryDrawing";

// 전체 컨테이너
const StoryTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 2px solid black;
`;

const StoryTitleContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  border: 2px solid black;
`;

const StoryTitleBottom = styled.div`
  flex-grow: 1;
  border: 2px solid black;
  display: flex;
`;

const Title = styled.div`
  flex-grow: 6;
  border: 2px solid black;
`;

const NextArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const StoryTitle = () => {
  return (
    <StoryTitleContainer>
      <StoryTitleContent>
        <StoryDrawing />
      </StoryTitleContent>
      <StoryTitleBottom>
        <Title>제목</Title>
        <NextArea>다음</NextArea>
      </StoryTitleBottom>
    </StoryTitleContainer>
  );
};

export default StoryTitle;
