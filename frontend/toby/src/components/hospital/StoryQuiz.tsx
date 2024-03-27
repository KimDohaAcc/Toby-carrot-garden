import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import StoryQuizDrawings from "./StoryQuizDrawings";
import StoryQuizDetections from "./StoryQuizDetections";
import StoryQuizEmotions from "./StoryQuizEmotions";
import StoryEmergency from "./StoryEmergency";

const StoryQuizContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

type StoryQuizProps = {
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
  quiz?: Quiz[];
}

const StoryQuiz = ({ index }: StoryQuizProps) => {
  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  console.log("index", index);
  console.log("sceneList", sceneList);
  console.log("ASdasdasd", sceneList[index]?.quiz?.[0]?.quizType);

  const imageUrl = sceneList[index]?.sceneImageUrl;
  const quizId = sceneList[index]?.quiz?.[0]?.quizId;

  const renderQuiz = () => {
    switch (sceneList[index]?.quiz?.[0]?.quizType) {
      case "drawings":
        return <StoryQuizDrawings imageUrl={imageUrl} quizId={quizId} />;
      case "objects":
        return <StoryQuizDetections imageUrl={imageUrl} quizId={quizId} />;
      case "feelings":
        return <StoryQuizEmotions imageUrl={imageUrl} />;
      case "emergency":
        return <StoryEmergency imageUrl={imageUrl} />;
      default:
        return <div>Quiz Type Error</div>;
    }
  };

  return <StoryQuizContainer>{renderQuiz()}</StoryQuizContainer>;
};

export default StoryQuiz;
