import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleAreaClick = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ position: "relative", width: "100vw", display: "block" }}>
      <img
        src="src\assets\images\backgroundImage.png"
        alt="background-map"
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      <img
        src="src\assets\images\logoImage.png"
        alt="logo"
        style={{
          position: "absolute",
          top: "1%",
          left: "1%",
          width: "16%",
          height: "24%",
        }}
        onClick={() => handleAreaClick("/")}
      />

      <img
        src="src\assets\images\analysisImage.png"
        alt="analysis"
        style={{
          position: "absolute",
          top: "26%",
          left: "14%",
        }}
        onClick={() => handleAreaClick("/analysis")}
      />
      <img
        src="src\assets\images\carrotImage.png"
        alt="carrot"
        style={{
          position: "absolute",
          top: "30%",
          left: "41%",
        }}
        onClick={() => handleAreaClick("/carrot")}
      />
      <img
        src="src\assets\images\hospitalImage.png"
        alt="hospital"
        style={{
          position: "absolute",
          top: "30%",
          left: "75%",
        }}
        onClick={() => handleAreaClick("/hospital")}
      />
      <img
        src="src\assets\images\martImage.png"
        alt="mart"
        style={{
          position: "absolute",
          top: "65%",
          left: "20%",
        }}
        onClick={() => handleAreaClick("/mart")}
      />
      <img
        src="src\assets\images\policeofficeImage.png"
        alt="police"
        style={{
          position: "absolute",
          top: "70%",
          right: "20%",
        }}
        onClick={() => handleAreaClick("/police")}
      />
      <img
        src="src\assets\images\schoolImage.png"
        alt="school"
        style={{
          position: "absolute",
          top: "6%",
          left: "35%",
        }}
        onClick={() => handleAreaClick("/school")}
      />
      <img
        src="src\assets\images\toby\maintoby.png"
        alt="maintoby"
        style={{
          position: "absolute",
          bottom: "1%",
          left: "1%",
        }}
      />
    </div>
  );
};

export default MainPage;
