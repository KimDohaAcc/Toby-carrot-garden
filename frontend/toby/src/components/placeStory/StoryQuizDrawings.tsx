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

const StoryQuizDrawings = ({ imageUrl, quizId, content, index, place }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [voiceUrl, setVoiceUrl] = React.useState<string>("");

  const HospitalSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  const SchoolSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
  );
  useEffect(() => {
    console.log(place);
    if (place == "hospital") {
      const voice = HospitalSceneList[index].voice;
      setVoiceUrl(voice);
    } else if (place == "school") {
      const voice = SchoolSceneList[index].voice;
      setVoiceUrl(voice);
    }
  }, [index, place, HospitalSceneList, SchoolSceneList]);

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

    setIsSubmitted(true);
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
        <AudioBtn isPlaying={isPlaying} onClick={handleTogglePlay}></AudioBtn>
      </AudioArea>
      <QuizTitleArea>
        <h1>StoryQuizDrawings</h1>
      </QuizTitleArea>
      <QuizImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </QuizImageArea>
      <QuizCanvasArea>
        <CanvasImg
          src="/Image/common/캔버스.png"
          alt="canvas"
          onClick={handleCanvasClick}
        />
        {isSubmitted ? null : (
          <ClickText onClick={handleCanvasClick}>클릭 하세요</ClickText>
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
