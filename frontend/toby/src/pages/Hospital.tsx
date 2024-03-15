import React from "react";
import styled from "styled-components";

import Logo from "../components/Logo";

import StoryTitle from "../components/hospital/StoryTitle";

// 전체 컨테이너
const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid black;
`;

// 로고와 병원 내용을 나누기 위한 컨테이너
const LogoArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const StoryContent = styled.div`
  flex-grow: 6;
  border: 2px solid black;
  padding: 20px;
  display: flex;
`;

const Hospital = () => {
  return (
    <>
      <Logo />
      <StoryContainer>
        <LogoArea />
        <StoryContent>
          <StoryTitle />
        </StoryContent>
      </StoryContainer>
    </>
  );
};

export default Hospital;
