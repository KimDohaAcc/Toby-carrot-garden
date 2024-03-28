import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import QuizWebcam from "../QuizWebCam";

const ClearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StoryClearContent = styled.div`
  font-size: 3rem;
  text-align: center;
`;

type StoryClearProps = {
  index: number;
};

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryClear = ({ index }: StoryClearProps) => {
  console.log("index", index);
  const [quizId, setQuizId] = React.useState<number>(0);

  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
  );

  useEffect(() => {
    setQuizId(sceneList[index].sceneId);
    console.log("sceneList", sceneList);
  }, [sceneList, index]);

  return (
    <ClearContainer>
      <StoryClearContent>{sceneList[index].content}</StoryClearContent>
      <QuizWebcam quizId={quizId} />
    </ClearContainer>
  );
};

export default StoryClear;
