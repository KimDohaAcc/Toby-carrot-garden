import React from "react";
import styled from "styled-components";

import Logo from "../components/Logo";
import MypageContent from "../components/mypage/MypageContent";
import LogoutBtn from "../components/LogoutBtn";

const MypageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid black;
`;

const LogoArea = styled.div`
  flex: 0 0 15%;
  border: 2px solid black;
`;

const MypageContentContainer = styled.div`
  height: 100%;
  flex: 0 0 85%;
  flex-direction: column;
  border: 2px solid black;
  display: flex;
`;

const LogoutArea = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 15%;
  border: 2px solid black;
`;

const MypageContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 2px solid black;
`;

const Mypage = () => {
  return (
    <>
      <Logo />
      <MypageContainer>
        <LogoArea />
        <MypageContentContainer>
          <LogoutArea>
            <LogoutBtn />
          </LogoutArea>
          <MypageContentArea>
            <MypageContent />
          </MypageContentArea>
        </MypageContentContainer>
      </MypageContainer>
    </>
  );
};

export default Mypage;
