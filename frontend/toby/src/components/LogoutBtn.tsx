import React from "react";
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
