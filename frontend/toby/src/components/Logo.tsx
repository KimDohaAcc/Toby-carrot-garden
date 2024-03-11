import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 12%;
  height: auto;
  padding: 10px;
  border: 2px solid cyan;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 18%; // 작은 화면에서는 로고 크기를 늘림
  }
`;

const Logo = () => {
  const navigate = useNavigate();

  return (
    <LogoWrapper onClick={() => navigate("/")}>
      <img
        src="src/assets/images/logoImage.png"
        alt="logo"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </LogoWrapper>
  );
};

export default Logo;
