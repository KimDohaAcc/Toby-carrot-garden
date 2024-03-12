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

import styled from "styled-components";

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-size: cover;
  background-image: url("src/assets/images/backgroundImage.png");
  overflow: hidden;
`;

function App() {
  return (
    <BackgroundContainer>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="school" element={<School />} />
        <Route path="hospital" element={<Hospital />} />
        <Route path="police" element={<PoliceOffice />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mart" element={<Mart />} />
        <Route path="report" element={<Report />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BackgroundContainer>
  );
}

export default App;
