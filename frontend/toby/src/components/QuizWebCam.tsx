import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { submitQuiz2, getQuizAnswer } from "../apis/quizApi";

const StyledWebcam = styled(Webcam)`
  flex: 0 0 80%;
`;

const CaptureButton = styled.button`
  margin-top: 5%;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuizWebCam = ({ quizId }) => {
  const webcamRef = useRef(null);
  const [resultImage, setResultImage] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      convertToImageFile(imageSrc);
    }
  }, [webcamRef]);

  const convertToImageFile = useCallback(async (base64String) => {
    const blob = await fetch(base64String).then((res) => res.blob());
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    uploadImage(file);
  }, []);

  const uploadImage = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("imageFile", file);
      formData.append("quizId", quizId.toString());

      try {
        await submitQuiz2(formData);
        setResultImage(""); // 초기 상태로 설정하여 결과 이미지를 미리 비움
        pollQuizResult();
      } catch (error) {
        console.error("업로드 실패:", error);
      }
    },
    [quizId]
  );

  const pollQuizResult = () => {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count < 10) {
        getQuizAnswer(quizId)
          .then((data) => {
            if (data.result.score !== -1) {
              clearInterval(intervalId);
              if (data.result.score === 100) {
                setResultImage("/Image/toby/carrotRabbit.png");
              } else if (data.result.score === 0) {
                setResultImage("/Image/toby/failRabbit.png");
              }
            }
          })
          .catch((error) => {
            console.error("퀴즈 결과 조회 실패:", error);
          });
        count++;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  return (
    <>
      <StyledWebcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <CaptureButton onClick={capture}>찰칵!</CaptureButton>
      {resultImage && <img src={resultImage} alt="Quiz Result" />}
    </>
  );
};

export default QuizWebCam;
