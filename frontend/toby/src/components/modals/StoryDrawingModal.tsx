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
  const [memberQuizId, setMemberQuizId] = useState(null);
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
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "drawing.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("analysisImage", file);
      formData.append("quizId", quizId.toString());

      try {
        const submitResponse = await submitQuiz(formData);
        if (
          submitResponse.status === 201 &&
          submitResponse.result.memberQuizId
        ) {
          setMemberQuizId(submitResponse.result.memberQuizId);

          setModalState("wait");
          startPolling(submitResponse.result.memberQuizId);
        } else {
          setModalState("fail");
        }
      } catch (error) {
        console.error("Quiz submission error", error);
        setModalState("fail");
      }
    }
  };

  const startPolling = useCallback((memberQuizId) => {
    const endTime = Date.now() + 10000; // 10초 후 종료
    const poll = async () => {
      if (Date.now() > endTime) {
        setModalState("fail");
        return;
      }

      const response = await getQuizAnswer(memberQuizId);
      if (response.status === 200) {
        if (response.result.score === 100) {
          setModalState("success");
        } else if (response.result.score === -1) {
          setTimeout(poll, 1000); // 1초 후 다시 폴링
        } else {
          setModalState("fail");
        }
      } else {
        setModalState("fail");
      }
    };

    poll();
  }, []);

  useEffect(() => {
    let timer;
    if (modalState === "success" || modalState === "fail") {
      timer = setTimeout(() => {
        setModalState("none");
        onClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [modalState, onClose]);

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
            style: { backgroundColor: "white" }, // 배경을 흰색으로 설정
          }}
          minWidth={5} // 펜 굵기 최소값
          maxWidth={5} // 펜 굵기 최대값
        />
      </ModalArea>
      <CloseBtn onClick={handleSaveDrawing}>다 그렸어요</CloseBtn>
      {modalState === "wait" && <WaitToby />}
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
