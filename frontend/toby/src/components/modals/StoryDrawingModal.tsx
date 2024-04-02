import React, { useRef, useState, useEffect } from "react";
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
        // submitQuiz 함수 호출 시 반환된 데이터를 response 변수에 할당
        const submitResponse = await submitQuiz(formData);
        const { status, result } = submitResponse;

        if (status === 200) {
          // 제출에 성공한 경우 memberQuizId 추출
          const memberQuizId = submitResponse.data.result.memberQuizId;

          setModalState("wait"); // 폴링 동안 WaitToby 모달 표시

          const endTime = Date.now() + 10000; // 10초 후 폴링 종료
          const intervalId = setInterval(async () => {
            if (Date.now() > endTime) {
              clearInterval(intervalId);
              setModalState("fail"); // 10초 동안 분석 결과를 받지 못하면 FailToby 모달 표시
              return;
            }

            // getQuizAnswer 호출 시 submitQuiz에서 받은 memberQuizId를 사용
            const answerResponse = await getQuizAnswer(memberQuizId);
            if (
              answerResponse.status === 200 &&
              answerResponse.result.score !== -1
            ) {
              clearInterval(intervalId);
              setModalState(
                answerResponse.result.score === 100 ? "success" : "fail"
              ); // 점수에 따라 SuccessToby 또는 FailToby 모달 표시
            }
          }, 1000);
        } else {
          console.error("Quiz submission failed", submitResponse.message);
          setModalState("fail"); // 제출 실패 시 FailToby 모달 표시
        }
      } catch (error) {
        console.error("이미지 전송 실패", error);
        setModalState("fail"); // 전송 실패 시 FailToby 모달 표시
      }
    }
  };

  // 모달 상태가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    let timer;
    if (["success", "fail"].includes(modalState)) {
      timer = setTimeout(() => {
        setModalState("none"); // SuccessToby 또는 FailToby 모달을 2초 후 자동으로 닫음
        onClose(); // 모달 닫기 콜백 함수 호출
      }, 2000);
    }
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
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
