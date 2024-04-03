import React from "react";
import styled from "styled-components";
import { clearUserStorage } from "../apis/userStorageApi";
import { useNavigate } from "react-router-dom";

const LogoutArea = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(8%);
  margin: calc(1%);
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: calc(50%);
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const Text = styled.div`
  white-space: nowrap; /* 텍스트가 한 줄로만 유지되도록 설정 */
  text-overflow: ellipsis; /* 텍스트가 요소의 영역을 넘어갈 때 생략 부호(...)를 표시 */
  overflow: hidden;
  font-size: 1.5vw;
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
      <Text>로그아웃</Text>
    </LogoutArea>
  );
};

export default LogoutBtn;
