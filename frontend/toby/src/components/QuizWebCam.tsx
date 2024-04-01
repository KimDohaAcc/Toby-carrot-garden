import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import { submitQuiz, getQuizAnswer } from "../apis/quizApi";
import WaitToby from "./modals/WaitToby";
import FailToby from "./modals/FailToby";
import SuccessToby from "./modals/SuccessToby";

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

const QuizWebCam = ({ quizId }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [modalState, setModalState] = useState("none");
  const [memberQuizId, setMemberQuizId] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
  };

  const submit = async () => {
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
        // 여기서 memberQuizId가 성공적으로 정의되었습니다.
        // const memberQuizId2 = response.data.result.memberQuizId;

        checkQuizAnswer({ memberQuizId: response.data.result.memberQuizId });
      } else {
        console.error("Quiz submission failed");
        // memberQuizId 관련된 로그 라인은 이곳에 있으면 안 됩니다.
        setModalState("fail");
      }
    } catch (error) {
      console.error("Quiz submission error", error);
      setModalState("fail");
    }
  };

  const checkQuizAnswer = useCallback(async ({ memberQuizId }) => {
    try {
      const answerResponse = await getQuizAnswer({
        member_quiz_id: memberQuizId,
      });

      if (answerResponse.status === 200 && answerResponse.result.score !== -1) {
        setModalState(answerResponse.result.score === 100 ? "success" : "fail");
      } else {
        console.error("Failed to get quiz answer");
        setModalState("fail");
      }
    } catch (error) {
      console.error("Error fetching quiz answer", error);
      setModalState("fail");
    }
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
        <>
          <img src={imageSrc} alt="Captured" />
          <button onClick={retake}>Retake</button>
          <button onClick={submit}>Submit</button>
        </>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: "100%", height: "80%" }}
            audio={false}
          />
          <button onClick={capture}>Capture Photo</button>
        </>
      )}
    </>
  );
};

export default QuizWebCam;
