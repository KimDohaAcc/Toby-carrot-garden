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
  background-color: #ffffff;
  border-radius: 40px;
`;

const AlbumArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  width: 85%;
  height: 90%;
  border: 2px solid black;
  border-radius: 30px;
`;

const CarrotArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  width: 85%;
  height: 90%;
  border: 2px solid black;
  border-radius: 30px;
`;

const MypageContent = () => {
  return (
    <MypageContentContainer>
      <AlbumArea>
        <div>
          <img src="abc" alt="album" />
          <span>앨범</span>
        </div>
        <Album />
      </AlbumArea>
      <CarrotArea>
        <div>
          <img src="abc" alt="carrot" />
          <span>당근 밭</span>
        </div>
        <CarrotField />
      </CarrotArea>
    </MypageContentContainer>
  );
};

export default MypageContent;
