import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Webcam, { WebcamRef } from "react-webcam";
import { submitQuiz, getQuizAnswer } from "../apis/quizApi";

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
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
    formData.append("quizId", quizId.toString());

    submitQuiz(formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {imageSrc ? (
        <>
          <img src={imageSrc} alt="captured" />
          <button onClick={retake}>Retake</button>
          <button onClick={submit}>Sumbit</button>
        </>
      ) : (
        <>
          <Webcam
            audio={false}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      )}
    </>
  );
};

export default QuizWebCam;
