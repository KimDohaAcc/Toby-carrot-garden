import React from "react";
import styled from "styled-components";

const StoryDrawingModalContainer = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  border: 2px solid black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const ModalComplete = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const StoryDrawingModal = () => {
  return (
    <StoryDrawingModalContainer>
      <ModalArea></ModalArea>
      <ModalComplete></ModalComplete>
    </StoryDrawingModalContainer>
  );
};

export default StoryDrawingModal;
