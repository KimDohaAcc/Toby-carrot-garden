import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StoryContentContainer = styled.div`
  display: grid;
  grid-template-rows: 7fr 2fr;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const StoryContentImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryContentImage = styled.img`
  height: 95%;
  border: 1px solid black;
`;

const StoryContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  border: 1px solid black;
`;

type StoryContentProps = {
  index: number;
};

interface Quiz {
  quizId: number;
  correctAnswer: string;
  quizType: string;
}

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
  quiz?: Quiz | null;
}

const StoryContent = ({ index }: StoryContentProps) => {
  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
  );
  //sceneList[index].sceneImageUrl
  console.log("index", index);
  return (
    <StoryContentContainer>
      <StoryContentImageArea>
        <StoryContentImage
          src={sceneList[index].sceneImageUrl}
          alt="imageUrl"
        />
      </StoryContentImageArea>
      <StoryContentText>{sceneList[index].content}</StoryContentText>
    </StoryContentContainer>
  );
};

export default StoryContent;
