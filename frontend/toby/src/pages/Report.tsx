import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Rescore from "../components/report/Rescore.tsx";
import ReportGraphContent from "../components/report/ReportGraphContent.tsx";
import ReportDrawings from "../components/report/ReportDrawings.tsx";
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
  position: relative;
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

const StyledButton = styled.div`
  padding: 8px 16px;
  margin: 0 5px; // Adds a little space between the buttons
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5%;
  width: 50%;
  height: 50%;
  justify-content: center;
  align-items: center;
  position: absolute;

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
  position: relative;
`;

const Category2 = styled.div`
  grid-area: category2;
  display: flex;
  /* justify-content: center; // Centers the buttons horizontally */
  align-items: left; // Centers the buttons vertically
  gap: 10px; // Adds space between the buttons
  border: 2px solid black;
  flex-direction: column;
  position: relative;
`;

const Category3 = styled.div`
  grid-area: category3;
  display: flex;
  /* justify-content: center; // Centers the buttons horizontally */
  align-items: left; // Centers the buttons vertically
  gap: 10px; // Adds space between the buttons
  border: 2px solid black;
  flex-direction: column;
  position: relative;
`;

//분석 내용을 담는 컨테이너
const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 2px solid black;
  height: 100%;
`;

const ContentCategory = styled.div`
  flex: 0 0 18%;

  min-height: 18%;
  max-height: 18%;
  border: 2px solid black;
`;

// Content 컴포넌트에 대한 스타일 정의
const Content = styled.div`
  flex: 82%;
  /* flex-grow: 5; */
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  // 이 부분을 추가하여 스크롤바를 숨깁니다.
`;
const ContentExpress = styled.div`
  flex: 0 0 50%;
  flex-grow: 1;
  border: 2px solid blue;
  height: 100%;
`;
const ContentElse = styled.div`
  flex: 0 0 50%;
  flex-grow: 1;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
`;
const ContentGraph = styled.div`
  flex: 0 0 60%;
  /* flex-grow: 3; */
  border: 2px solid green;
`;
const ContentExplain = styled.div`
  flex: 0 0 40%;
  flex-grow: 2;
  border: 2px solid yellow;
`;
const Report = () => {
  const navigate = useNavigate();
  const [contentText, setContentText] = useState("");
  const [showBoxes, setShowBoxes] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // 상태 업데이트 함수명 수정

  const handleAnalysisClick = () => {
    setContentText(
      "분석: 우리 아이가 풀었던 문제에 대한 통계 자료를 볼 수 있어요!"
    );
    setShowBoxes(true);
    setShowHistory(false); // 다른 버튼을 클릭할 때 showHistory를 false로 설정
  };

  const handleHistoryClick = () => {
    setContentText(
      "히스토리: 우리 아이가 풀었던 문제를 확인 할 수 있어요! 채점이 잘못되었다면 부모님이 다시 채점 해주세요!"
    );
    setShowBoxes(false);
    setShowHistory(true); // 히스토리 버튼 클릭 시 true로 설정
  };

  const handleMypageClick = () => {
    navigate("/mypage");
  };
  return (
    <>
      <Logo />
      <ReportContainer>
        <ReportCategory>
          <Category1>
            <StyledButton onClick={handleAnalysisClick}>
              <img
                src="/Image/report/reportAnalysis.png"
                alt="분석아이콘"
                style={{ width: "50px", height: "50px" }}
              />
              분석
            </StyledButton>
          </Category1>
          <Category2>
            <StyledButton onClick={handleHistoryClick}>
              <img
                src="/Image/report/reportHistory.png"
                alt="히스토리아이콘"
                style={{ width: "50px", height: "50px" }}
              />
              히스토리
            </StyledButton>
          </Category2>
          <Category3>
            <StyledButton onClick={handleMypageClick}>
              <img
                src="/Image/report/reportCarrot.png"
                alt="히스토리아이콘"
                style={{ width: "50px", height: "50px" }}
              />
              마이페이지
            </StyledButton>
          </Category3>
        </ReportCategory>
        <ReportContent>
          <ContentCategory>{contentText}</ContentCategory>
          <Content>
            {showBoxes && (
              <>
                <ContentElse>
                  <ContentGraph>
                    <ReportGraphContent />
                  </ContentGraph>
                  <ContentExplain></ContentExplain>
                </ContentElse>
                <ContentExpress>
                  <ReportDrawings></ReportDrawings>
                </ContentExpress>
              </>
            )}
            {showHistory && <Rescore />}{" "}
          </Content>
        </ReportContent>
      </ReportContainer>
    </>
  );
};

export default Report;
