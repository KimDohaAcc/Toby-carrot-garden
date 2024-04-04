import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getCarrotList } from "../../apis/mypageApi";
import { useNavigate } from "react-router-dom";

const NoCarrot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  color: white;
`;

const GotoStory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: white;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
`;

const NoCarrotArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: #f5f5f5d9;
  border-radius: 30px;
  justify-items: center;
  align-items: center;
  /* position: relative; */
  width: 100%;
  background-image: url("Image/album/당근밭배경.png");
  height: 100%;
  width: auto;
  overflow: hidden;
  object-fit: contain;
`;
const NoImageArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; /* 기존 grid에서 flex로 변경 */
  /* flex-direction: column; 내용을 세로로 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  background-image: url("Image/album/당근밭배경.png");
  border-radius: 30px;
  border: 14px solid #f7cb96;
  position: relative;
  overflow: hidden;
  object-fit: contain;
  height: 100%;
  width: 100%; /* 너비를 100%로 설정하여 부모 컨테이너를 꽉 채움 */
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
const CarrotToby = styled.img`
  width: 25%; // Adjust size as needed
  margin-left: 3%; // Space between text and image
  right: 60%;
`;
const GotoMainText = styled.div`
  cursor: pointer;
  color: #000;
  font-size: 40px;
  margin-bottom: 20px;
`;
// const CarrotFieldArea = styled.div`
//   background-color: #f5f5f5d9;
//   border-radius: 30px;
//   display: grid;
//   grid-template-rows: 4fr 1fr;
//   justify-items: center;
//   align-items: center;
// `;

const CarrotFieldContent = styled.div`
  position: relative;
  background-image: url("Image/album/당근밭배경.png");
  background-size: cover;
  border: 14px solid #f7cb96;
  box-sizing: border-box;
  border-radius: 5%;
  display: grid;
  grid-template-areas:
    ". . . . ."
    ". school . hospital ."
    ". mart . police ."
    ". . . . .";
  height: 100%;
  overflow: hidden;
  object-fit: contain;
  /* flex: 0 0 90%; */
`;

const SchoolCarrot = styled.div`
  grid-area: school;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 110%;
  overflow: hidden;
  object-fit: contain;
`;

const HospitalCarrot = styled.div`
  grid-area: hospital;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 110%;
  overflow: hidden;
  object-fit: contain;
`;
const AlbumToby = styled.img`
  width: 22%; // Adjust size as needed
  margin-left: 3%; // Space between text and image
  right: 60%;
  overflow: hidden;
  object-fit: contain;
`;
const MartCarrot = styled.div`
  grid-area: mart;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 110%;
  overflow: hidden;
  object-fit: contain;
`;

const PoliceCarrot = styled.div`
  grid-area: police;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 110%;
  overflow: hidden;
  object-fit: contain;
`;

const ShovelImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  overflow: hidden;
  object-fit: contain;
`;

// const CarrotToby = styled.img`
//   position: absolute;
//   height: 40%;
//   bottom: 0;
//   right: 0;
// `;

const CarrotCount = styled.div`
  color: white;
  font-size: 30px;
  /* overflow: hidden;
  object-fit: contain; */
  /* font-size: clamp(40px, 2vw, 20px); */
  font-size: calc(250%);
  flex: 0 0 15%;
  top: -12%;
  position: relative;
  height: 100%;
`;

const CarrotSign = styled.img`
  position: relative;
  width: 30%;
  height: auto;
  overflow: hidden;
  object-fit: contain;
  flex: 0 0 20%;
  top: -9%;
`;

//데이터 형식 예시
// {
//   “status” : 200,
//   “message” : “당근밭 정보 목록”,
//   “result” : {
//       list: [
//           {
//               “placeId” :  1,
//               “carrotCount” : 3,
//               “gradeMax” : 20,
//               “carrotGrade” :  1
//           },
//           {
//               “placeId” :  2,
//               “carrotCount” : 23,
//               “gradeMax” : 60,
//               “carrotGrade” :  2
//           },
//           {
//               “placeId” :  3,
//               “carrotCount” : 33,
//               “gradeMax” : 60,
//               “carrotGrade” : 7
//           },
//           {
//               “placeId” :  4,
//               “carrotCount” : 31,
//               “gradeMax” : 60,
//               “carrotGrade” :  4
//           },
//       ]
//   }
// }

