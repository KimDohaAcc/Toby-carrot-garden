import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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

  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );

  useEffect(() => {
    sceneList[index]?.quiz?.[0]?.quizType === "clear" && console.log("clear");
  }, [sceneList, index]);

  return (
    <div>
      {index}
      <h1>StoryClear</h1>
    </div>
  );
};

export default StoryClear;
