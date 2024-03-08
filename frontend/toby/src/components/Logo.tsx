import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      src="src/assets/images/logoImage.png"
      alt="logo"
      style={{
        position: "absolute",
        top: "1%",
        left: "1%",
        width: "12%",
        height: "auto",
      }}
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
