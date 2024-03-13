import React from "react";
import styled from "styled-components";

const StoryContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 2px solid black;
`;

const StoryContentContent = styled.div`
  flex-grow: 6;
  border: 2px solid black;
`;

const StoryContentBottom = styled.div`
  flex-grow: 1;
  border: 2px solid black;
  display: flex;
`;

const Content = styled.div`
  flex-grow: 6;
  border: 2px solid black;
`;

const NextArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const StoryContent = () => {
  return (
    <StoryContentContainer>
      <StoryContentContent>이미지 들어갈 예정</StoryContentContent>
      <StoryContentBottom>
        <Content>내용</Content>
        <NextArea>다음</NextArea>
      </StoryContentBottom>
    </StoryContentContainer>
  );
};

export default StoryContent;
