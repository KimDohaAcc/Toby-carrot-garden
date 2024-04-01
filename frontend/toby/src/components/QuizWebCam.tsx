import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Webcam, { WebcamRef } from "react-webcam";
import { submitQuiz, getQuizAnswer } from "../apis/quizApi";
import WaitToby from "./modals/WaitToby";
import FailToby from "./modals/FailToby";
import SuccessToby from "./modals/SuccessToby";

const base64ToMultipartFile = (
  base64String: string,
  fileName: string
): File | null => {
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

const QuizWebCam = ({ quizId }) => {
  const webcamRef = useRef<WebcamRef>(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [modalState, setModalState] = useState<
    "none" | "wait" | "success" | "fail"
  >("none");
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrcs = webcamRef.current.getScreenshot();
      setImageSrc(imageSrcs);
    } else {
      console.error("webcamRef is null");
    }
  }, [webcamRef]);
  console.log(imageSrc);

  const retake = () => {
    setImageSrc(null);
  };

  const submit = () => {
    if (!imageSrc) {
      console.error("No image to submit");
      return;
    }

    const file = base64ToMultipartFile(imageSrc, "captured.jpg");
    if (!file) {
      console.error("Failed to convert image to file");
      return;
    }

    const formData = new FormData();
    formData.append("analysisImage", file);
    formData.append("quizId", quizId);

    //   submitQuiz(formData)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    try {
      const response = submitQuiz(formData);
      console.log(response);
      setModalState("wait");
    } catch (error) {
      console.error("Quiz submission failed", error);
    }
  };
  useEffect(() => {
    let interval;
    let timeout; // 10초가 지난 후 모달 창을 닫기 위한 타임아웃 변수 선언

    if (modalState === "wait") {
      // 폴링 시작
      interval = setInterval(async () => {
        try {
          const response = await getQuizAnswer({ quizId });
          if (
            response &&
            response.status === 200 &&
            response.result.score !== -1
          ) {
            clearInterval(interval); // 조건 충족 시 폴링 중단
            clearTimeout(timeout); // 10초 타임아웃 해제
            setModalState(response.result.score === 100 ? "success" : "fail");

            // 성공 또는 실패 상태에서 2초 후 모달 창 닫기
            setTimeout(() => {
              setModalState("none");
            }, 2000);
          }
        } catch (error) {
          console.error("Error fetching quiz answer", error);
          clearInterval(interval); // 에러 발생 시 폴링 중단
          clearTimeout(timeout); // 10초c 타임아웃 해제
        }
      }, 1000);

      // 10초 후 폴링 중단하고 모달 창 닫기
      timeout = setTimeout(() => {
        clearInterval(interval);
        setModalState("none");
      }, 10000); // 10초 후 폴링을 중단하고 모달을 닫습니다.
    }

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 폴링 중단
      clearTimeout(timeout); // 타임아웃 중단
    };
  }, [modalState, quizId]);

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
        <>
          <img src={imageSrc} alt="Captured" />
          <button onClick={retake}>Retake</button>
          <button onClick={submit}>Submit</button>
        </>
      ) : (
        <>
          <Webcam
            style={{ width: "100%", height: "80%" }}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture Photo</button>
        </>
      )}
    </>
  );
};

export default QuizWebCam;
