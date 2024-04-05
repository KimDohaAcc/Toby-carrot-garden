import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./config/ProtectedRoutes";

import MainPage from "./pages/MainPage";
import School from "./pages/School";
import Hospital from "./pages/Hospital";
import PoliceOffice from "./pages/PoliceOffice";
import Mypage from "./pages/Mypage";
import Mart from "./pages/Mart";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/StartPage";
import AuthPage from "./pages/AuthPage";
import PrivacyConsentForm from "./pages/PrivacyConsentForm";
import KakaoSignup from "./pages/KakaoSignup";
import KakaoLogin from "./pages/KakaoLogin";
import UserInfoForm from "./pages/UserInfoForm";
import styled from "styled-components";
import Example from "./pages/Example";
// import Tutorial from "./components/modals/tutorial";
function applyFixedTheme() {
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "#000000";
}

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-size: 100% 100%;
  background-image: url("/Image/common/backgroundImage.png");
  overflow: hidden;
`;

function App() {
  const windowRef = React.useRef(window);

  useEffect(() => {
    applyFixedTheme();

    const windowObj = windowRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        alert("개발자 도구 사용이 제한됩니다.");
      }
    };
    windowObj.addEventListener("keydown", handleKeyDown);
    return () => {
      windowObj.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <BackgroundContainer>
        <Routes>
          <Route path="/" element={<StartPage />} />
          {/* <Route path="tutorial" element={<Tutorial />} /> */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="kakaoSignup" element={<KakaoSignup />} />
          <Route path="kakaoLogin" element={<KakaoLogin />} />
          <Route path="signplus" element={<UserInfoForm />} />
          <Route path="privacyConsentForm" element={<PrivacyConsentForm />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="main" element={<MainPage />} />
            <Route path="school" element={<NotFound />} />
            <Route path="school/*" element={<School />} />
            <Route path="hospital" element={<NotFound />} />
            <Route path="hospital/*" element={<Hospital />} />
            <Route path="police" element={<NotFound />} />
            <Route path="police/*" element={<PoliceOffice />} />
            <Route path="mart" element={<NotFound />} />
            <Route path="mart/*" element={<Mart />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="report" element={<Report />} />
            <Route path="example" element={<Example />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BackgroundContainer>
    </>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { RouterInfo } from "./RouterInfo";

// const isAuth = localStorage.getItem("accessToken");

// const Authorization = ({ children }) => {
//   if (!isAuth) {
//     return <Navigate to="/" />;
//   } else {
//     return <>{children}</>;
//   }
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {RouterInfo.map(({ path, element, withAuth }) => (
//           <Route
//             key={path}
//             path={path}
//             element={
//               withAuth ? (
//                 <Authorization>{element}</Authorization>
//               ) : (
//                 <>{element}</>
//               )
//             }
//           />
//         ))}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
