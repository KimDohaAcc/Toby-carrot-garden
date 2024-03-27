import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { api } from "../config/apiConfig"; // 서버 통신을 위한 API 설정을 불러옵니다.
import { submitQuiz2 } from "../apis/quizApi";

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

const QuizWebCam: React.FC = ({ quizId }) => {
  const webcamRef = useRef<Webcam>(null);
  //   const [imageSrc, setImageSrc] = useState<string | null>(null);

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
      const response = await api.post("/path/to/your/endpoint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("업로드 성공:", response.data);
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  return (
    <>
      <StyledWebcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <CaptureButton onClick={capture}>찰칵!</CaptureButton>
    </>
  );
};

export default QuizWebCam;
