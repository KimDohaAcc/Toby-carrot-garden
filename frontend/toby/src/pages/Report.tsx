import React, { useState } from "react";

import styled from "styled-components";
import Logo from "../components/Logo";

// 전체 컨테이너
const ReportContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

//  카테고리와 내용을 나누기 위한 컨테이너
const ReportCategory = styled.div`
  width: 20%;
  height: 100%;
  display: grid;
  grid-template-rows: 3fr 2fr 2fr 2fr 2fr;
  /* grid-row-gap: 10px; */
  grid-template-areas:
    "Logo"
    "category1"
    "category2"
    "category3"
    "category4";
  border: 2px solid black;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px; // Adds a little space between the buttons
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  width: 60%;
  height: 50%;
  justify-content: center;
  align-items: center;
  border-radius: 5%;

  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Category1 = styled.div`
  grid-area: category1;
  display: flex;
  /* justify-content: center; // Centers the buttons horizontally */
  align-items: left; // Centers the buttons vertically
  gap: 10px; // Adds space between the buttons
  border: 2px solid black;
  flex-direction: column;
`;

const Category2 = styled.div`
  grid-area: category2;
  display: flex;
  /* justify-content: center; // Centers the buttons horizontally */
  align-items: left; // Centers the buttons vertically
  gap: 10px; // Adds space between the buttons
  border: 2px solid black;
  flex-direction: column;
`;

const Category3 = styled.div`
  grid-area: category3;
  display: flex;
  /* justify-content: center; // Centers the buttons horizontally */
  align-items: left; // Centers the buttons vertically
  gap: 10px; // Adds space between the buttons
  border: 2px solid black;
  flex-direction: column;
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
  flex-grow: 5;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
`;
const ContentExpress = styled.div`
  flex-grow: 1;
  border: 2px solid red;
`;
const ContentElse = styled.div`
  flex-grow: 1;
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
`;
const ContentGraph = styled.div`
  flex-grow: 3;
  border: 2px solid red;
`;
const ContentExplain = styled.div`
  flex-grow: 2;
  border: 2px solid yellow;
`;
const Report = () => {
  const [contentText, setContentText] = useState("");
  const [showBoxes, setShowBoxes] = useState(false);
  const [showHistory, setshowHistory] = useState(false);

  const handleAnalysisClick = () => {
    setContentText(
      "분석: 우리 아이가 풀었던 문제에 대한 통계 자료를 볼 수 있어요!"
    );
    setShowBoxes(true);
  };
  const handleHistoryClick = () => {
    setContentText(
      "히스토리 우리 아이가 풀었던 문제를 확인 할 수 있어요! 채점이 잘못되었다면 부모님이 다시 채점 해주세요!"
    );
    setShowBoxes(false);
    setshowHistory(true);
  };
  const handleMypageClick = () => {
    setContentText(
      "히스토리 우리 아이가 풀었던 문제를 확인 할 수 있어요! 채점이 잘못되었다면 부모님이 다시 채점 해주세요!"
    );
    setShowBoxes(false);
    setshowHistory(true);
  };
  return (
    <>
      <Logo />
      <ReportContainer>
        <ReportCategory>
          <div style={{ height: "30%" }}></div>
          <Category1>
            <StyledButton onClick={handleAnalysisClick}>분석</StyledButton>
          </Category1>
          <Category2>
            <StyledButton onClick={handleHistoryClick}>히스토리</StyledButton>
          </Category2>
          <Category3>
            <StyledButton>마이페이지</StyledButton>
          </Category3>
          <div style={{ height: "30%" }}></div>
        </ReportCategory>
        <ReportContent>
          <ContentCategory>{contentText}</ContentCategory>
          <Content>
            {showBoxes && (
              <>
                <ContentElse>
                  <ContentGraph></ContentGraph>
                  <ContentExplain></ContentExplain>
                </ContentElse>
                <ContentExpress>박스 2</ContentExpress>
              </>
            )}
          </Content>
        </ReportContent>
      </ReportContainer>
    </>
  );
};

export default Report;
