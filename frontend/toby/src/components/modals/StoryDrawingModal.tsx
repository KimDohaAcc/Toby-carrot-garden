import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import { submitQuiz, getQuizAnswer } from "../../apis/quizApi";
import WaitToby from "./WaitToby";
import FailToby from "./FailToby";
import SuccessToby from "./SuccessToby";

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
  background-size: cover;
  border: none;
`;

const StoryDrawingModal = ({ isOpen, onClose, quizId }) => {
  const signaturePadRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [modalState, setModalState] = useState("none");

  useEffect(() => {
    if (isOpen) {
      const updateCanvasSize = () => {
        if (signaturePadRef.current) {
          const { offsetWidth, offsetHeight } =
            signaturePadRef.current.canvas.parentElement;
          setCanvasSize({ width: offsetWidth, height: offsetHeight });
        }
      };

      window.addEventListener("resize", updateCanvasSize);
      updateCanvasSize();
      return () => window.removeEventListener("resize", updateCanvasSize);
    }
  }, [isOpen]);

  const handleSaveDrawing = useCallback(async () => {
    if (!signaturePadRef.current || !isOpen) return;

    const dataUrl = signaturePadRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "drawing.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("analysisImage", file);
    formData.append("quizId", quizId);

    try {
      const response = await submitQuiz(formData);
      if (
        response.status === 200 &&
        response.data.result &&
        response.data.result.memberQuizId
      ) {
        const memberQuizId = response.data.result.memberQuizId;
        setModalState("wait");
        checkQuizAnswer(memberQuizId);
      } else {
        setModalState("fail");
      }
    } catch (error) {
      console.error("Quiz submission error", error);
      setModalState("fail");
    }
  }, [isOpen, quizId]);

  const checkQuizAnswer = useCallback(async (memberQuizId) => {
    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(async () => {
      try {
        const answerResponse = await getQuizAnswer({
          member_quiz_id: memberQuizId,
        });

        if (
          answerResponse.status === 200 &&
          answerResponse.data.result.score !== -1
        ) {
          clearInterval(interval);
          setModalState(
            answerResponse.data.result.score === 100 ? "success" : "fail"
          );
        } else {
          console.error("Failed to get quiz answer");
        }
      } catch (error) {
        console.error("Error fetching quiz answer", error);
      }

      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.error("Max polling attempts reached, stopping.");
        setModalState("fail");
      }
    }, 1000);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <StoryDrawingModalContainer>
        <ModalArea>
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="black"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: "signatureCanvas",
            }}
          />
        </ModalArea>
        <CloseBtn onClick={handleSaveDrawing}>Submit</CloseBtn>
      </StoryDrawingModalContainer>
      {modalState === "wait" && <WaitToby />}
      {modalState === "success" && <SuccessToby />}
      {modalState === "fail" && <FailToby />}
    </>
  );
};

export default StoryDrawingModal;
