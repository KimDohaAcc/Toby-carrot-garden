import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserStorage } from "../apis/userStorageApi";
const LogoWrapper = styled.div`
  position: absolute;
  height: 25%;
  width: auto;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
  cursor: pointer;
`;

const LogoWrapper2 = styled.div`
  position: absolute;
  height: 100%;
  width: auto;
  border: 2px solid black;
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
