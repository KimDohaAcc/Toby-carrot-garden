import React, { useRef, useState, useEffect, useCallback } from "react";
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
  /* background-image: url("경로/이미지.png"); */
  background-size: cover;
  border: none;
`;

const StoryDrawingModal = ({ isOpen, onClose, quizId }) => {
  const signaturePadRef = useRef(null);
  const modalRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [modalState, setModalState] = useState<
    "none" | "wait" | "success" | "fail"
  >("none");

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

  useEffect(() => {
    if (modalState === "success" || modalState === "fail") {
      const timer = setTimeout(() => {
        setModalState("none");
        onClose(); // Automatically close modal after 2 seconds
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalState, onClose]);
  const handleSaveDrawing = async () => {
    if (signaturePadRef.current && isOpen) {
      const canvas = signaturePadRef.current.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");

      // dataURL을 Blob으로 변환
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([blob], "drawing.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("analysisImage", file);
      formData.append("quizId", quizId.toString());

      try {
        const response = await submitQuiz(formData);
        if (response.status === 200 && response.data.result.memberQuizId) {
          console.log("Quiz submitted successfully");
          console.log(response.data.result.memberQuizId);
          setModalState("wait");
          console.log(response);
          // 여기서 memberQuizId가 성공적으로 정의되었습니다.
          // const memberQuizId2 = response.data.result.memberQuizId;
  
          checkQuizAnswer({ memberQuizId: response.data.result.memberQuizId });
        } else {
          console.error("Quiz submission failed");
          // memberQuizId 관련된 로그 라인은 이곳에 있으면 안 됩니다.
          setModalState("fail");
        }
      } catch (error) {
        console.error("Quiz submission error", error);
        setModalState("fail");
      }
    };
    const checkQuizAnswer = useCallback(async ({ memberQuizId }) => {
      let attempts = 0;
      const maxAttempts = 10;
  
      const interval = setInterval(async () => {
        try {
          const answerResponse = await getQuizAnswer({ memberQuizId });
  
          if (answerResponse.status === 200) {
            clearInterval(interval); // Stop polling on success
            setModalState(
              answerResponse.result.score === 100 ? "success" : "fail"
            );
          } else {
            console.error("Failed to get quiz answer");
            setModalState("fail");
          }
        } catch (error) {
          console.error("Error fetching quiz answer", error);
          // Optionally, handle retry logic or stop on certain errors
        }
  
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval); // Stop polling after max attempts
          console.error("Max polling attempts reached, stopping.");
          setModalState("fail"); // Considered fail after max attempts without success
        }
      }, 1000); // Poll every second
    }, []);
    useEffect(() => {
      if (modalState !== "wait" && modalState !== "none") {
        const timeout = setTimeout(() => setModalState("none"), 2000);
        return () => clearTimeout(timeout);
      }
    }, [modalState]);

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
            style: { backgroundColor: "white" }, // 배경을 흰색으로 설정
          }}
          minWidth={5} // 펜 굵기 최소값
          maxWidth={5} // 펜 굵기 최대값
        />
      </ModalArea>
      <CloseBtn onClick={handleSaveDrawing}>다 그렸어요</CloseBtn>
      {modalState === "wait" && (
        <WaitToby onClose={() => setModalState("none")} />
      )}
      {modalState === "success" && (
        <SuccessToby onClose={() => setModalState("none")} />
      )}
      {modalState === "fail" && (
        <FailToby onClose={() => setModalState("none")} />
      )}
    </StoryDrawingModalContainer>
  );
};

export default StoryDrawingModal;
