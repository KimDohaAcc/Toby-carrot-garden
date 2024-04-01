import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo3 from "../components/Logo3";
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
  object-fit: contain;
`;

//  카테고리와 내용을 나누기 위한 컨테이너
const ReportCategory = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  grid-template-rows: 3fr 2fr 2fr 2fr 2fr;
  /* grid-row-gap: 10px; */
  grid-template-areas:
    "."
    "category1"
    "category2"
    "category3"
    "category4";
  border: 2px solid black;
  flex: 0 0 15%;
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
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const ContentCategory = styled.div`
  flex: 0 0 10%;
  height: 100%;
  width: 100%;
  border: 2px solid black;
`;

// Content 컴포넌트에 대한 스타일 정의
const Content = styled.div`
  flex: 1;
  border: 2px solid black;
  display: flex;
  height: 100%;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
`;
const ContentExpressBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const ContentExpressButton = styled.img`
  position: absolute;
  width: 25%;
  height: 100%;
  left: 5%;
`;
const ContentExpressButtonContiner = styled.div`
  flex: 0 0 10%;
  border: 2px solid black;
  overflow: hidden;
  object-fit: contain;
  align-items: left;
  width: 100%;
  height: 100%;

  justify-items: left;
  align-content: left;
  justify-content: left;
  position: relative;
`;
const ContentExpress = styled.div`
  flex: 0 0 90%;
  box-sizing: border-box; // 요소의 크기 계산에 경계선 포함
  border: 14px solid #e4f0d5;
  background-color: white;
  border-radius: 7%;
  height: 85%;
  max-height: 89%;
  width: 100%;
`;
const ContentElseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const ContentElse = styled.div`
  flex: 0 0 90%;
  box-sizing: border-box; // 요소의 크기 계산에 경계선 포함
  border: 14px solid #ccd2f0;
  background-color: white;
  border-radius: 7%;
  height: 100%;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ContentGraphContainer = styled.div`
  flex: 0 0 10%;
  border: 2px solid black;
  overflow: hidden;
  object-fit: contain;
  align-items: left;
  width: 100%;
  height: 100%;

  justify-items: left;
  align-content: left;
  justify-content: left;
  position: relative;
`;
const ContentGraphButtonContainer = styled.div`
  flex: 0 0 10%;
  border: 1px solid yellow;
  overflow: hidden;
  object-fit: contain;
  align-items: left;

  justify-items: left;
  align-content: left;
  justify-content: left;
  position: relative;
`;

const ContentGraph = styled.div`
  height: 100%;
  width: auto;
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  flex: 0 0 60%;
`;
const ReportGraphContentStyled = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex: 0 0 70%;
`;
const ContentGraphExplain = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 30%;
  border: 2px solid pink;
`;
const ContentExplain = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 40%;
  border: 5px solid yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  object-fit: contain;
  overflow: hidden;
`;
const GraphIndex = styled.img`
  display: flex;
  position: absolute;
`;
const ExplainImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Taehun = styled.h1`
  line-height: 60%;
  font-size: 3rem;
`;
const Taehun2 = styled.h2`
  line-height: 60%;
  font-size: 2rem;
`;

const AudioBtn = styled.button<{ isPlaying: boolean }>`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url(${props => props.isPlaying ? "/Image/button/no-sound.png" : "/Image/button/sound.png"});
  background-size: 100% 100%;
  background-color: transparent;
  border: none;  
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent; 
  }
`;
const AudioArea = styled.div`
  position: absolute;
  top: calc(1%);
  right: calc(1%);
  margin: calc(2%);
`;


const Report = () => {
  const navigate = useNavigate();
  const [contentText, setContentText] = useState<React.ReactNode>("");
  const [showBoxes, setShowBoxes] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("audioRef is null");
    }
  };

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
              우리 아이가 풀었던 문제에 대한 통계와 표현을 볼 수 있어요!
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
      <ReportContainer>
        <AudioArea>
          <audio ref={audioRef} controls autoPlay loop hidden>
            <source src="/Sound/toby_analysis.mp3" type="audio/mpeg" />
          </audio>
          <AudioBtn isPlaying={isPlaying} onClick={handleTogglePlay} />
        </AudioArea>

        <ReportCategory>
          <Logo3 />
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
                <ContentElseContainer>
                  <ContentGraphContainer>
                    <ContentExpressButton src="/Image/button/graphButtonOn.png" />
                  </ContentGraphContainer>
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
                </ContentElseContainer>

                <ContentExpressBox>
                  <ContentExpressButtonContiner>
                    <ContentExpressButton src="/Image/button/ExpressButtonOn.png" />
                  </ContentExpressButtonContiner>
                  <ContentExpress>
                    <ReportDrawings></ReportDrawings>
                  </ContentExpress>
                </ContentExpressBox>
              </>
            )}
            {showHistory && <Rescore />}
          </Content>
        </ReportContent>
      </ReportContainer>
    </>
  );
};

export default Report;
