import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const WebcamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CaptureButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
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

const CapturedImage = styled.img`
  margin-top: 20px;
  max-width: 30%;
  border-radius: 10px;
`;

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    convertToImageFile(imageSrc);
  }, [webcamRef]);

  const convertToImageFile = async (base64String) => {
    const blob = await fetch(base64String).then((res) => res.blob());
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    // 이미지 파일 처리 로직(예: 업로드)을 여기에 추가하세요. 예를 들어:
    // uploadImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  };

  const handleClick = () => {
    setTimeout(() => {
      capture();
    }, 3000); // 3초 후에 capture 함수를 실행
  };

  return (
    <WebcamContainer>
      <Webcam
        audio={false}
        height={150}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={100}
      />
      <CaptureButton onClick={handleClick}>찰칵!</CaptureButton>
      {imageSrc && <CapturedImage src={imageSrc} alt="Captured" />}
    </WebcamContainer>
  );
};

export default WebcamCapture;
