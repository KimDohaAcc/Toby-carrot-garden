import React from "react";
import styled from "styled-components";

const LogoutArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
`;

const LogoutBtn = () => {
  return (
    <LogoutArea onClick={() => alert("Logout 클릭임")}>
      <img src="src/assets/images/logoutImage.png" alt="logout" />
      <div>로그아웃</div>
    </LogoutArea>
  );
};

export default LogoutBtn;
