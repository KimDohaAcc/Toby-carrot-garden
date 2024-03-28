import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import { submitQuiz2 } from "../../apis/quizApi";

const StoryDrawingModalContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border: 2px solid black;
  background-color: #aeaeae;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalArea = styled.div`
  display: flex;
  flex: 1;
  border: 2px solid black;
`;

const CloseBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  /* background-image: url("경로/이미지.png"); */
  background-size: cover;
  border: none;
`;

const StoryDrawingModal = ({ isOpen, onClose, quizId }) => {
  const signaturePadRef = useRef(null);
  const modalRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateCanvasSize() {
      if (modalRef.current) {
        const { width, height } = modalRef.current.getBoundingClientRect();
        // Border의 두께를 고려하지 않는 경우, 아래와 같이 설정할 수 있습니다.
        // 즉, ModalArea 자체의 크기를 직접 사용합니다.
        setCanvasSize({ width, height });
      }
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [isOpen]);

  const handleSaveDrawing = async () => {
    if (signaturePadRef.current && isOpen) {
      const canvas = signaturePadRef.current.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();

      const formData = new FormData();
      formData.append("analysisImage", blob, "drawing.png");
      formData.append("quizId", quizId.toString());
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
        // 파일의 경우, 파일 이름 등 추가 정보를 로그로 찍을 수 있습니다.
        if (value instanceof Blob) {
          console.log(`File name: ${value.name}, File type: ${value.type}`);
        }
      }
      // console.log()

      try {
        await submitQuiz2(formData);
        console.log("이미지 전송 성공");
        onClose();
      } catch (error) {
        console.error("이미지 전송 실패", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <StoryDrawingModalContainer>
      <ModalArea ref={modalRef}>
        <SignatureCanvas
          ref={signaturePadRef}
          penColor="black"
          canvasProps={{
            width: canvasSize.width,
            height: canvasSize.height,
            className: "signature-canvas",
          }}
        />
      </ModalArea>
      <CloseBtn onClick={handleSaveDrawing}>다 그렸어요</CloseBtn>
    </StoryDrawingModalContainer>
  );
};

export default StoryDrawingModal;