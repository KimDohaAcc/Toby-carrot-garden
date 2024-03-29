import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getClearImageList } from "../../apis/mypageApi";

// getClearImageList 대신에 더미 데이터를 사용합니다.
// const dummyImageList = [
//   {
//     clearImageId: 1,
//     clearImageUrl: "https://dummyimage.com/600x400/000/fff",
//     placeId: 1,
//     createdTime: "2024-03-25T17:06:08",
//   },
//   {
//     clearImageId: 2,
//     clearImageUrl: "https://dummyimage.com/600x400/000/fc9",
//     placeId: 2,
//     createdTime: "2024-03-25T17:06:44",
//   },
//   {
//     clearImageId: 3,
//     clearImageUrl: "https://dummyimage.com/600x400/000/fz8",
//     placeId: 3,
//     createdTime: "234234T3424",
//   },
//   {
//     clearImageId: 4,
//     clearImageUrl: "https://dummyimage.com/600x400/000/b58",
//     placeId: 4,
//     createdTime: "234234T3424",
//   },
//   {
//     clearImageId: 5,
//     clearImageUrl: "https://dummyimage.com/600x400/000/f0f",
//     placeId: 5,
//     createdTime: "234234T3424",
//   },
// ];

const AlbumContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AlbumArea = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr;
  background-color: #f5f5f5d9;
  background-size: cover;
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

const NoImageArea = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr;
  background-color: #f5f5f5d9;
  border-radius: 30px;
  justify-items: center;
  align-items: center;
  position: relative;
`;

const NoImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GotoStory = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
`;

const BtnArea = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PrevBtn = styled.img`
  width: 20%;
  height: auto;
  cursor: pointer;
`;

const OrderArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  flex: 1;
`;

const NextBtn = styled.img`
  width: 20%;
  height: auto;
  cursor: pointer;
`;

const AlbumToby = styled.img`
  position: absolute;
  height: 40%;
  bottom: 0;
  right: 0;
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
  const [presentImage, setPresentImage] = useState("");
  const [imageList, setImageList] = useState<Image[]>([]);
  const [presentImageIndex, setPresentImageIndex] = useState(1);

  // const showPrevImage = () => {
  //   setNextImage(presentImage);
  //   setPresentImage(prevImage);
  //   setPrevImage("");
  // };

  // const showNextImage = () => {
  //   setPrevImage(presentImage);
  //   setPresentImage(nextImage);
  //   setNextImage("");
  // };

  useEffect(() => {
    // 이미지 리스트를 불러옴
    const fetchData = async () => {
      try {
        const response = await getClearImageList();
        setImageList(response);
        if (response) {
          setPresentImage(response[0].clearImageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   // 이미지 리스트를 더미 데이터로 설정
  //   setImageList(dummyImageList);
  //   // presentImage를 초기 이미지로 설정
  //   if (dummyImageList.length > 0) {
  //     setPresentImage(dummyImageList[0].clearImageUrl);
  //   }
  // }, []);

  //findIndex -> 배열에서 조건을 만족하는 첫 번째 요소의 인덱스를 반환

  const showPrevImage = () => {
    // 이미지 리스트의 첫 번째 이미지일 경우에는 마지막 이미지를 표시
    const index = imageList.findIndex(
      (image) => image.clearImageUrl === presentImage
    );
    if (index === 0) {
      setPresentImage(imageList[imageList.length - 1].clearImageUrl);
      setPresentImageIndex(imageList.length);
    } else {
      setPresentImage(imageList[index - 1].clearImageUrl);
      setPresentImageIndex(index);
    }
    console.log(index);
  };

  const showNextImage = () => {
    // 이미지 리스트의 마지막 이미지일 경우에는 첫 번째 이미지를 표시
    const index = imageList.findIndex(
      (image) => image.clearImageUrl === presentImage
    );
    if (index === imageList.length - 1) {
      setPresentImage(imageList[0].clearImageUrl);
      setPresentImageIndex(1);
    } else {
      setPresentImage(imageList[index + 1].clearImageUrl);
      setPresentImageIndex(index + 2);
    }
    console.log(index);
  };

  return (
    <AlbumContainer>
      {/** 이미지 없을 때 보여줄 화면 */}
      {!imageList ? (
        <NoImageArea>
          <NoImage>
            <h1>
              토비와 함께
              <br />
              사진 찍으러 가볼까요?
            </h1>
          </NoImage>
          <GotoStory>당근 모으러 가기</GotoStory>
          <AlbumToby src="/Image/album/토비3.png" alt="albumtoby" />
        </NoImageArea>
      ) : (
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
              src="Image/album/leftarrow.png"
              alt="prev"
              onClick={() => {
                showPrevImage();
              }}
            ></PrevBtn>
            <OrderArea>
              {presentImageIndex} | {imageList.length}
            </OrderArea>
            <NextBtn
              src="Image/album/rightarrow.png"
              alt="next"
              onClick={showNextImage}
            ></NextBtn>
          </BtnArea>
        </AlbumArea>
      )}
    </AlbumContainer>
  );
};

export default Album;
