import React from "react";
import styled from "styled-components";

import Logo2 from "../components/Logo2";
import MypageContent from "../components/mypage/MypageContent";
import LogoutBtn from "../components/LogoutBtn";

const MypageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const LogoArea = styled.div`
  position: relative;
  flex: 0 0 15%;
`;

const MypageContentContainer = styled.div`
  height: 100%;
  flex: 0 0 85%;
  flex-direction: column;
  display: flex;
  overflow: hidden;
  object-fit: contain;
`;

const LogoutArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0 15%;
  flex-direction: row;
`;

const MypageContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  object-fit: contain;
`;
const Text1 = styled.h1`
  line-height: 60%;
  font-size: clamp(50px, 2vw, 70px);
`;
const Text2 = styled.h2`
  line-height: 60%;
  font-size: 40px;
`;
const Mypage = () => {
  return (
    <>
      <MypageContainer>
        <LogoArea>
          <Logo2 />
        </LogoArea>
        <MypageContentContainer>
          <LogoutArea>
            <Text1>마이페이지</Text1>
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
