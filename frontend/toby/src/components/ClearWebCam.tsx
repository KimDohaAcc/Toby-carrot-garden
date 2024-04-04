import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam, { WebcamRef } from "react-webcam";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { postClearImage } from "../apis/clearApi";

import { setHospitalQuizClear } from "../store/slices/hospitalSlice";
import { setSchoolQuizClear } from "../store/slices/schoolSlice";
import { setMartQuizClear } from "../store/slices/martSlice";
import { setPoliceQuizClear } from "../store/slices/policeSlice";
import ClearToby from "./modals/ClearToby";

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
  height: 85%;
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
  height: 100%;
  cursor: url("/Image/cursor/hover.png"), pointer;
  background-repeat: no-repeat;
`;

const CameraButtonArea = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin: 0 calc(5%);
  height: 7vh;
  padding: 5px;
  cursor: url("/Image/cursor/hover.png"), pointer;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  transition: background-color 0.3s ease;
  border-radius: 15px;

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
  width: calc(6vh);
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


const QuizWebCam = ({ placeId }) => {
  const webcamRef = useRef<WebcamRef>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [submitQuizState, setSubmitQuizState] = useState(false);
  const [modalState, setModalState] = useState(false);


  const dispatch = useDispatch();

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
    setSubmitQuizState(false);
  };

  const submit = () => {
    setSubmitQuizState(true);
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
        if (placeId === 2) {
          dispatch(setHospitalQuizClear(true));
        } else if (placeId === 1) {
          dispatch(setSchoolQuizClear(true));
        } else if (placeId === 3) {
          dispatch(setMartQuizClear(true));
        } else if (placeId === 4) {
          dispatch(setPoliceQuizClear(true));
        }
        setModalState(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (modalState) {
      const timeout = setTimeout(() => setModalState(false), 3200);
      return () => clearTimeout(timeout);
    }
  }, [modalState]);

  return (
    <>
      {modalState  && (
        <ClearToby onClose={() => setModalState(false)} />
      )}
      {imageSrc ? (
        <WebcamContainer>
          <CameraArea>
            <Image src={imageSrc} alt="captured" />
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
