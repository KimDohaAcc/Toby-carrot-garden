import React, { useState, useRef, useCallback } from "react";
import Webcam, { WebcamRef } from "react-webcam";
import styled from "styled-components";

import { postClearImage } from "../apis/clearApi";

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

const QuizWebCam = ({ placeId }) => {
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
    formData.append("image", file);
    formData.append("placeId", placeId.toString());

    postClearImage(formData)
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
        <WebcamContainer>
          <CameraArea>
            <Image src={imageSrc} alt="captured" />
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
            <button style={{ width: "100%", height: "50%" }} onClick={submit}>
              제출하기
            </button>
          </ButtonArea>
        </WebcamContainer>
      ) : (
        <WebcamContainer>
          <CameraArea>
            <Webcam
              audio={false}
              height={600}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ width: "100%", height: "100%" }}
              width={600}
              videoConstraints={videoConstraints}
            />
          </CameraArea>
          <ButtonArea>
            <button style={{ width: "100%", height: "50%" }} onClick={capture}>
              사진찍기
            </button>
          </ButtonArea>
        </WebcamContainer>
      )}
    </>
  );
};

export default QuizWebCam;
