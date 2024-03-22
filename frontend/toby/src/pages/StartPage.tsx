import React, { useEffect, Suspense, lazy } from "react";
import styled from "styled-components";
// import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

// import { getKakaoPage } from "../apis/signupAPI";

const StartPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: url("Image/common/startImage.png");
`;
const HelloRabbit = styled.img`
  height: 80%;
  width: auto;
  position: absolute;
  left: 50%;
  top: 16%;
`;
const HelloRabbitText = styled.img`
  height: 45%;
  width: auto;
  position: absolute;
  left: 29%;
  top: 3%;
  /* top: 1%; */
`;

const SignupButton = styled.img`
  height: 15%;
  width: auto;
  position: absolute;
  left: 21%;
  top: 49%;
  /* top: 1%; */
`;
const LoginButton = styled.img`
  height: 15%;
  width: auto;
  position: absolute;
  left: 21%;
  top: 69%;
  /* top: 1%; */
`;
const Logo = lazy(() => import("../components/Logo"));
const StartPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 미리 로드할 이미지들의 경로
    const imagesToPreload = [
      "Image/common/startImage.png",
      "Image/toby/HelloRabbitImage.png",
    ];

    imagesToPreload.forEach((imageSrc) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imageSrc;
      document.head.appendChild(link);

      // Cleanup function
      return () => {
        document.head.removeChild(link);
      };
    });
  }, []);

  const handleSignupClick = () => {
    navigate("/privacyConsentForm");
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <StartPageContainer>
          <HelloRabbitText src="Image/toby/HelloRabbitTextImage.png" />
          <HelloRabbit src="Image/toby/HelloRabbitImage.png" />
          <SignupButton
            src="Image/button/signupButton.png"
            onClick={handleSignupClick} // 클릭 이벤트에 핸들러 연결
          />
          <LoginButton src="Image/button/loginButton.png" />
        </StartPageContainer>
        <Logo />
      </Suspense>
    </>
  );
};

export default StartPage;
