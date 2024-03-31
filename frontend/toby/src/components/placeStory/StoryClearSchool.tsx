import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ClearWebcam from "../ClearWebCam";

const ClearContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 7fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const StoryClearContent = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const ClearWebcamArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
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
  const placeId = 1;
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
      <ClearWebcamArea>
        <ClearWebcam placeId={placeId} />
      </ClearWebcamArea>
    </ClearContainer>
  );
};

export default StoryClear;
