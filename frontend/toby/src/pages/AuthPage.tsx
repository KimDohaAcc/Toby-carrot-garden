// AuthPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postKakaoToken } from "../apis/signupAPI";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenCode = searchParams.get("tokenCode");
    console.log(tokenCode);

    if (tokenCode) {
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

  return <div>인증 처리 중...</div>;
};

export default AuthPage;
