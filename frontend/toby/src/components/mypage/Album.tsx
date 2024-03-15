import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getClearImageList } from "../../apis/mypageApi";

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

// 데이터 형식 예시
// {
//   “status” : 200,
//   “message” : “사진 목록을 보냈습니다”,
//    “result” :
//     {
//       “list” :
//           [
//               {
//                  “clearImageId” : 1,
//                   “clearImageUrl” : ”s3 url”,
//                   “placeId” : 1,
//                   “createdTime” : “234234T3424”
//               } ,
//               {
//                   “clearImageId” : 3,
//                   “clearImageUrl” : ”s3 url”,
//                   “placeId” : 2,
//                   “createdTime” : “234234T3424”
//               }
//           ]
//      }
// }
// Header
//{
//   “Content-Type”: “application/json”
// }

interface Image {
  clearImageId: number;
  clearImageUrl: string;
  placeId: number;
  createdTime: string;
}

const Album = () => {
  const [prevImage, setPrevImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [presentImage, setPresentImage] = useState("");
  const [imageList, setImageList] = useState<Image[]>([]);

  const showPrevImage = () => {
    setNextImage(presentImage);
    setPresentImage(prevImage);
    setPrevImage("");
  };

  const showNextImage = () => {
    setPrevImage(presentImage);
    setPresentImage(nextImage);
    setNextImage("");
  };

  useEffect(() => {
    // 이미지 리스트를 불러옴
    const fetchData = async () => {
      try {
        const response = await getClearImageList();
        setImageList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AlbumArea>
      <ImageArea>
        {/** 이미지 없을 때 보여줄 화면 */}
        {imageList.length === 0 ? (
          <div>토비와 함께 사진 찍으러 가볼까요?</div>
        ) : (
          imageList.map((image) => {
            //이미지 리스트를 불러옴
            return (
              <img
                key={image.clearImageId}
                src={image.clearImageUrl}
                alt="image"
                style={{ width: "100%", height: "100%" }}
              />
            );
          })
        )}
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
