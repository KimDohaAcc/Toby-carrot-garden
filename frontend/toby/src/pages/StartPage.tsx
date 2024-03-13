import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";

const StartPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: url("src/assets/images/startImage.png"); // 새로운 배경 이미지 경로
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
  return (
    <>
      <StartPageContainer>
        <HelloRabbitText src="src\assets\images\HelloRabbitTextImage.png" />
        <HelloRabbit src="src\assets\images\HelloRabbitImage.png" />
        <SignupButton src="src\assets\images\signupButton.png" />
        <LoginButton src="src\assets\images\loginButton.png" />
      </StartPageContainer>
      <Logo></Logo>;
    </>
  );
};

export default StartPage;
