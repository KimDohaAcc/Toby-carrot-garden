import React from "react";
import styled from "styled-components";

const MypageContentContainer = styled.div`
  display: grid;
  width: 90%;
  height: 90%;
  border: 2px solid black;
  grid-template-columns: 1fr 1fr;
`;

const AlbumArea = styled.div`
  border: 2px solid black;
`;

const CarrotArea = styled.div`
  border: 2px solid black;
`;

const MypageContent = () => {
  return (
    <MypageContentContainer>
      <AlbumArea>앨범</AlbumArea>
      <CarrotArea>당근</CarrotArea>
    </MypageContentContainer>
  );
};

export default MypageContent;
