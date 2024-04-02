import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import { submitQuiz, getQuizAnswer } from "../../apis/quizApi";
import WaitToby from "./WaitToby";
import FailToby from "./FailToby";
import SuccessToby from "./SuccessToby";

import { setHospitalQuizClear } from "../../store/slices/hospitalSlice";
import { setSchoolQuizClear } from "../../store/slices/schoolSlice";

import { useDispatch } from "react-redux";

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

const StoryDrawingModal = ({ isOpen, onClose, quizId, place }) => {
  const signaturePadRef = useRef(null);
  const modalRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [modalState, setModalState] = useState<
    "none" | "wait" | "success" | "fail"
  >("none");
  const [isPolling, setIsPolling] = useState(false);
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

  const handleSaveDrawing = useCallback(async () => {
    if (!isPolling && signaturePadRef.current && isOpen) {
      setIsPolling(true); // To prevent multiple submissions
      const canvas = signaturePadRef.current.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "drawing.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("analysisImage", file);
      formData.append("quizId", quizId.toString());

      try {
        const response = await submitQuiz(formData);
        if (
          response.status === 200 &&
          response.data &&
          response.data.result &&
          response.data.result.memberQuizId
        ) {
          setModalState("wait");
          pollQuizAnswer(response.data.result.memberQuizId, 0);
        } else {
          setModalState("fail");
        }
      } catch (error) {
        console.error("Error submitting quiz:", error);
        setModalState("fail");
      } finally {
        setIsPolling(false); // Reset the flag after submission and polling are done
      }
    }
  }, [isOpen, isPolling, quizId]);

  const pollQuizAnswer = useCallback(async (memberQuizId, attempts) => {
    if (attempts >= 10) {
      setModalState("fail");
      return;
    }

    try {
      const response = await getQuizAnswer({ memberQuizId });
      if (
        response.status === 200 &&
        response.data &&
        response.data.result.score !== -1
      ) {
        setModalState(response.data.result.score === 100 ? "success" : "fail");
      } else {
        setTimeout(() => pollQuizAnswer(memberQuizId, attempts + 1), 1000);
      }
    } catch (error) {
      console.error("Error polling quiz answer:", error);
      setTimeout(() => pollQuizAnswer(memberQuizId, attempts + 1), 1000);
    }
  }, []);

  useEffect(() => {
    if (modalState !== "none" && modalState !== "wait") {
      const timeout = setTimeout(() => {
        setModalState("none");
        onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
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
