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
  height: 100%;
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
  flex: 0 0 20%;
  justify-content: space-around;
  width: 100%;
  height: auto;
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
        console.log("placeId 3");
      } else if (place === "police") {
        console.log("placeId 4");
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
          <ButtonArea>
            <button
              style={{
                width: "100%",
                height: "50%",
                backgroundColor: "lightgray",
              }}
              onClick={retake}
            >
              다시찍기
            </button>
            <button
              style={{ width: "100%", height: "50%" }}
              onClick={submit}
              disabled={submitQuizState}
            >
              제출하기
            </button>
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
            <button style={{ width: "100%", height: "50%" }} onClick={capture}>
              사진 찍기
            </button>
          </ButtonArea>
        </WebcamContainer>
      )}
    </>
  );
};

export default QuizWebCam;
