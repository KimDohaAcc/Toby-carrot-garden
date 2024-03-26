// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import School from "./pages/School";
import Hospital from "./pages/Hospital";
import PoliceOffice from "./pages/PoliceOffice";
import Mypage from "./pages/Mypage";
import Mart from "./pages/Mart";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/StartPage";
import Webcam from "./components/WebCam";
import AuthPage from "./pages/AuthPage";
import PrivacyConsentForm from "./pages/PrivacyConsentForm";
import KakaoSignup from "./pages/KakaoSignup";
import KakaoLogin from "./pages/KakaoLogin";
import UserInfoForm from "./pages/UserInfoForm";

import styled from "styled-components";

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-size: cover;
  background-image: url("/Image/common/backgroundImage.png");
  overflow: hidden;
`;

function App() {
  return (
    <BackgroundContainer>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="privacyConsentForm" element={<PrivacyConsentForm />} />
        <Route path="kakaoSignup" element={<KakaoSignup />} />
        <Route path="kakaoLogin" element={<KakaoLogin />} />
        <Route path="main" element={<MainPage />} />
        <Route path="school" element={<School />} />
        <Route path="hospital/*" element={<Hospital />} />
        <Route path="police" element={<PoliceOffice />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mart" element={<Mart />} />
        <Route path="report" element={<Report />} />
        <Route path="signplus" element={<UserInfoForm />} />
        <Route path="webcam" element={<Webcam />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BackgroundContainer>
  );
}

export default App;
