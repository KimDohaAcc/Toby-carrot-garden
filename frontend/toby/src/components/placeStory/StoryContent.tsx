import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StoryContentContainer = styled.div`
  display: grid;
  grid-template-rows: 7fr 2fr;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StoryContentImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const StoryContentImage = styled.img`
  height: 100%;
  width: auto;
  display: block;
`;

const StoryContentText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
  white-space: pre-wrap;
  width: 93%;
  justify-self: center;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const ButtonText = styled.div`
  font-size: 1.1vw;
  margin-top: 7px;
`;


const AudioBtnNS = styled.button`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url("/Image/button/no-sound.png");
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const AudioBtnS = styled.button`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url("/Image/button/sound.png");
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const AudioArea = styled.div`
  position: absolute;
  margin: calc(2%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const StoryContent = ({ index, placeName }) => {
  // const sceneList = useSelector<RootState, Scene[]>(
  //   (state: RootState) => state.hospital.sceneList
  // );
  const sceneList = useSelector<RootState, Scene[]>((state: RootState) => {
    if (placeName === "hospital") {
      return state.hospital.sceneList;
    } else if (placeName === "school") {
      return state.school.sceneList;
    } else if (placeName === "mart") {
      return state.mart.sceneList;
    } else if (placeName === "police") {
      return state.police.sceneList;
    } else {
      return [];
    }
  });

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
        {isPlaying ? (
          <>
            <AudioBtnNS onClick={handleTogglePlay}></AudioBtnNS>
            <ButtonText>소리끄기</ButtonText>
          </>        
        ) : (
          <>
            <AudioBtnS onClick={handleTogglePlay}></AudioBtnS>
            <ButtonText>소리듣기</ButtonText>
          </>        
        )}
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
