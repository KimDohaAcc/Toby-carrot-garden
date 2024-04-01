import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import SignatureCanvas from "react-signature-canvas";

import StoryDrawingModal from "../modals/StoryDrawingModal";

import { submitQuiz } from "../../apis/quizApi";

const QuizContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "imaage canvas";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

const QuizTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const QuizImageArea = styled.div`
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
  position: relative;
`;

const ImageArea = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 0 1;
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

const QuizCanvasArea = styled.div`
  grid-area: canvas;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const CanvasImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`;
const ClickText = styled.div`
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
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

const StoryQuizDrawings = ({ imageUrl, quizId, content, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("이미지 판독");
    submitQuiz(quizId);
  };

  return (
    <QuizContainer>
      <QuizTitleArea>
        <h1>StoryQuizDrawings</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <AudioPlayer ref={audioRef} controls preload="metadata" hidden>
          <source src={voiceUrl} type="audio/mpeg" />
        </AudioPlayer>
        <AudioBtn onClick={handlePlay}>재생</AudioBtn>
        <ConteentArea>{content}</ConteentArea>
      </QuizImageArea>
      <QuizCanvasArea>
        <CanvasImg
          src="/Image/common/캔버스.png"
          alt="canvas"
          onClick={openModal}
        />
        <ClickText onClick={openModal}>클릭 하세요</ClickText>
      </QuizCanvasArea>
      <StoryDrawingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        quizId={quizId}
      />
    </QuizContainer>
  );
};

export default StoryQuizDrawings;
