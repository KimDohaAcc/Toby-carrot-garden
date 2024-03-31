import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  padding: 3%;
  background-image: url("/Image/storyList/martBackground.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: ${fadeInAnimation} 0.5s ease;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 99;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 10%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  font-size: calc(1.5em);
  background-color: white;
  cursor: pointer;
`;

const List = styled.p`
  margin-left: 8%;
  font-size: calc(1.5em + 1vw);
  font-weight: bold;
  color: white;
`;

const Image = styled.img`
  position: absolute;
  height: calc(30%);
  width: calc(25%);
  margin: calc(5%);
  height: auto;
  align-self: center;
`;

const MartStoryListModal = ({ onClose }) => {
  return (
    <>
      <ModalBackground onClick={onClose} />
      <ModalContainer>
        <CloseBtn onClick={onClose}>❌</CloseBtn>
        <List>마트 스토리 목록</List>
        <Image src="/Image/modal/constructionImage.png" />
      </ModalContainer>
    </>
  );
};

export default MartStoryListModal;
