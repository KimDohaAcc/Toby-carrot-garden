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
  position: relative;
`;

const StoryContentImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const StoryContentImage = styled.img`
  height: 100%;
  width: auto;
  display: block;
  border: 1px solid black;
`;

const StoryContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border: 1px solid black;
  white-space: pre-wrap;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const AudioBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
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
    (state: RootState) => state.hospital.sceneList
  );
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

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
      <AudioPlayer ref={audioRef} controls preload="metadata" hidden>
        <source src={sceneList[index].voice} type="audio/mpeg" />
      </AudioPlayer>
      <AudioBtn onClick={handlePlay}>재생</AudioBtn>
      <StoryContentText>{sceneList[index].content}</StoryContentText>
    </StoryContentContainer>
  );
};

export default StoryContent;
