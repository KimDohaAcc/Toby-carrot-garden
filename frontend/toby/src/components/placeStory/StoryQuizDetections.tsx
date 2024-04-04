import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StoryQuizDetectionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "imaage camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  width: 93%;
`;

const StoryQuizDetectionsTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoryQuizDetectionsImageArea = styled.div`
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const StoryQuizDetectionCanmeraArea = styled.div`
  grid-area: camera;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const ImageArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 0 1;
`;

const ConteentArea = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  font-size: 1.3vw;
  justify-content: center;
  align-items: center;
  flex: 0 0 12.5%;
`;

const QuizImage = styled.img`
  height: 100%;
  width: auto;
  position: relative;
  display: block;
  margin: 0 auto;
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
`;

const ButtonText = styled.div`
  font-size: 1.1vw;
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
`;

const AudioArea = styled.div`
  position: absolute;
  margin: calc(2%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AIText = styled.div`
  display: flex;
  font-size: 1.5vw;
  text-align: center;
`;

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryQuizDetections = ({ imageUrl, quizId, content, index, place }) => {
  const [voiceUrl, setVoiceUrl] = React.useState<string>("");

  const sceneList = useSelector<RootState, Scene[]>((state: RootState) => {
    if (place === "hospital") {
      return state.hospital.sceneList;
    } else if (place === "school") {
      return state.school.sceneList;
    } else if (place === "mart") {
      return state.mart.sceneList;
    } else if (place === "police") {
      return state.police.sceneList;
    } else {
      return [];
    }
  });

  useEffect(() => {
    const voice = sceneList[index].voice;
    setVoiceUrl(voice);
  }, [index, place, sceneList]);

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

  return (
    <StoryQuizDetectionsContainer>
      <AudioArea>
        <AudioPlayer
          ref={audioRef}
          controls
          autoPlay
          preload="metadata"
          hidden
          onEnded={handleAudioEnded}
        >
          <source src={voiceUrl} type="audio/mpeg" />
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
      <StoryQuizDetectionsTitleArea>
        <h1>사진을 찍어주세요</h1>
      </StoryQuizDetectionsTitleArea>
      <StoryQuizDetectionsImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </StoryQuizDetectionsImageArea>
      <StoryQuizDetectionCanmeraArea>
        <AIText>✨AI로 분석되는 퀴즈입니다</AIText>
        <QuizWebCam quizId={quizId} place={place} />
      </StoryQuizDetectionCanmeraArea>
    </StoryQuizDetectionsContainer>
  );
};

export default StoryQuizDetections;
