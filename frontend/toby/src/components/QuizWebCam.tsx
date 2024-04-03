import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import { submitQuiz, getQuizAnswer } from "../apis/quizApi";
import WaitToby from "./modals/WaitToby";
import FailToby from "./modals/FailToby";
import SuccessToby from "./modals/SuccessToby";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { setSchoolQuizClear } from "../store/slices/schoolSlice";
import { setHospitalQuizClear } from "../store/slices/hospitalSlice";
import { setMartQuizClear } from "../store/slices/martSlice";
import { setPoliceQuizClear } from "../store/slices/policeSlice";

const base64ToMultipartFile = (base64String, fileName) => {
  const byteString = atob(base64String.split(",")[1]);
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], fileName, { type: mimeString });
};

const videoConstraints = {
  width: 600,
  height: 600,
  facingMode: "user",
};

const WebcamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const CameraArea = styled.div`
  display: flex;
  flex: 0 0 80%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: calc(1%);
  width: 100%;
  height: 90%;
  cursor: url("/Image/cursor/hover.png"), pointer;
  background-repeat: no-repeat;
`;

const CameraButtonArea = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin: 0 calc(1%);
  cursor: url("/Image/cursor/hover.png"), pointer;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
  }

  &:hover{
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateY(1px);
  }
`;

const CamereButton = styled.image`
  height: calc(100%);
  width: calc(5vh);
  background-image: url("/Image/button/camera.png");
  background-size: 100% 100%;
`;

const CamereSubmitButton = styled.image`
  height: calc(100%);
  width: calc(5vh);
  background-image: url("/Image/button/cameraSubmit.png");
  background-size: 100% 100%;
`;

const CamereAgainButton = styled.image`
  height: calc(100%);
  width: calc(5vh);
  background-image: url("/Image/button/cameraAgain.png");
  background-size: 100% 100%;
`;

const CamereText = styled.div`
  margin-left: 10px;
  font-size: calc(1vw);
  align-self: center;
`;


const QuizWebCam = ({ quizId, place }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [modalState, setModalState] = useState("none");
  const [submitQuizState, setSubmitQuizState] = useState(false);
  const [memberQuizId, setMemberQuizId] = useState("");

  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
    setSubmitQuizState(false);
  };

  const submit = async () => {
    setSubmitQuizState(true);

    if (!imageSrc) {
      console.error("No image to submit");
      return;
    }

    const file = base64ToMultipartFile(imageSrc, "captured.jpg");
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

        checkQuizAnswer({ memberQuizId: response.data.result.memberQuizId });
      } else {
        console.error("Quiz submission failed");

        setModalState("fail");
      }
      if (place === "school") {
        dispatch(setSchoolQuizClear(true));
      } else if (place === "hospital") {
        dispatch(setHospitalQuizClear(true));
      } else if (place === "mart") {
        dispatch(setMartQuizClear(true));
      } else if (place === "police") {
        dispatch(setPoliceQuizClear(true));
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
        const answerResponse = await getQuizAnswer({
          memberQuizId,
        });

        if (answerResponse.status === 200) {
          clearInterval(interval);
          setModalState(
            answerResponse.result.score === 100 ? "success" : "fail"
          );
        } else {
          console.error("Failed to get quiz answer");
          setModalState("fail");
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

  useEffect(() => {
    if (modalState !== "wait" && modalState !== "none") {
      const timeout = setTimeout(() => setModalState("none"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [modalState]);

  return (
    <>
      {modalState === "wait" && (
        <WaitToby onClose={() => setModalState("none")} />
      )}
      {modalState === "success" && (
        <SuccessToby onClose={() => setModalState("none")} />
      )}
      {modalState === "fail" && (
        <FailToby onClose={() => setModalState("none")} />
      )}
      {imageSrc ? (
        <WebcamContainer>
          <CameraArea>
            <Image src={imageSrc} alt="Captured" />
          </CameraArea>
          <ButtonArea style={{ margin: "5%" }}>
            <CameraButtonArea onClick={retake} >
              <CamereAgainButton />
              <CamereText>다시찍기</CamereText>
            </CameraButtonArea>
            <CameraButtonArea onClick={submit} disabled={submitQuizState} style={{
              backgroundColor: submitQuizState? "rgba(0, 0, 0, 0.1)": "",
              transform: submitQuizState ? "translateY(1px)" : ""}}>
              <CamereSubmitButton />
              <CamereText>제출하기</CamereText>
            </CameraButtonArea>
          </ButtonArea>
        </WebcamContainer>
      ) : (
        <WebcamContainer>
          <CameraArea>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: "100%", height: "100%" }}
              audio={false}
            />
          </CameraArea>
          <ButtonArea>
            <CameraButtonArea onClick={capture}>
              <CamereButton />
              <CamereText>사진찍기</CamereText>
            </CameraButtonArea>
          </ButtonArea>
        </WebcamContainer>
      )}
    </>
  );
};

export default QuizWebCam;
