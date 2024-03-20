import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
// import { useNavigate, useLocation } from "react-router-dom";
import { getKakaoPage, postKakaoToken } from "../apis/signupAPI";

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
  const handleSignupClick = async () => {
    try {
      const kakaoPageData = await getKakaoPage();
      if (kakaoPageData && kakaoPageData.result && kakaoPageData.result.uri) {
        window.location.href = kakaoPageData.result.uri;
      } else {
        console.error("카카오 로그인 페이지 URI를 받아오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("카카오 로그인 처리 중 에러가 발생했습니다.", error);
    }
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
