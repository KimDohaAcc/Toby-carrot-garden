import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  z-index: 10;
`;

const ModalBox = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: auto;
  }
`;

const CloseButton = styled.button`
  align-self: center;
  padding: 10px 20px;
  margin-top: 20px;
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
  align-self: center;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const PasswordInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ConstructionText = styled.h2`
  text-align: center;
`;

const ConstructionModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleConfirm = () => {
    // 여기에 비밀번호 확인 로직을 추가하세요
    console.log(password); // 비밀번호를 콘솔에 출력합니다
    navigate("/report"); // 비밀번호 확인 후 /report 경로로 이동합니다
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <img
          src="/Image/modal/constructionImage.png"
          alt="Under Construction"
        />

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default ConstructionModal;
