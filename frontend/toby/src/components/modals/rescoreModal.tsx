import React from "react";
import styled from "styled-components";
import { getRescore } from "../../apis/analysisApi";

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

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ConfirmationContent = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ConfirmationButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:first-child {
    background-color: #4caf50;
    color: white;
  }
  &:last-child {
    background-color: #f44336;
    color: white;
  }
`;

const RescoreModal = ({ isOpen, onClose, quizId, onRescore }) => {
  return isOpen ? (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>재채점 하시겠습니까?</h2>
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
