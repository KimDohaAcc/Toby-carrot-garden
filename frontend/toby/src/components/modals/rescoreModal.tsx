import React from "react";
import styled, { keyframes } from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ModalContainer = styled.div`
  background-image: url("/Image/modal/rescoreModal.png");
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 40%;
  transform: translate(-50%, -50%);
  padding: 1.5% 3% 1.5% 3%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  animation: ${fadeInAnimation} 0.5s ease;
  justify-content: center;
  justify-items: center;
  align-items: center;
  object-fit: cover;
  overflow: hidden;
`;

const CloseButton = styled.div`
  /* float: right; */
  border: none;
  width: 20%;
  background-image: url("/Image/button/close.png");
  font-size: 1.5rem;
`;

const ConfirmationContent = styled.div`
  width: 100%;
  height: auto;
  object-fit: contain;
  text-align: center;
  overflow-wrap: break-word;
  font-size: calc(1em + 1.5vw);
  box-sizing: border-box;
  margin-top: calc(15%);
`;

const ConfirmationButton = styled.button`
  margin-top: -14%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  gap: 10%;
  width: 100%;
  height: auto;
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:first-child {
    background-color: #afd485;
    color: white;
  }
  &:last-child {
    background-color: #fd8a69;
    color: white;
  }
`;

const RescoreModal = ({ isOpen, onClose, quizId, onRescore }) => {
  return isOpen ? (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h1>재채점 하시겠습니까?</h1>
        <ConfirmationContent>
          <ConfirmationButton onClick={() => onRescore(quizId, 100)}>
            정답
          </ConfirmationButton>
          <ConfirmationButton onClick={() => onRescore(quizId, 0)}>
            오답
          </ConfirmationButton>
        </ConfirmationContent>
      </ModalContainer>
    </ModalBackdrop>
  ) : null;
};

export default RescoreModal;
