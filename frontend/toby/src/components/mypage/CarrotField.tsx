import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getCarrotList } from "../../apis/mypageApi";

// getCarrotList 함수 대신 사용할 더미 데이터
// const dummyCarrotList = [
//   {
//     placeId: 1,
//     carrotCount: 3,
//     gradeMax: 20,
//     carrotGrade: 1,
//   },
//   {
//     placeId: 2,
//     carrotCount: 23,
//     gradeMax: 60,
//     carrotGrade: 2,
//   },
//   {
//     placeId: 3,
//     carrotCount: 33,
//     gradeMax: 60,
//     carrotGrade: 7,
//   },
//   {
//     placeId: 4,
//     carrotCount: 31,
//     gradeMax: 60,
//     carrotGrade: 4,
//   },
// ];

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
  grid-template-rows: 4fr 1fr;
  background-color: #f5f5f5d9;
  border-radius: 30px;
  justify-items: center;
  align-items: center;
  position: relative;
  background-image: url("Image/album/당근밭배경.png");
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
  display: grid;
  grid-template-areas:
    ". . . . ."
    ". school . hospital ."
    ". . . . ."
    ". mart . police ."
    ". . . . .";
  border-radius: 30px;
  height: 90%;
`;



const SchoolCarrot = styled.div`
  grid-area: school;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 90%;
`;

const HospitalCarrot = styled.div`
  grid-area: hospital;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 90%;
`;

const MartCarrot = styled.div`
  grid-area: mart;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 90%;
`;

const PoliceCarrot = styled.div`
  grid-area: police;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 90%;
`;

const ShovelImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
`;

const CarrotToby = styled.img`
  position: absolute;
  height: 40%;
  bottom: 0;
  right: 0;
`;

const CarrotCount = styled.span`
  color: white;
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
      ImageURL = "martmasterurl";
      ImageAlt = "martmaster";
      break;
    case 8:
      ImageURL = "policemasterurl";
      ImageAlt = "policemaster";
      break;
  }
  return <img src={ImageURL} alt={ImageAlt} width="80%" height="80%"/>;
};

const CarrotField = () => {
  const [carrotList, setCarrotList] = useState<CarrotList[]>([]);

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
      {carrotList.length == 0 ||
      (carrotList[0].carrotCount == 0 &&
        carrotList[1].carrotCount == 0 &&
        carrotList[2].carrotCount == 0 &&
        carrotList[3].carrotCount == 0) ? (
        <NoCarrotArea>
          <NoCarrot>
            <h1>
              아직
              <br />
              당근이 자라고 있어요!
            </h1>
          </NoCarrot>
          <GotoStory>당근 모으러 가기 -▷</GotoStory>
          <CarrotToby src="Image/album/토비1.png" alt="caarrottoby" />
        </NoCarrotArea>
      ) : (
        <CarrotFieldContent>
          <SchoolCarrot>
            학교당근
            <CarrotGradeImage carrotGrade={carrotList[0].carrotGrade} />
            <img src="Image/signpost/school.png" alt="school"  width="30%"/>
            <CarrotCount>
              {carrotList[0].carrotCount} / {carrotList[0].gradeMax}
            </CarrotCount>
          </SchoolCarrot>
          <HospitalCarrot>
            병원 당근
            <CarrotGradeImage carrotGrade={carrotList[1].carrotGrade} />
            <img src="Image/signpost/hospital.png" alt="hospital"  width="30%"/>
            <CarrotCount>
              {carrotList[1].carrotCount} / {carrotList[1].gradeMax}
            </CarrotCount>
          </HospitalCarrot>
          <MartCarrot>
            상점 당근
            <CarrotGradeImage carrotGrade={carrotList[2].carrotGrade} />
            <img src="Image/signpost/mart.png" alt="mart"  width="30%"/>
            <CarrotCount>
              {carrotList[2].carrotCount} / {carrotList[2].gradeMax}
            </CarrotCount>
          </MartCarrot>
          <PoliceCarrot>
            경찰서 당근
            <CarrotGradeImage carrotGrade={carrotList[3].carrotGrade} />
            <img src="Image/signpost/police.png" alt="police"  width="30%"/>
            <CarrotCount>
              {carrotList[3].carrotCount} / {carrotList[3].gradeMax}
            </CarrotCount>
          </PoliceCarrot>
          <ShovelImage src="Image/common/shovel.png" alt="shovel"/>
        </CarrotFieldContent>
      )}
    </>
  );
};

export default CarrotField;
