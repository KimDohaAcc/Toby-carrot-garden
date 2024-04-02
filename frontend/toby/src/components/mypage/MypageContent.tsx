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
  overflow: hidden;
  object-fit: contain;
`;

const Area = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  width: 85%;
  height: 90%;
  border: 2px solid black;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  object-fit: contain;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  position: relative;
  flex: 0 0 10%;
  overflow: hidden;
  object-fit: contain;
`;

const ImageArea = styled.img`
  position: absolute;
  left: 10px;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const Text = styled.div`
  position: absolute;
  left: 15%;
  flex: 1;
  font-size: clamp(27px, 2vw, 43px);
`;

const MypageContent = () => {
  return (
    <MypageContentContainer>
      <Area>
        <TitleArea>
          <ImageArea src="/Image/album/앨범.png" alt="앨범" />
          <Text>앨범</Text>
        </TitleArea>
        <Album />
      </Area>
      <Area>
        <TitleArea>
          <ImageArea src="/Image/album/당근밭.png" alt="carrot" />
          <Text>당근밭</Text>
        </TitleArea>

        <CarrotField />
      </Area>
    </MypageContentContainer>
  );
};

export default MypageContent;
