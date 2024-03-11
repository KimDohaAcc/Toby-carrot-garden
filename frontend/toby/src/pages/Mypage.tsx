import React from "react";
import styled from "styled-components";

import Logo from "../components/Logo";
import MypageContent from "../components/MypageContent";

const MypageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  border: 2px solid black;
`;

const LogoArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const MypageContentContainer = styled.div`
  flex-grow: 6;
  flex-direction: column;
  border: 2px solid black;
  display: flex;
`;

const LogoutArea = styled.div`
  flex-grow: 1;
  border: 2px solid black;
`;

const MypageContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 6;
  border: 2px solid black;
`;

const Mypage = () => {
  return (
    <>
      <Logo />
      <MypageContainer>
        <LogoArea />
        <MypageContentContainer>
          <LogoutArea>로그아웃 버튼 들어갈 영역임</LogoutArea>
          <MypageContentArea>
            <MypageContent />
          </MypageContentArea>
        </MypageContentContainer>
      </MypageContainer>
    </>
  );
};

export default Mypage;
