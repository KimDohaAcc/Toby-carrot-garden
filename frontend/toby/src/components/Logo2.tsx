import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled.div`
  position: absolute;
  height: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const LogoWrapper2 = styled.div`
  position: absolute;
  height: 100%;
  width: auto;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
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
