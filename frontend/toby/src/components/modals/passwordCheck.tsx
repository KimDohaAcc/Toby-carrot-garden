import React, { useState } from "react";
import styled from "styled-components";
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
`;

const ModalBox = styled.div`
  padding: 5% 10%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 정렬을 위해 추가 */
  img {
    width: 100%;
    height: auto;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20%;
  display: flex;
  justify-content: center;
  gap: 10%;
  width: 100%;
`;

const CloseButton = styled.button`
  padding: 6% 11%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmButton = styled.button`
  padding: 6% 11%;
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
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ConstructionText = styled.h2`
  text-align: center;
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
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ConstructionText>비밀번호를 입력하시오</ConstructionText>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
         <ButtonGroup> {/* 버튼 그룹으로 감싸기 */}
        <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        </ButtonGroup>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default ConstructionModal;
