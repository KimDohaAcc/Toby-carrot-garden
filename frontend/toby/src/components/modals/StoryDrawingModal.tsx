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
import { set } from "date-fns";

const BlackBoard = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;

  width: 70%;
  height: 70%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const StoryDrawingModalContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  padding-top: calc(100% / (5 / 3)); /* 5:3의 비율을 유지하도록 높이 설정 */
  max-width: 100vw; /* 최대 너비 설정 */
  background-image: url("/Image/modal/칠판.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ModalArea = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  top: 5%;
  width: 90%;
  height: 90%;
`;

const ButtonArea = styled.div`
  position: absolute;
  display: flex;
  width: 40%;
  height: 10%;
  bottom: 3%;
  left: 3%;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/Image/button/다그렸어요.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 90%;
  height: 100%;
  border: none;
  margin-right: 10px;
  border-radius: 20px;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const RetryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/Image/button/다시그리기.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 90%;
  height: 100%;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const CloseBoardBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/Image/button/닫기.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 80%;
  height: 100%;
  border: none;
  border-radius: 20px;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const FinDrawModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const TobyHeadImage = styled.img`
  position: absolute;
  top: -20%;
  left: -10%;
  width: 20%;
  height: auto;
`;

const FinDrawModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 20px;
`;

const ModalCloseBtn = styled.div`
  width: 40%;
  height: 10%;
  font-size: 3em;
  text-align: center;
  cursor: url("/Image/cursor/hover.png"), pointer;
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
  const [stopModal, setStopModal] = useState(false);

  const [showFinDrawModal, setShowFinDrawModal] = useState(false);

  const handleRetryDrawing = useCallback(() => {
    signaturePadRef.current.clear();
    setIsPolling(false);
    setIsSubmitting(false);
    setModalState("none");
  }, []);

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
    if (isSubmitting || isPolling || !isOpen) {
      setStopModal(true);
      return; // 제출 중, 폴링 중, 모달 닫힘 상태 체크
    }

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
  }, [isSubmitting, isPolling, isOpen, quizId, place, dispatch]);
  const place_id = useSelector<RootState, number>(
    (state: RootState) => state.place.placeId
  );
  const pollQuizAnswer = useCallback(async (memberQuizId, attempts = 0) => {
    setIsPolling(true); // 폴링 시작
    if (attempts >= 10) {
      setIsPolling(false); // 폴링 종료
      setIsSubmitting(false); // 제출 상태 초기화
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
            setIsSubmitting(false); // 제출 상태 초기화
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
        setIsSubmitting(false); // 제출 상태 초기화
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

  const checkIsEmpty = () => {
    if (signaturePadRef.current.isEmpty()) {
      console.log("비어 있습니다.");
      console.log(signaturePadRef.current.isEmpty());
      setShowFinDrawModal(true);
    } else {
      console.log("비어 있지 않습니다.");
      console.log(signaturePadRef.current.isEmpty());
      handleSaveDrawing();
    }
  };

  return (
    <BlackBoard>
      <StoryDrawingModalContainer>
        <ModalArea ref={modalRef}>
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="white"
            backgroundColor="transparent"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: "signature-canvas",
            }}
            minWidth={5} // 펜 굵기 최소값
            maxWidth={5} // 펜 굵기 최대값
          />
        </ModalArea>
        <ButtonArea>
          <CloseBtn onClick={checkIsEmpty}></CloseBtn>
          <RetryBtn onClick={handleRetryDrawing}></RetryBtn>
          <CloseBoardBtn onClick={onClose}></CloseBoardBtn>
        </ButtonArea>
        {stopModal && (
          <FinDrawModalContainer>
            <FinDrawModal>
              <TobyHeadImage src="/Image/toby/토비머리.png" alt="토비머리" />
              <p style={{ fontSize: "5em" }}>이미 제출했습니다.</p>
              <ModalCloseBtn onClick={() => setStopModal(false)}>
                확인
              </ModalCloseBtn>
            </FinDrawModal>
          </FinDrawModalContainer>
        )}
        {showFinDrawModal && (
          <FinDrawModalContainer>
            <FinDrawModal>
              <TobyHeadImage src="/Image/toby/토비머리.png" alt="토비머리" />
              <p style={{ fontSize: "5em" }}>그림을 그려주세요!</p>
              <ModalCloseBtn
                onClick={() => {
                  setShowFinDrawModal(false);
                }}
              >
                확인
              </ModalCloseBtn>
            </FinDrawModal>
          </FinDrawModalContainer>
        )}

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
