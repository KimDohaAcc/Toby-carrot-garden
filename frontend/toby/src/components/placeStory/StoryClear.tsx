import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ClearWebcam from "../ClearWebCam";

const ClearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const StoryClearContent = styled.div`
  font-size: 2.5vw;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 3%;
`;

const ClearWebcamArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const AudioPlayer = styled.audio`
  position: absolute;
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

const ButtonText = styled.div`
  font-size: 1.1vw;
  margin-top: 7px;
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
  top: calc(8%);
  left: 0;
  margin: calc(2%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryClear = ({ index, placeName }) => {
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
  const [placeId, setPlaceId] = useState<number>(0);

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
    if (placeName === "hospital") {
      setPlaceId(2);
    } else if (placeName === "school") {
      setPlaceId(1);
    } else if (placeName === "mart") {
      setPlaceId(3);
    } else if (placeName === "police") {
      setPlaceId(4);
    }
  }, [placeName]);

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
      <StoryClearContent>{sceneList[index].content}</StoryClearContent>
      <ClearWebcamArea>
        <ClearWebcam placeId={placeId} />
      </ClearWebcamArea>
    </ClearContainer>
  );
};

export default StoryClear;
