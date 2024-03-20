import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 25%;
  border: 2px solid cyan;
  justify-content: center;
  align-items: center;
`;

const Logo = () => {
  const navigate = useNavigate();

  return (
    <LogoWrapper onClick={() => navigate("/main")}>
      <img
        src="/Image/common/logoImage.png"
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
