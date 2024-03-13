import React, { useState } from "react";
import styled from "styled-components";

const AlbumArea = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr;
  background-color: #f5f5f5d9;
  border-radius: 30px;
  justify-items: center;
  align-items: center;
`;

const ImageArea = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnArea = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevBtn = styled.button`
  background-color: red;
`;

const OrderArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: #fefefe;
`;

const NextBtn = styled.button`
  background-color: blue;
`;

const Album = () => {
  const [prevImaage, setPrevImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [presentImage, setPresentImage] = useState("");

  const showPrevImage = () => {
    setNextImage(presentImage);
    setPresentImage(prevImaage);
    setPrevImage("");
  };

  const showNextImage = () => {
    setPrevImage(presentImage);
    setPresentImage(nextImage);
    setNextImage("");
  };

  return (
    <AlbumArea>
      <ImageArea>
        <img
          src={presentImage}
          alt="image"
          style={{ width: "100%", height: "100%" }}
        />
      </ImageArea>
      <BtnArea>
        <PrevBtn
          onClick={() => {
            showPrevImage;
          }}
        ></PrevBtn>
        <OrderArea>1/5</OrderArea>
        <NextBtn
          onClick={() => {
            showNextImage;
          }}
        ></NextBtn>
      </BtnArea>
    </AlbumArea>
  );
};

export default Album;
