import React, { useEffect, useState } from "react";
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
  position: relative;
`;

interface Scene {
  sceneId: number;
  sceneType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
  quiz: Quiz;
}

interface Quiz {
  quizId: number;
  correctAnswer: string;
  quizType: string;
}

const StoryQuizHospitial = ({ index, placeName }) => {
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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [quizId, setQuizId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [quizType, setQuizType] = useState<string>("");

  useEffect(() => {
    if (sceneList[index]) {
      setImageUrl(sceneList[index]?.sceneImageUrl);
      setContent(sceneList[index]?.content);
      if (sceneList[index]?.quiz) {
        setQuizId(sceneList[index].quiz.quizId);
        setQuizType(sceneList[index].quiz.quizType);
      }
    }
  }, [index, sceneList]);

  const renderQuiz = () => {
    switch (quizType) {
      case "DRAWINGS":
        return (
          <StoryQuizDrawings
            imageUrl={imageUrl}
            quizId={quizId}
            content={content}
            index={index}
            place={placeName}
          />
        );
      case "OBJECTS":
        return (
          <StoryQuizDetections
            imageUrl={imageUrl}
            content={content}
            quizId={quizId}
            index={index}
            place={placeName}
          />
        );
      case "FEELINGS":
        return (
          <StoryQuizEmotions
            imageUrl={imageUrl}
            content={content}
            quizId={quizId}
            index={index}
            place={placeName}
          />
        );
      case "EMERGENCY":
        return <StoryEmergency index={index} place={placeName} />;
      default:
        return <div>Quiz Type Error!!!</div>;
    }
  };

  return (
    <StoryQuizContainer>
      {renderQuiz()}
    </StoryQuizContainer>
  );
};

export default StoryQuizHospitial;
