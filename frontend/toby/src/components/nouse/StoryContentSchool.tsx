import React, { useState, useEffect } from "react";
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

const AudioBtn = styled.button<{ isPlaying: boolean }>`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url(${(props) =>
    props.isPlaying
      ? "/Image/button/no-sound.png"
      : "/Image/button/sound.png"});
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
`;

const AudioArea = styled.div`
  position: absolute;
  margin: calc(2%);
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
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("audioRef is null");
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
    setIsPlaying(true);
  }, [index]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  console.log("index", index);
  return (
    <StoryContentContainer>
      <AudioArea>
        <AudioPlayer
          ref={audioRef}
          controls
          autoPlay
          preload="metadata"
          hidden
          onEnded={handleAudioEnded}
        >
          <source src={sceneList[index].voice} type="audio/mpeg" />
        </AudioPlayer>
        <AudioBtn isPlaying={isPlaying} onClick={handleTogglePlay}></AudioBtn>
      </AudioArea>
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
