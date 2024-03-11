import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo.tsx";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 2px solid red;
  width: 100vw;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 2px solid yellow;
`;

const Box1Container = styled(Box)`
  flex-direction: column;
  gap: 10px;
  flex-grow: 1.5;
  min-height: 99vh;
  width: auto;
  background-color: #ddd;
`;

const Box1Child1 = styled.div`
  flex-grow: 2.5;
  width: 100%;
  background-color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box1Child2 = styled.div`
  flex-grow: 7.5;
  width: 100%;
  background-color: #bbb;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const Box2 = styled(Box)`
  flex-grow: 8.5;
  min-height: 99vh;
  width: auto;
  background-color: #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: lightgray;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 15px 30px; // 작은 화면에서는 버튼의 패딩을 늘림
    font-size: 18px; // 폰트 사이즈를 증가시킴
  }
`;

const Report = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Box1Container>
        <Box1Child1>
          {/* Logo 컴포넌트 예시로 사용; 실제 경로나 구현에 따라 달라질 수 있음 */}
          <Logo />
        </Box1Child1>
        <Box1Child2>
          <Button onClick={() => navigate("/analysis")}>분석</Button>
          <Button onClick={() => navigate("/history")}>히스토리</Button>
          <Button onClick={() => navigate("/myPage")}>마이페이지</Button>
        </Box1Child2>
      </Box1Container>
      <Box2>박스 2</Box2>
    </MainContainer>
  );
};

export default Report;
