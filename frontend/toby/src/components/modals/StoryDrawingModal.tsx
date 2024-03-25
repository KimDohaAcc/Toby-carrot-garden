import React from "react";
import styled from "styled-components";

const StoryDrawingModalContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%; /* 부모 요소의 50% 위치에 배치 */
  left: 50%; /* 부모 요소의 50% 위치에 배치 */
  transform: translate(-50%, -50%); /* 요소의 가로와 세로 중앙 정렬 */
  width: 80%;
  height: 80%;
  border: 2px solid black;
  background-color: #aeaeae;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalArea = styled.div`
  display: flex;
  border: 2px solid black;
`;

const CloseBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-image: url("경로/이미지.png");
  background-size: cover; /* 이미지를 버튼에 맞게 크기 조정 */

  border: none; /* 기본 버튼 스타일 제거 */
`;

const StoryDrawingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <StoryDrawingModalContainer>
      <ModalArea></ModalArea>
      <CloseBtn onClick={onClose}>다 그렸어요 이미지</CloseBtn>
    </StoryDrawingModalContainer>
  );
};

export default StoryDrawingModal;
