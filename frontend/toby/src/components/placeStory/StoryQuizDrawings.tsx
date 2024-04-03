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
`;

const QuizTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizImageArea = styled.div`
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
  position: relative;
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
  margin-top: 10px;
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

const QuizCanvasArea = styled.div`
  grid-area: canvas;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const CanvasImg = styled.img`
  width: 100%;
  height: 90%;
  object-fit: contain;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const ClickText = styled.div`
  position: absolute;
  margin-bottom: 8%;
  margin-right: 5%;
  font-size: 3vw;
  font-weight: bold;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const AudioBtnNS = styled.button`
  z-index: 100;
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
  z-index: 10;
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
  position: absolute;
  right: 13.5%;
  top: 15%;
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

const StoryQuizDrawings = ({ imageUrl, quizId, content, index, place }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const handleCanvasClick = () => {
    if (!isSubmitted) {
      // 제출 상태가 아닐 때만 모달을 열 수 있도록 조건 추가
      openModal();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("이미지 판독");
  };

  return (
    <QuizContainer>
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
      <QuizTitleArea>
        <h1>화면에 그려주세요</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </QuizImageArea>
      <QuizCanvasArea>
        <AIText>✨AI로 분석되는 퀴즈입니다</AIText>
        <CanvasImg
          src="/Image/common/캔버스.png"
          alt="canvas"
          onClick={handleCanvasClick}
        />
        {isSubmitted ? null : (
          <ClickText onClick={handleCanvasClick}>클릭!</ClickText>
        )}
      </QuizCanvasArea>
      <StoryDrawingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        quizId={quizId}
        place={place}
      />
    </QuizContainer>
  );
};

export default StoryQuizDrawings;
