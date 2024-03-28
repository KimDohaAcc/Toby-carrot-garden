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
  border: 1px solid black;
`;

type StoryQuizProps = {
  index: number;
};

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

const StoryQuizSchool = ({ index }: StoryQuizProps) => {
  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
    // (state: RootState) => state.hospital.sceneList
  );
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
          />
        );
      case "OBJECTS":
        return (
          <StoryQuizDetections
            imageUrl={imageUrl}
            content={content}
            quizId={quizId}
          />
        );
      case "FEELINGS":
        return <StoryQuizEmotions imageUrl={imageUrl} content={content} />;
      case "EMERGENCY":
        return <StoryEmergency />;
      default:
        return <div>Quiz Type Error!!!</div>;
    }
  };

  return <StoryQuizContainer>{renderQuiz()}</StoryQuizContainer>;
};

export default StoryQuizSchool;
