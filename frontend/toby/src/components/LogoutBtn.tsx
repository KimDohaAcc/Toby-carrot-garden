import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserStorage, clearUserStorage } from "../apis/userStorageApi";

// const UserArea = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   box-sizing: border-box;
//   border: 1px solid black;
//   position: relative;
// `;
const UserButton = styled.img`
  position: absolute;
  width: 100%;
  left: -100%;
  top: 5%;
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
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserStorage();
    if (userInfo && userInfo.name) {
      setUserName(`${userInfo.name}` + " ");
    }
  }, []);

  const handleLogout = () => {
    clearUserStorage();
    navigate("/");
  };

  return (
    <>
      <UserName>{userName}어린이</UserName>
      <UserButton src="/Image/button/nameBackground.png" />
      <LogoutButton
        src="/Image/button/logoutButton.png"
        onClick={handleLogout}
      />
    </>
  );
};

export default LogoutBtn;
