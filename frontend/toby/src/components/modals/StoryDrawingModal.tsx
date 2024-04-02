import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import SignatureCanvas from "react-signature-canvas";
import { submitQuiz, getQuizAnswer } from "../../apis/quizApi";
import WaitToby from "./WaitToby";
import FailToby from "./FailToby";
import SuccessToby from "./SuccessToby";

import { setHospitalQuizClear } from "../../store/slices/hospitalSlice";
import { setSchoolQuizClear } from "../../store/slices/schoolSlice";

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
  const dispatch = useDispatch();
  const signaturePadRef = useRef(null);
  const modalRef = useRef(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSaveDrawing = useCallback(async () => {
    if (isSubmitting || isPolling || !isOpen) return; // 제출 중, 폴링 중, 모달 닫힘 상태 체크
    setIsSubmitting(true); // 제출 시작// To prevent multiple submissions
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
      if (response.status === 200 && response.data.result.memberQuizId) {
        setModalState("wait");
        pollQuizAnswer(response.data.result.memberQuizId, 0);
        if (place === "school") {
          dispatch(setSchoolQuizClear(true));
        } else if (place === "hospital") {
          dispatch(setHospitalQuizClear(true));
        } else if (quizId === 3) {
          console.log("placeId 3");
        } else if (quizId === 4) {
          console.log("placeId 4");
        }
      } else {
        setModalState("fail");
      }
    } catch (error) {
      setModalState("fail");
    }
    setIsSubmitting(false); // 제출 완료
  }, [isSubmitting, isPolling, isOpen, quizId]);

  const pollQuizAnswer = useCallback(async (memberQuizId, attempts = 0) => {
    setIsPolling(true); // 폴링 시작
    if (attempts >= 10) {
      setIsPolling(false); // 폴링 종료
      setModalState("fail"); // 최대 시도 회수 도달로 실패 처리
      return;
    }

    try {
      const response = await getQuizAnswer({ memberQuizId });
      if (response.status === 200) {
        const score = response.result.score;
        if (score !== -1) {
          setIsPolling(false); // 폴링 종료
          // score가 0이면 폴링 중지하고 실패 상태 설정
          if (score === 0) {
            setModalState("fail");
          } else {
            setModalState(score === 100 ? "success" : "fail");
          }
        } else {
          // score가 -1이면 아직 폴링 계속
          setTimeout(() => pollQuizAnswer(memberQuizId, attempts + 1), 1000); // 재귀적으로 다음 폴링 시도
        }
      } else {
        // 응답 상태가 200이 아니면 에러 처리
        setIsPolling(false); // 폴링 종료
        setModalState("fail");
      }
    } catch (error) {
      console.error("Error polling quiz answer:", error);
      // 에러 발생 시 다음 시도를 위해 재귀적 호출
      setTimeout(() => pollQuizAnswer(memberQuizId, attempts + 1), 1000);
    }
  }, []);
  useEffect(() => {
    if (modalState === "success" || modalState === "fail") {
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
