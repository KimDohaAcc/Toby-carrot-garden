import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getAllQuiz } from "../../apis/quizApi";
import SignatureCanvas from "react-signature-canvas";
import { submitQuiz, getQuizAnswer } from "../../apis/quizApi";
import WaitToby from "./WaitToby";
import FailToby from "./FailToby";
import SuccessToby from "./SuccessToby";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { setHospitalQuizClear } from "../../store/slices/hospitalSlice";
import { setSchoolQuizClear } from "../../store/slices/schoolSlice";
import { setMartQuizClear } from "../../store/slices/martSlice";
import { setPoliceQuizClear } from "../../store/slices/policeSlice";

const BlackBoard = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("/Image/modal/칠판.png");
  background-size: contain;
  background-repeat: no-repeat; /* 이미지 반복 없이 설정 */
  background-position: center; /* 이미지를 가운데 정렬 */
  width: 90%;
  height: 90%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const StoryDrawingModalContainer = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 24vw;
  background-color: rgb(15, 65, 0);
`;

const ModalArea = styled.div`
  display: flex;
  flex: 1;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 1px;
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
    // const canvas = signaturePadRef.current.getCanvas();
    // console.log(canvas);
    // const context = canvas.getContext("2d");
    // console.log(context);
    // context.fillStyle = "white";
    // context.fillRect(0, 0, canvas.width, canvas.height);
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
        } else if (place === "mart") {
          dispatch(setMartQuizClear(true));
        } else if (place === "police") {
          dispatch(setPoliceQuizClear(true));
        }
      } else {
        setModalState("fail");
      }
    } catch (error) {
      setModalState("fail");
    }
    setIsSubmitting(false); // 제출 완료
  }, [isSubmitting, isPolling, isOpen, quizId]);
  const place_id = useSelector<RootState, number>(
    (state: RootState) => state.place.placeId
  );
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
            setModalState(score > 50 ? "success" : "fail");
            if (score > 50) {
              // 성공한 경우에만 getAllQuiz를 호출합니다.
              try {
                const allQuizResponse = await getAllQuiz({ place_id });
                console.log(allQuizResponse);
              } catch (error) {
                console.error("Error fetching all quizzes:", error);
              }
            }
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
    <BlackBoard>
      <StoryDrawingModalContainer>
        <ModalArea ref={modalRef}>
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="white"
            backgroundColor="black"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: "signature-canvas",
              style: { backgroundColor: "rgb(15, 65, 0)" }, // 배경을 흰색으로 설정
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
    </BlackBoard>
  );
};

export default StoryDrawingModal;
