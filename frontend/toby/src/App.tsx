import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import School from "./pages/School";
import Hospital from "./pages/Hospital";
import PoliceOffice from "./pages/PoliceOffice";
import Carrot from "./pages/Carrot";
import Mart from "./pages/Mart";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

function App() {
  const backgroundStyle = {
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundImage: `url('src/assets/images/backgroundImage.png')`,
  };

  return (
    <div
    // style={{
    //   position: "relative",
    //   height: "100vh",
    //   display: "block",
    //   ...backgroundStyle,
    // }}
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="school" element={<School />} />
        <Route path="hospital" element={<Hospital />} />
        <Route path="police" element={<PoliceOffice />} />
        <Route path="carrot" element={<Carrot />} />
        <Route path="mart" element={<Mart />} />
        <Route path="analysis" element={<Analysis />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