//<Grade> 1- 씨앗 2- 새싹 3- 아기 당근 4- 어른 당근 5- 특화 당근
//<PlaceId> 1- 학교 2- 병원 3- 상점 4- 경찰서

// Header
// {
//   “Content-Type”: “application/json”
// }

interface CarrotList {
  placeId: number;
  carrotCount: number;
  gradeMax: number;
  carrotGrade: number;
}

const CarrotGradeImage = ({ carrotGrade }) => {
  let ImageURL: string = "";
  let ImageAlt: string = "carrot";

  switch (carrotGrade) {
    case 1:
      ImageURL = "Image/carrot/씨앗.png";
      ImageAlt = "seed";
      break;
    case 2:
      ImageURL = "Image/carrot/새싹.png";
      ImageAlt = "seedling";
      break;
    case 3:
      ImageURL = "Image/carrot/아기당근.png";
      ImageAlt = "baby";
      break;
    case 4:
      ImageURL = "Image/carrot/어른당근.png";
      ImageAlt = "adult";
      break;
    case 5:
      ImageURL = "Image/carrot/학생당근.png";
      ImageAlt = "schoolmaster";
      break;
    case 6:
      ImageURL = "Image/carrot/의사당근.png";
      ImageAlt = "hospitalmaster";
      break;
    case 7:
      ImageURL = "Image/carrot/마트마스터당근.png";
      ImageAlt = "martmaster";
      break;
    case 8:
      ImageURL = "Image/carrot/경찰마스터당근.png";
      ImageAlt = "policemaster";
      break;
  }
  return <img src={ImageURL} alt={ImageAlt} width="70%" height="55%" />;
};

const CarrotField = () => {
  const navigate = useNavigate();
  const [carrotList, setCarrotList] = useState<CarrotList[]>([]);
  const handleGoToMain = () => {
    navigate("/main"); // '/main'으로 이동하는 함수
  };

  useEffect(() => {
    //당근 정보 가져옴
    const fetchData = async () => {
      try {
        const response = await getCarrotList();
        setCarrotList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {carrotList.length === 0 ||
      (carrotList[0].carrotCount == 0 &&
        carrotList[1].carrotCount == 0 &&
        carrotList[2].carrotCount == 0 &&
        carrotList[3].carrotCount == 0) ? (
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
              src="/Image/album/토비1.png"
              alt="albumtoby"
              onClick={handleGoToMain}
            />
          </BottomContainer>
        </NoImageArea>
      ) : (
        <CarrotFieldContent>
          <SchoolCarrot>
            <CarrotGradeImage carrotGrade={carrotList[0].carrotGrade} />
            <CarrotSign src="Image/carrot/학교팻말.png" alt="school" />
            <CarrotCount>
              {carrotList[0].carrotCount > 70
                ? `${carrotList[0].carrotCount}`
                : `${carrotList[0].carrotCount} / ${carrotList[0].gradeMax}`}
            </CarrotCount>
          </SchoolCarrot>
          <HospitalCarrot>
            <CarrotGradeImage carrotGrade={carrotList[1].carrotGrade} />
            <CarrotSign src="Image/carrot/병원팻말.png" alt="hospital" />
            <CarrotCount>
              {carrotList[1].carrotCount > 70
                ? `${carrotList[1].carrotCount}`
                : `${carrotList[1].carrotCount} / ${carrotList[1].gradeMax}`}
            </CarrotCount>
          </HospitalCarrot>
          <MartCarrot>
            <CarrotGradeImage carrotGrade={carrotList[2].carrotGrade} />
            <CarrotSign src="Image/carrot/마트팻말.png" alt="mart" />
            <CarrotCount>
              {carrotList[2].carrotCount > 70
                ? `${carrotList[2].carrotCount}`
                : `${carrotList[2].carrotCount}/ ${carrotList[2].gradeMax}`}
            </CarrotCount>
          </MartCarrot>
          <PoliceCarrot>
            <CarrotGradeImage carrotGrade={carrotList[3].carrotGrade} />
            <CarrotSign src="Image/carrot/경찰서팻말.png" alt="police" />
            <CarrotCount>
              {carrotList[3].carrotCount > 70
                ? `${carrotList[3].carrotCount}`
                : `${carrotList[3].carrotCount} / ${carrotList[3].gradeMax}`}
            </CarrotCount>
          </PoliceCarrot>
          <ShovelImage src="Image/common/shovel.png" alt="shovel" />
        </CarrotFieldContent>
      )}
    </>
  );
};

export default CarrotField;
