import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { postKakaoToken, getKakaoPage } from "../apis/signupAPI";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: url("Image/common/startImage.png");
`;
const ConsentBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 15px solid #ec903b;
  width: 60%;
  height: 70%;
  border-radius: 3%;
  background-color: white;
`;

const RabbitImage = styled.img``;

const KakaoButton = styled.img``;

function KakaoSignup() {
  const navigate = useNavigate();
  const location = useLocation();
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
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenCode = queryParams.get("tokenCode");

    if (tokenCode) {
      console.log("Token Code:", tokenCode);
      postKakaoToken(tokenCode)
        .then((response) => {
          console.log("토큰 전송 완료", response.message);

          if (response.result.signupComplete) {
            navigate("/main");
          } else {
            navigate("/signplus");
          }
        })
        .catch((error) => {
          console.error("토큰 전송 실패", error);
        });
    }
  }, [location, navigate]);
  return (
    <>
      <Container>
        <ConsentBorder>
          <RabbitImage src="Image/toby/cuteRabbit_text1.png" />
          <KakaoButton
            src="Image/button/kakao_login_large_wide.png"
            onClick={handleSignupClick}
          />
        </ConsentBorder>
      </Container>
    </>
  );
}

export default KakaoSignup;
