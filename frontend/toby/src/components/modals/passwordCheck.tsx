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
  width: 20%;
  height: 20%;
  transform: translate(-50%, -50%);
  padding: 3%;
  background-image: url("/Image/modal/passwordModal.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeInAnimation} 0.5s ease;
`;

const ButtonGroup = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-content: center;

  gap: 10%;
  width: 100%;
  height: auto;
  /* height: 40%; */
`;

const CloseButton = styled.button`
  padding: 3% 8%;
  background-color: #80cee1;
  color: white;
  border: none;
  border-radius: 15%;
  cursor: pointer;

  /* &:hover {
    background-color: #0056b3;
  } */
`;

const ConfirmButton = styled.button`
  padding: 3% 8%;
  background-color: #9ad255;
  color: white;
  border: none;
  border-radius: 15%;
  cursor: pointer;

  /* &:hover {
    background-color: #218838;
  } */
`;

const PasswordInput = styled.input`
  /* margin-top: 20px; */
  padding: 4%;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
`;

const ConstructionText = styled.h2`
  text-align: center;
  font-size: calc(1.5em + 1vw);
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
        <ConstructionText>비밀번호 입력해주세요</ConstructionText>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <ButtonGroup>
          {" "}
          {/* 버튼 그룹으로 감싸기 */}
          <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ConstructionModal;
