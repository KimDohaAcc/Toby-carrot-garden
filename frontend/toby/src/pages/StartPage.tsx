import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

// import { getKakaoPage } from "../apis/signupAPI";

const StartPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: url("Image/common/startImage.png"); // 새로운 배경 이미지 경로
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

const StartPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/privacyConsentForm");
  };
  return (
    <>
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
    </>
  );
};

export default StartPage;
