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
  background-image: url("/Image/common/startImage.png");
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

const RabbitImage = styled.img`
  height: 70%;
  margin-bottom: 2%;
  margin-left: 20%;
`;

const KakaoButton = styled.img`
  width: 50%;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

function KakaoSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignupClick = async () => {
    try {
      const kakaoPageData = await getKakaoPage();
      // kakaoPageData.result가 존재하고, 그 안에 uri가 존재하는지 확인
      if (
        kakaoPageData &&
        kakaoPageData.result &&
        "uri" in kakaoPageData.result
      ) {
        window.location.href = kakaoPageData.result.uri;
      } else {
        // 적절한 오류 처리를 위해 kakaoPageData를 로그로 찍어보기
        console.error("URI를 찾을 수 없습니다.", kakaoPageData);
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
          <RabbitImage src="/Image/toby/cuteRabbit_text1.png" />
          <KakaoButton
            src="/Image/button/kakao_login_large_wide.png"
            onClick={handleSignupClick}
          />
        </ConsentBorder>
      </Container>
    </>
  );
}

export default KakaoSignup;
