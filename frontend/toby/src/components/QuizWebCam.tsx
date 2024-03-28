import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
// import { api } from "../config/apiConfig"; // 서버 통신을 위한 API 설정을 불러옵니다.
import { submitQuiz2, getQuizAnswer } from "../apis/quizApi";

const StyledWebcam = styled(Webcam)`
  /* width: 100%; // 부모 컨테이너에 맞춰 조정
  height: auto; // 비율을 유지하면서 너비에 맞게 높이 조정 */
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
interface QuizWebCamProps {
  quizId: number;
}
const QuizWebCam: React.FC<QuizWebCamProps> = ({ quizId }) => {
  const webcamRef = useRef<Webcam>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultImage, setResultImage] = useState("");

  const capture = useCallback(() => {
    setTimeout(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        convertToImageFile(imageSrc);
      }
    }, 3000); // 3초 후에 capture 함수를 실행
  }, []);

  const convertToImageFile = async (base64String: string) => {
    const blob = await fetch(base64String).then((res) => res.blob());
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    uploadImage(file); // 서버로 이미지 업로드
  };

  // 이미지 파일을 서버로 업로드하는 함수
  const uploadImage = async (file: File) => {
      const formData = new FormData();
      formData.append("imageFile", file); // 'imageFile'은 서버가 요구하는 필드 이름입니다.
      formData.append("quizId", quizId);

      try {
        const response = await submitQuiz2(formData); // 수정된 함수 사용
        console.log("업로드 성공:", response);
      } catch (error) {
        console.error("업로드 실패:", error);
      }
    },
    [quizId];

  useEffect(() => {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count < 10) {
        getQuizAnswer(quizId)
          .then((data) => {
            if (data.result.score !== -1) {
              setShowResult(true);
              clearInterval(intervalId); // 조건 충족 시 폴링 중단
              if (data.result.score === 100) {
                setResultImage("public/Image/toby/carrotRabbit.png");
              } else if (data.result.score === 0) {
                setResultImage("public/Image/toby/failRabbit.png");
              }
            }
            count++;
          })
          .catch((error) => {
            console.error("퀴즈 결과 조회 실패:", error);
          });
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, [quizId]);

  return (
    <>
      <StyledWebcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <CaptureButton onClick={capture}>찰칵!</CaptureButton>
      {showResult && <img src={resultImage} alt="Quiz Result" />}
    </>
  );
};

export default QuizWebCam;
