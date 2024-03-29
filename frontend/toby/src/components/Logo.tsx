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
  z-index: 10;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const Logo = () => {
  const navigate = useNavigate();

  return (
    <LogoWrapper onClick={() => navigate("/main")}>
      <LogoImg src="/Image/common/logoImage.png" alt="logo" />
    </LogoWrapper>
  );
};

export default Logo;
