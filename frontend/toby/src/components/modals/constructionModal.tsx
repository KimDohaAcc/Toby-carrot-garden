import React from "react";
import constructionImage from "../../assets/images/constructionImage.png";
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

const CloseButton = styled.button`
  // Add button styles here
  margin-top: 20px; // Adds some space above the button
`;
const ConstructionText = styled.h2`
  text-align: center;
`;

const ConstructionModal = ({ onClose }) => (
  <ModalBackdrop onClick={onClose}>
    <ModalBox onClick={(e) => e.stopPropagation()}>
      <img src={constructionImage} alt="Construction" />
      <ConstructionText>공사중입니다!</ConstructionText>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ModalBox>
  </ModalBackdrop>
);

export default ConstructionModal;
