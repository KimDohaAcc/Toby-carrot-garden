import React from "react";

import styled from "styled-components";
import Logo from "../components/Logo";

// 전체 컨테이너
const ReportContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

//  카테고리와 내용을 나누기 위한 컨테이너
const ReportCategory = styled.div`
  width: 20%;
  height: 100%;
  display: grid;
  grid-template-rows: 3fr 2fr 2fr 2fr 3fr;
  grid-row-gap: 10px;
  grid-template-areas:
    "."
    "category1"
    "category2"
    "category3"
    ".";
  border: 2px solid black;
`;

const Category1 = styled.div`
  grid-area: category1;
  border: 2px solid black;
`;

const Category2 = styled.div`
  grid-area: category2;
  border: 2px solid black;
`;

const Category3 = styled.div`
  grid-area: category3;
  border: 2px solid black;
`;

//분석 내용을 담는 컨테이너
const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 2px solid black;
`;

const ContentCategory = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const Content = styled.div`
  flex-grow: 3;
  /* width: 20%; */
  border: 2px solid black;
`;

const School = () => {
  return (
    <>
      <Logo />
      <ReportContainer>
        <ReportCategory>
          <div></div>
          <Category1></Category1>
          <Category2></Category2>
          <Category3></Category3>
          <div></div>
        </ReportCategory>
        <ReportContent>
          <ContentCategory></ContentCategory>
          <Content></Content>
        </ReportContent>
      </ReportContainer>
    </>
  );
};

export default School;
