import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearUserStorage } from "../apis/userStorageApi";
import { useNavigate } from "react-router-dom";


const LogoutArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  width: calc(8%);
  margin: calc(1%);
  font-size: calc(2rem);
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: calc(50%);
`;

const LogoutButton = styled.img`
  position: absolute;
  width: 30%;
  left: 55%;
  top: 5%;
`;
const UserName = styled.div`
  position: absolute;
  top: 6%;
  left: 3%;
  width: 150%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: calc(2vw); /* 기본 텍스트 크기를 반응형으로 설정 */
  z-index: 1;
`;
const LogoutBtn = () => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    clearUserStorage();
    navigate("/");
  };
  return (
    <LogoutArea onClick={() => handleLogout()}>
      <Image src="/Image/button/logoutButton.png" alt="logout" />
      <div>로그아웃</div>
    </LogoutArea>
  );
};

export default LogoutBtn;
