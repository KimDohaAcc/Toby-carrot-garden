import React, { useState, useEffect } from "react";

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
  background-image: url("Image/common/startImage.png");
  position: relative;
  background-size: cover;
  z-index: 1;
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
  flex: 0 0 20%;
`;

const StyledButton = styled.div`
  /* padding: 8px 16px; */
  margin: 1% 1% 1% 1%; // Adds a little space between the buttons

  display: flex;
  position: absolute;
  /* width: 80%; // 버튼의 폭 고정
  height: 60%; // 버튼의 높이 고정 */
`;
const Image = styled.img`
  width: 70%; // 이미지 크기 조정
  height: 70%;
  margin-right: 2%;
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
  flex: 0 0 70%;
  /* flex-grow: 3; */
  border: 2px solid green;
  display: flex;
  flex-direction: column;
`;
const ReportGraphContentStyled = styled.div`
  flex-grow: 1; // 가능한 모든 공간을 차지
`;
const ContentGraphExplain = styled.div`
  flex: 0 0 15%;
  border: 3px solid pink;
`;
const ContentExplain = styled.div`
  flex: 0 0 30%;
  flex-grow: 3;
  border: 2px solid yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const GraphIndex = styled.img`
  display: flex;
  position: absolute;
`;
const ExplainImage = styled.img`
  display: flex;
  position: absolute;
`;
const Taehun = styled.h1`
  line-height: 60%;
  font-size: 70px;
`;
const Taehun2 = styled.h2`
  line-height: 60%;
  font-size: 40px;
`;
const Report = () => {
  const navigate = useNavigate();
  const [contentText, setContentText] = useState<React.ReactNode>("");
  const [showBoxes, setShowBoxes] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  // 버튼 클릭 핸들러

  useEffect(() => {
    // 초기 분석 탭 설정
    handleButtonClick("analysis");
  }, []);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // 클릭된 버튼 이름으로 상태 업데이트
    switch (buttonName) {
      case "analysis":
        setContentText(
          <>
            <Taehun>분석</Taehun>
            <Taehun2>
              우리 아이가 풀었던 문제에 대한 통계 자료를 볼 수 있어요!
            </Taehun2>
          </>
        );
        setShowBoxes(true);
        setShowHistory(false);
        break;
      case "history":
        setContentText(
          <>
            <Taehun> 히스토리</Taehun>
            <Taehun2>우리 아이가 풀었던 문제를 확인할 수 있어요!</Taehun2>
            <Taehun2>채점이 잘못되었다면 부모님이 다시 채점해주세요!</Taehun2>
          </>
        );
        setShowBoxes(false);
        setShowHistory(true);
        break;
      case "mypage":
        navigate("/mypage");
        break;
      default:
        break;
    }
  };

  // 버튼 이미지 선택 함수
  const getButtonImageSrc = (buttonName) => {
    const buttonImages = {
      analysis:
        activeButton === "analysis"
          ? "/Image/button/analysisButtonOn.png"
          : "/Image/button/analysisButtonOff.png",
      history:
        activeButton === "history"
          ? "/Image/button/historyButtonOn.png"
          : "/Image/button/historyButtonOff.png",
      mypage:
        activeButton === "mypage"
          ? "/Image/button/mypageButtonOn.png"
          : "/Image/button/mypageButtonOff.png",
    };
    return buttonImages[buttonName];
  };
  return (
    <>
      <Logo />
      <ReportContainer>
        <ReportCategory>
          <Category1>
            <StyledButton onClick={() => handleButtonClick("analysis")}>
              <Image src={getButtonImageSrc("analysis")} alt="분석 아이콘" />
            </StyledButton>
          </Category1>
          <Category2>
            <StyledButton onClick={() => handleButtonClick("history")}>
              <Image src={getButtonImageSrc("history")} alt="히스토리 아이콘" />
            </StyledButton>
          </Category2>
          <Category3>
            <StyledButton onClick={() => handleButtonClick("mypage")}>
              <Image
                src={getButtonImageSrc("mypage")}
                alt="마이페이지 아이콘"
              />
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
                    <ReportGraphContentStyled>
                      <ReportGraphContent />
                    </ReportGraphContentStyled>
                    <ContentGraphExplain>
                      <GraphIndex src="/Image/report/graphIndex.png" />
                    </ContentGraphExplain>
                  </ContentGraph>
                  <ContentExplain>
                    <ExplainImage src="/Image/report/wordExplain.png" />
                  </ContentExplain>
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
