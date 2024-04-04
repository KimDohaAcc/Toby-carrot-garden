import React, { useEffect } from "react";
import styled from "styled-components";

import Logo2 from "../components/Logo2";
import MypageContent from "../components/mypage/MypageContent";
import LogoutBtn from "../components/LogoutBtn";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLocation } from "react-router-dom";

import { setIsPlaceClear } from "../store/slices/placeSlice";

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
  padding: 1%;
  box-sizing: border-box;
`;
const Text1 = styled.h1`
  line-height: 60%;
  font-size: clamp(50px, 2vw, 70px);
`;

const Mypage = () => {
  const dispatch = useDispatch();

  const isPlaceClear = useSelector<RootState, boolean>(
    (state: RootState) => state.place.isplaceClear
  );
  const location = useLocation();

  useEffect(() => {
    if (isPlaceClear) {
      const { placeName } = location.state;
      console.log(placeName);
      dispatch(setIsPlaceClear(false));
    }
  }, [location.state, isPlaceClear, dispatch]);

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
