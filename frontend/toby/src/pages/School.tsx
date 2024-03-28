import React from "react";

import styled from "styled-components";
import Logo from "../components/Logo";

const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid black;
`;

// 로고와 병원 내용을 나누기 위한 컨테이너
const LogoArea = styled.div`
  flex: 0 0 14%;
  border: 2px solid black;
  box-sizing: border-box;
`;

const StoryContentArea1 = styled.div`
  background-image: url("/Image/common/storyFrameImage.png");
  background-size: 100% 100%;
  flex: 0 0 86%;
  border: 2px solid black;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StoryContentArea2 = styled.div`
  display: grid;
  grid-template-areas:
    "conten closeBtn"
    "conten ."
    "conten nextBtn";
  grid-template-columns: 11fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  width: 82%;
  height: 80%;
  border: 2px solid black;
  position: absolute;
  left: 5%;
  top: 7%;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center; /* 버튼 내에서 텍스트를 수직 가운데 정렬 */
  grid-area: closeBtn;
  border: 1px solid black;
  background-color: #ff0e0e;
  color: black;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease; /* 마우스 호버 시 배경색이 부드럽게 변경되도록 트랜지션 추가. */
  font-size: 3rem;
  font-weight: bold;
  box-sizing: border-box;

  &:hover {
    background-color: #a9a9a9; /* 마우스를 올렸을 때 밝은 회색으로 배경색이 변경됩니다. */
  }
`;

const NextBtn = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: nextBtn;
  border: 1px solid black;
  img {
    width: 100%;
  }
`;

const Content = styled.div`
  grid-area: conten;
  border: 1px solid black;
`;

const School = () => {
  return (
    <>
      <Logo />
      <StoryContainer>
        <LogoArea />
        <StoryContentArea1>
          <StoryContentArea2>
            <Content>
              <img
                style={{ objectFit: "cover" }}
                src="/Image/002.png"
                alt="학교"
              />
            </Content>
            <CloseBtn>X</CloseBtn>

            <NextBtn>
              <img src="/Image/button/nextBtn.png" alt="다음 버튼" />
            </NextBtn>
          </StoryContentArea2>
        </StoryContentArea1>
      </StoryContainer>
    </>
  );
};

export default School;
