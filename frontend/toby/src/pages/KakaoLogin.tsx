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

function KakaoLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenCode = queryParams.get("tokenCode");

    // 토큰 코드가 URL에 없는 경우 카카오 로그인 페이지로 리다이렉트
    if (!tokenCode) {
      getKakaoPage()
        .then((data) => {
          if (data && data.result && data.result.uri) {
            window.location.href = data.result.uri;
          } else {
            console.error("카카오 로그인 URI를 가져오는 데 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 처리 중 에러가 발생했습니다.", error);
        });
    } else {
      // URL에서 tokenCode를 가져왔을 경우의 로직
      postKakaoToken(tokenCode)
        .then((response) => {
          console.log("토큰 전송 완료", response.message);

          if (response.result && response.result.signupComplete) {
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

  return <Container />;
}

export default KakaoLogin;
