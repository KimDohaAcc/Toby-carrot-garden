import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ClearWebcam from "../ClearWebCam";

const ClearContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 7fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const StoryClearContent = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const ClearWebcamArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
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
  top: calc(1%);
  margin: calc(2%);
`;
type StoryClearProps = {
  index: number;
};

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryClear = ({ index }: StoryClearProps) => {
  console.log("index", index);
  const [quizId, setQuizId] = React.useState<number>(0);
  const placeId = 1;
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

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setQuizId(sceneList[index].sceneId);
    console.log("sceneList", sceneList);
  }, [sceneList, index]);

  return (
    <ClearContainer>
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
      <StoryClearContent>{sceneList[index].content}</StoryClearContent>
      <ClearWebcamArea>
        <ClearWebcam placeId={placeId} />
      </ClearWebcamArea>
    </ClearContainer>
  );
};

export default StoryClear;
