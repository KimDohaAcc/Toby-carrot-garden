import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../components/Logo";
import MypageContent from "../components/mypage/MypageContent";
import LogoutBtn from "../components/LogoutBtn";
import { getUserStorage, clearUserStorage } from "../apis/userStorageApi";

const MypageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  position: relative;
`;

const LogoArea = styled.div`
  flex: 0 0 15%;
  border: 2px solid black;
  position: relative;
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
  /* justify-content: flex-end; */
  /* align-items: center; // 가운데 정렬로 변경 */
  flex: 0 0 15%;
  border: 5px solid black;
  position: relative;
  flex-direction: row;
`;
const MypageExplain = styled.div`
  display: flex;
  flex: 0 0 70%;
  border: 3px solid green;
`;
const UserArea = styled.div`
  display: flex;
  flex-direction: column;
  left: 50%;
  /* flex-direction: row; */
  border: 1px solid black;
  margin-top: 2%;
  /* overflow: hidden;
  object-fit: contain; */
  position: absolute;
  width: 20%;
`;
const UserButton = styled.img`
  position: absolute;
  width: 20%;
  /* flex: 0 0 75%; */
  border: 1px solid red;
  /* width: 100%; */
  /* height: auto; */
  object-fit: cover;
`;

const LogoutButton = styled.img`
  /* position: absolute; */
  /* /* width: 10%; */
  /* left: 55%; */
  top: 5%;
  /* flex: 0 0 25%; */
  border: 1px solid yellow;
  width: 20%;
  height: 90px;
  object-fit: contain;
`;
const UserName = styled.div`
  position: absolute;
  top: 23%;
  left: 80%;
  width: 10%;
  border: 2px solid red;
  /* transform: translateX(-50%); */
  color: #ffffff;
  font-size: calc(2vw); /* 기본 텍스트 크기를 반응형으로 설정 */
  z-index: 1;
`;
const MypageContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border: 2px solid black;
`;

const Mypage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    // 컴포넌트 마운트 시 getUserStorage를 호출하여 사용자 이름 가져오기
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
      <Logo />

      <MypageContainer>
        <UserArea>
          <UserName>{userName} 어린이</UserName>
          <UserButton src="\Image\button\nameBackground.png" />

          <LogoutButton
            src="\Image\button\logoutButton.png"
            onClick={handleLogout} // 로그아웃 버튼 클릭 이벤트 핸들러 추가
          />
        </UserArea>
        <LogoArea />
        <MypageContentContainer>
          <LogoutArea>
            <MypageExplain />
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
