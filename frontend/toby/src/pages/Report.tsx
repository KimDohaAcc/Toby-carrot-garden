import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 250px;
  left: 38px;
`;

const BoxContainer = styled.div<{ isAnalysis: boolean }>`
  display: flex;
  flex-direction: ${({ isAnalysis }) => (isAnalysis ? "row" : "column")};
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-left: 310px;
  margin-right: 80px;
`;

const StyledButton = styled.button`
  padding: 10px;
  width: 160px;
`;

const Box = styled.div`
  padding: 20px;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 750px; // 분석 박스와 같은 높이
  width: 90%; // 화면의 대부분을 차지하도록 너비 조정
  margin: 0 auto; // 자동 마진으로 가운데 정렬
`;

const TextBox = styled.div`
  padding: 20px;
  padding-left: 335px;
  width: calc(100% - 335px); // 패딩을 고려한 너비 조정
  text-align: left;
`;
const TextBoxTitle = styled.div`
  padding: 20px;
  padding-left: 335px; // 왼쪽 패딩 추가로 텍스트 위치를 우측으로 조정
  width: 100%;
  text-align: left;
`;

const Report: React.FC = () => {
  const [activeView, setActiveView] = useState("");
  const navigate = useNavigate(); // navigate 함수를 초기화합니다.

  // 뷰 변경용 핸들러, 마이페이지 버튼용 별도의 핸들러가 필요
  const handleButtonClick = (view: string) => {
    setActiveView(activeView === view ? "" : view);
  };

  // 마이페이지 이동 핸들러
  const handleMypageClick = () => {
    navigate("/carrot"); // navigate 함수를 호출하여 /carrot 경로로 이동
  };

  return (
    <MainContainer>
      <ControlsContainer>
        <StyledButton onClick={() => handleButtonClick("analysis")}>
          분석
        </StyledButton>
        <StyledButton onClick={() => handleButtonClick("history")}>
          히스토리
        </StyledButton>
        <StyledButton onClick={handleMypageClick}>마이페이지</StyledButton>
      </ControlsContainer>
      {activeView === "analysis" && (
        <>
          <TextBoxTitle>분석</TextBoxTitle>
          <TextBox>
            우리 아이가 풀었던 문제에 대한 통계자료를 볼 수 있습니다.
          </TextBox>
          <BoxContainer isAnalysis={true}>
            <Box>박스 #1</Box>
            <Box>박스 #2</Box>
          </BoxContainer>
        </>
      )}
      {activeView === "history" && (
        <>
          <TextBoxTitle>히스토리</TextBoxTitle>
          <TextBox>우리 아이가 풀었던 문제를 확인할 수 있어요!</TextBox>
          <BoxContainer isAnalysis={false}>
            <Box>히스토리 내용이 여기 표시됩니다.</Box>
          </BoxContainer>
        </>
      )}
    </MainContainer>
  );
};

export default Report;
