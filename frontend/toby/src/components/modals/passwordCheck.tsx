import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { postParentsPassword } from "../../apis/analysisApi";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
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
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 40%;
  transform: translate(-50%, -50%);
  padding: 1.5% 3% 1.5% 3%;
  background-image: url("/Image/modal/passwordModal.png");
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

const ButtonGroup = styled.div`
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

  box-sizing: border-box;
`;

const CloseButton = styled.button`
  padding: 3% 8%;
  background-color: #80cee1;
  color: white;
  border: none;
  border-radius: 15%;
  cursor: pointer;

  height: 100%;
  width: auto;
`;

const ConfirmButton = styled.button`
  padding: 3% 8%;
  background-color: #9ad255;
  color: white;
  border: none;
  border-radius: 15%;
  cursor: pointer;
  height: 100%;
  width: auto;
  box-sizing: border-box;
`;

const PasswordInput = styled.input`
  padding: 7%;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: auto;
  margin-top: -10%;
  box-sizing: border-box;

  justify-content: center;
  ::placeholder {
    color: #888;
    font-size: calc(1.5em + 5vw);
  }
`;

const ConstructionText = styled.h2`
  width: 100%;
  height: auto;
  object-fit: contain;
  text-align: center;
  overflow-wrap: break-word;
  font-size: calc(1em + 1.5vw);
  box-sizing: border-box;
  margin-top: calc(15%);
`;

const ConstructionModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const isCorrect = await postParentsPassword(password);

    if (isCorrect) {
      navigate("/report");
    } else {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      setPassword("");
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ConstructionText>비밀번호를 입력해주세요</ConstructionText>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <ButtonGroup>
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ConstructionModal;
