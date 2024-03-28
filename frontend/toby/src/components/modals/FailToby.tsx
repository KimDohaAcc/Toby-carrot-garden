import React from "react";

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

interface ModalProps {
  onClose: () => void; // onClose는 함수 타입을 가지며, 반환 값은 없습니다.
}

// FailToby 컴포넌트에 ModalProps 인터페이스를 props 타입으로 적용
const FailToby: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <img src="/Image/toby/failRabbit.png" alt="failRabbit" />
      </ModalBox>
    </ModalBackdrop>
  );
};

export default FailToby;
