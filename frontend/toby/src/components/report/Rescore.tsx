import React from "react";
import styled from "styled-components";

// RecoreContentContainer 컴포넌트에 대한 스타일 정의
const RecoreContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid green;
  flex-direction: column;
  overflow-y: auto; // 내용이 많아지면 스크롤바 생성
  padding: 10px;
`;
const RecoreBox = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid yellow;
  flex-direction: row;
`;
const RecoreBoxTitle = styled.div`
  height: 10%;
  width: 100%;

  border: 2px solid yellow;
`;
const RecoreBoxImage = styled.div`
  width: 100%;

  border: 2px solid green;
`;
const RecoreBoxAnswer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid green;
`;
const RecoreBoxAnswerText = styled.div`
  height: 50%;

  border: 2px solid green;
`;
const RecoreBoxAnswerCheck = styled.div`
  height: 50%;

  border: 2px solid green;
`;
const RecoreBoxRescore = styled.div`
  width: 100%;
  max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
  border: 2px solid green;
  display: flex;
  flex-direction: column;
`;
const RecoreBoxRescoreDate = styled.div`
  height: 50%;
  border: 2px solid green;
`;
const RecoreBoxRescoreButton = styled.div`
  height: 50%;
  border: 2px solid green;
`;
// const RecoreBoxContent = styled.div`
//   /* flex-direction: column; */
//   height: 40%;
//   width: 100%;
//   max-height: 100%; // 컨테이너의 최대 높이를 100%로 설정하여 내부 내용이 넘치면 스크롤바 생성
//   border: 2px solid yellow;
// `;
const ListItem = styled.div`
  padding: 9%;
  margin: 1% 0;
  border: 1px solid gray;
`;

const dummyList = [
  "문제 1: 정답",
  "문제 2: 오답",
  "문제 3: 정답",
  "문제 4: 정답",
  "문제 5: 오답",
  "문제 1: 정답",
  "문제 2: 오답",
  "문제 3: 정답",
  "문제 4: 정답",
  "문제 5: 오답",
  "문제 1: 정답",
  "문제 2: 오답",
  "문제 3: 정답",
  "문제 4: 정답",
  "문제 5: 오답",

  // 더 많은 데이터를 계속 추가할 수 있습니다.
];

const RecoreContent = () => {
  return (
    <RecoreContentContainer>
      <RecoreBoxTitle></RecoreBoxTitle>
      <RecoreBox>
        <RecoreBoxImage></RecoreBoxImage>
        <RecoreBoxAnswer>
          <RecoreBoxAnswerText></RecoreBoxAnswerText>
          <RecoreBoxAnswerCheck></RecoreBoxAnswerCheck>
        </RecoreBoxAnswer>
        <RecoreBoxRescore>
          <RecoreBoxRescoreDate></RecoreBoxRescoreDate>
          <RecoreBoxRescoreButton></RecoreBoxRescoreButton>
        </RecoreBoxRescore>
      </RecoreBox>
    </RecoreContentContainer>
  );
};

export default RecoreContent;
