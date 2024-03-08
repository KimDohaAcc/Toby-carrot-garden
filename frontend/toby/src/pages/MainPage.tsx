import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleAreaClick = (path: string) => {
    navigate(path);
  };

  // 부모 요소에 대한 스타일을 추가
  const containerStyle: React.CSSProperties = {
    position: "relative", // 이 부분을 추가
    height: "100vh", // 전체 높이를 차지하도록 설정
    width: "100vw", // 전체 너비를 차지하도록 설정
  };

  return (
    <div style={containerStyle}>
      {/* <img
        src="src\assets\images\logoImage.png"
        alt="logo"
        style={{
          position: "absolute",
          top: "1%",
          left: "1%",
          width: "12%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/")}
      /> */}

      <img
        src="src\assets\images\reportImage.png"
        alt="analysis"
        style={{
          position: "absolute",
          top: "26%",
          left: "8%",
          width: "20%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/analysis")}
      />
      <img
        src="src\assets\images\mypageImage.png"
        alt="carrot"
        style={{
          position: "absolute",
          top: "23%",
          left: "29%",
          width: "38%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/carrot")}
      />
      <img
        src="src\assets\images\hospitalImage.png"
        alt="hospital"
        style={{
          position: "absolute",
          top: "22%",
          left: "71%",
          width: "19%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/hospital")}
      />
      <img
        src="src\assets\images\martImage.png"
        alt="mart"
        style={{
          position: "absolute",
          top: "69%",
          left: "17%",
          width: "20%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/mart")}
      />
      <img
        src="src\assets\images\policeImage.png"
        alt="police"
        style={{
          position: "absolute",
          top: "65%",
          right: "20%",
          width: "20%",
          height: "auto",
        }}
        onClick={() => handleAreaClick("/police")}
      />
      <img
        src="src\assets\images\schoolImage.png"
        alt="school"
        style={{
          position: "absolute",
          top: "12%",
          left: "32%",
          width: "35%",
          height: "auto",
          zIndex: -3,
        }}
        onClick={() => handleAreaClick("/school")}
      />
      <img
        src="src\assets\images\toby\maintoby.png"
        alt="maintoby"
        style={{
          position: "absolute",
          bottom: "3%",
          right: "3%",
        }}
      />
    </div>
  );
};

export default MainPage;
