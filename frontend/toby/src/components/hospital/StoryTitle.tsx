import React from "react";
import styled from "styled-components";

import StoryDrawing from "./StoryDrawing";

// 전체 컨테이너
const StoryTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
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
  box-sizing: border-box;
`;

const NextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  border: 2px solid black;
  box-sizing: border-box;
`;

const StoryTitle = () => {
  return (
    <StoryTitleContainer>
      <StoryTitleContent>
        <StoryDrawing />
      </StoryTitleContent>
      <StoryTitleBottom>
        <Title>제목</Title>
        <NextArea>
          <button>다음</button>
        </NextArea>
      </StoryTitleBottom>
    </StoryTitleContainer>
  );
};

export default StoryTitle;
