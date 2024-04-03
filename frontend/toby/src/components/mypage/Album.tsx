import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  border: 14px solid #f7cb96;
  box-sizing: border-box;
  border-radius: 5%;
  background-color: white;
`;

const AlbumArea = styled.div`
  display: grid;
  grid-template-rows: 5fr 2fr;
  background-size: cover;
  border-radius: 30px;
  background-repeat: no-repeat;
  justify-items: center;
  align-items: center;
  align-self: center;
  overflow: hidden;
  object-fit: contain;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: contain;
  background-image: url(${(props) => props.bgImage});
`;

const ImageArea = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  object-fit: contain;
  flex: 0 0 10%;
`;

const NoImageArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; /* 기존 grid에서 flex로 변경 */
  /* flex-direction: column; 내용을 세로로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  background-color: #f5f5f5d9;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  object-fit: contain;
  height: 100%;
  width: 100%; /* 너비를 100%로 설정하여 부모 컨테이너를 꽉 채움 */
`;

const GotoMainTextAndTobyContainer = styled.div`
  display: flex; /* 수평 정렬을 위해 flex 사용 */
  flex-direction: column; /* 내용을 세로로 정렬 */
  align-items: center; /* 가로 방향 중앙 정렬 */
  justify-content: space-around; /* 요소 사이에 공간을 균등하게 분배 */
  width: 100%;
  position: absolute; /* 위치 조정을 위해 absolute 사용 */
  bottom: 10%; /* 하단에 위치 */
`;
const MiddleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  overflow: hidden;
  object-fit: contain;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
`;

const AlbumToby = styled.img`
  width: 25%; // Adjust size as needed
  margin-left: 3%; // Space between text and image
  right: 60%;
  overflow: hidden;
  object-fit: contain;
`;
const NoImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 23px;
`;

// const GotoStory = styled.button`
//   border: none;
//   width: 100%;
//   height: 250%;
//   border-radius: 30px;
//   position: relative;
//   cursor: pointer;
// `;

const BtnArea = styled.div`
  height: 100%;
  width: 100%;
  top: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  object-fit: contain;
  position: relative;
  flex: 0 0 40%;
`;

const PrevBtn = styled.img`
  width: 11%;
  height: auto;
  cursor: url("Image/cursor/hover.png"), pointer;
  position: absolute;
  left: calc(25%);
  overflow: hidden;
  object-fit: contain;
  flex: 1;
`;

const OrderArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(30px, 2vw, 43px);
  flex: 1;
  position: absolute;
  left: calc(44%);
  overflow: hidden;
  object-fit: contain;
  flex: 1;
`;

const NextBtn = styled.img`
  width: 11%;
  height: auto;
  cursor: url("Image/cursor/hover.png"), pointer;
  position: absolute;
  left: calc(63%);
  flex: 1;
`;
const StyledImage = styled.img`
  width: 70%; // 이미지의 너비를 설정
  height: 70%; // 이미지의 높이를 설정
  object-fit: contain; // 컨테이너 내에서 이미지 비율을 유지
  margin: auto; // 이미지를 중앙에 위치시킵니다 (가로 정렬에 유용)
  display: block; // 이미지를 블록 요소로 만들어 중앙 정렬이 가능하게 합니다
  align-self: center; // Flexbox 컨테이너 내에서 자신을 세로 방향으로 중앙에 위치시킵니다
  top: 35%;
  position: absolute;
  /* border: 2px solid red; */
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center; // 이미지를 가로 방향으로 중앙에 위치시킵니다.
  align-items: center; // 이미지를 세로 방향으로 중앙에 위치시킵니다.
  width: 100%; // 이미지 컨테이너의 너비를 조정합니다.
  height: 100%; // 이미지 컨테이너의 높이를 조정합니다.
  overflow: hidden; // 이미지가 컨테이너를 벗어날 경우 숨깁니다.
  object-fit: contain; // 이미지 비율을 유지하면서 컨테이너에 맞춥니다.
  position: relative;
`;
// const AlbumToby = styled.img`
//   position: absolute;
//   height: 400%;
//   left: 74%;
//   top: -200%;
// `;
const GotoMainText = styled.div`
  cursor: pointer;
  color: #000;
  font-size: 40px;
  margin-bottom: 20px;
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
  const navigate = useNavigate();
  const [presentImage, setPresentImage] = useState("");
  const [imageList, setImageList] = useState<Image[]>([]);
  const [presentImageIndex, setPresentImageIndex] = useState(1);
  const [presentImagePlaceId, setPresentImagePlaceId] = useState(0);
  // const showPrevImage = () => {
  //   setNextImage(presentImage);
  //   setPresentImage(prevImage);
  //   setPrevImage("");
  // };
  const backgroundImages = {
    1: "/Image/album/hospitalFrame.png",
    2: "/Image/album/schoolFrame.png",
  };
  useEffect(() => {
    // 현재 이미지의 placeId를 설정하는 로직 추가...
    const currentImage = imageList.find(
      (image) => image.clearImageUrl === presentImage
    );
    setPresentImagePlaceId(currentImage?.placeId || 0);
  }, [presentImage, imageList]);
  // const showNextImage = () => {
  //   setPrevImage(presentImage);
  //   setPresentImage(nextImage);
  //   setNextImage("");
  // };
  const handleGoToMain = () => {
    navigate("/main"); // '/main'으로 이동하는 함수
  };
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
  const getBackgroundImageUrl = (placeId) => {
    switch (placeId) {
      case 1:
        return "/Image/album/schoolFrame.png";
      case 2:
        return "/Image/album/hospitalFrame.png";
      case 3:
        return "/Image/album/martFrame.png";
      case 4:
        return "/Image/album/policeFrame.png";
      default:
        return ""; // Default background image or empty string
    }
  };
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
          <div> {/* Empty top container for spacing */} </div>
          <MiddleTextContainer>
            <h1>
              토비와 함께
              <br />
              사진 찍으러 가볼까요?
            </h1>
          </MiddleTextContainer>
          <BottomContainer>
            <GotoMainText onClick={handleGoToMain}>
              당근 모으러 가기 -▷
            </GotoMainText>
            <AlbumToby
              src="/Image/album/토비3.png"
              alt="albumtoby"
              onClick={handleGoToMain}
            />
          </BottomContainer>
        </NoImageArea>
      ) : (
        <AlbumArea
          style={{
            backgroundImage: `url(${getBackgroundImageUrl(
              imageList[presentImageIndex]?.placeId
            )})`,
          }}
        >
          <ImageArea>
            <ImageWrapper>
              <StyledImage src={presentImage} alt="image description" />
            </ImageWrapper>
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
