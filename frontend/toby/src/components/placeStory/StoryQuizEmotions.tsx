import React, { useEffect } from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";

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

const AudioBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryQuizEmotions = ({ imageUrl, quizId, content, index }) => {
  const [voiceUrl, setVoiceUrl] = React.useState<string>("");

  const HospitalSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  const SchoolSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
  );
  useEffect(() => {
    if (HospitalSceneList.length > 0) {
      const voice = HospitalSceneList[index].voice;
      setVoiceUrl(voice);
    } else {
      const voice = SchoolSceneList[index].voice;
      setVoiceUrl(voice);
    }
  }, [index, HospitalSceneList, SchoolSceneList]);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <StoryQuizEmotionsContainer>
      <StoryQuizEmotionsTitleArea>
        <h1>StoryQuizEmotions</h1>
      </StoryQuizEmotionsTitleArea>
      <StoryQuizEmotionsImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <AudioPlayer ref={audioRef} controls preload="metadata" hidden>
          <source src={voiceUrl} type="audio/mpeg" />
        </AudioPlayer>
        <AudioBtn onClick={handlePlay}>재생</AudioBtn>
        <ConteentArea>{content}</ConteentArea>
      </StoryQuizEmotionsImageArea>
      <StoryQuizEmotionCanmeraArea>
        <QuizWebCam quizId={quizId} />
      </StoryQuizEmotionCanmeraArea>
    </StoryQuizEmotionsContainer>
  );
};

export default StoryQuizEmotions;
