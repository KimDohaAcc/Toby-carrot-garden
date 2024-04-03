import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";
import { RootState } from "../../store/store";

import { useSelector } from "react-redux";

const StoryQuizEmotionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "imaage camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  border: 1px solid black;
`;

const StoryQuizEmotionsTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizEmotionsImageArea = styled.div`
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const StoryQuizEmotionCanmeraArea = styled.div`
  grid-area: camera;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const ImageArea = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 0 1;
  text-align: center;
  position: relative;
`;

const ConteentArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  flex: 0 0 12.5%;
`;

const QuizImage = styled.img`
  height: 100%;
  width: auto;
  position: relative;
  display: block;
  border: 1px solid black;
  margin: 0 auto;
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

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryQuizEmotions = ({ imageUrl, quizId, content, index, place }) => {
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
    <StoryQuizEmotionsContainer>
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
        <AudioBtn isPlaying={isPlaying} onClick={handleTogglePlay}></AudioBtn>
      </AudioArea>
      <StoryQuizEmotionsTitleArea>
        <h1>얼굴을 찍어주세요</h1>
      </StoryQuizEmotionsTitleArea>
      <StoryQuizEmotionsImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </StoryQuizEmotionsImageArea>
      <StoryQuizEmotionCanmeraArea>
        <QuizWebCam quizId={quizId} place={place} />
      </StoryQuizEmotionCanmeraArea>
    </StoryQuizEmotionsContainer>
  );
};

export default StoryQuizEmotions;
