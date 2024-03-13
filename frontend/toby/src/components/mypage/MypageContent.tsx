import React from "react";
import styled from "styled-components";

import Album from "./Album";
import CarrotField from "./CarrotField";

const MypageContentContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 90%;
  height: 90%;
  border: 2px solid black;
  grid-template-columns: 1fr 1fr;
`;

const AlbumArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  width: 85%;
  height: 90%;
  border: 2px solid black;
`;

const CarrotArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  width: 85%;
  height: 90%;
  border: 2px solid black;
`;

const MypageContent = () => {
  return (
    <MypageContentContainer>
      <AlbumArea>
        <div>앨범</div>
        <Album />
      </AlbumArea>
      <CarrotArea>
        <div>당근 밭</div>
        <CarrotField />
      </CarrotArea>
    </MypageContentContainer>
  );
};

export default MypageContent;
