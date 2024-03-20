import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getCarrotList } from "../../apis/mypageApi";
import { set } from "date-fns";

// getCarrotList 함수 대신 사용할 더미 데이터
const dummyCarrotList = [
  {
    placeId: 1,
    carrotCount: 3,
    gradeMax: 20,
    carrotGrade: 1,
  },
  {
    placeId: 2,
    carrotCount: 23,
    gradeMax: 60,
    carrotGrade: 2,
  },
  {
    placeId: 3,
    carrotCount: 33,
    gradeMax: 60,
    carrotGrade: 7,
  },
  {
    placeId: 4,
    carrotCount: 31,
    gradeMax: 60,
    carrotGrade: 4,
  },
];

const NoCarrot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GotoStory = styled.button`
  background-color: #f5f5f5d9;
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
  background-color: #f5f5f5d9;
  display: grid;
  grid-template-areas:
    ". . . . ."
    ". school . hospital ."
    ". . . . ."
    ". mart . police ."
    ". . . . .";
`;

const ScholCarrot = styled.div`
  grid-area: school;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HospitalCarrot = styled.div`
  grid-area: hospital;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MartCarrot = styled.div`
  grid-area: mart;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PoliceCarrot = styled.div`
  grid-area: police;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ShovelImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CarrotToby = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
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
  switch (carrotGrade) {
    case 1:
      ImageURL = "seed";
      break;
    case 2:
      ImageURL = "seedling";
      break;
    case 3:
      ImageURL = "baby";
      break;
    case 4:
      ImageURL = "adult";
      break;
    case 5:
      ImageURL = "schoolmaster";
      break;
    case 6:
      ImageURL = "hospitalmaster";
      break;
    case 7:
      ImageURL = "martmaster";
      break;
    case 8:
      ImageURL = "policemaster";
      break;
  }
  return <img src={ImageURL} alt={ImageURL} />;
};

const CarrotField = () => {
  const [carrotList, setCarrotList] = useState<CarrotList[]>(dummyCarrotList);

  // useEffect(() => {
  //   //당근 정보 가져옴
  //   const fetchData = async () => {
  //     try {
  //       const response = await getCarrotList();
  //       setCarrotList(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {!carrotList ? (
        <NoCarrotArea>
          <NoCarrot>
            <h1>
              아직
              <br />
              당근이 자라고 있어요!
            </h1>
          </NoCarrot>
          <GotoStory>당근 모으러 가기</GotoStory>
          <CarrotToby src="ads" alt="caarrottoby" />
        </NoCarrotArea>
      ) : (
        <CarrotFieldContent>
          <ScholCarrot>
            <CarrotGradeImage carrotGrade={carrotList[0].carrotGrade} />
            <img src="abc" alt="school" />
            <span>
              {carrotList[0].carrotCount} / {carrotList[0].gradeMax}
            </span>
          </ScholCarrot>
          <HospitalCarrot>
            병원 당근
            <CarrotGradeImage carrotGrade={carrotList[1].carrotGrade} />
            <img src="abc" alt="hospital" />
            <span>
              {carrotList[1].carrotCount} / {carrotList[1].gradeMax}
            </span>
          </HospitalCarrot>
          <MartCarrot>
            상점 당근
            <CarrotGradeImage carrotGrade={carrotList[2].carrotGrade} />
            <img src="abc" alt="mart" />
            <span>
              {carrotList[2].carrotCount} / {carrotList[2].gradeMax}
            </span>
          </MartCarrot>
          <PoliceCarrot>
            경찰서 당근
            <CarrotGradeImage carrotGrade={carrotList[3].carrotGrade} />
            <img src="abc" alt="police" />
            <span>
              {carrotList[3].carrotCount} / {carrotList[3].gradeMax}
            </span>
          </PoliceCarrot>
          <ShovelImage src="ads" alt="shovel" />
        </CarrotFieldContent>
      )}
    </>
  );
};

export default CarrotField;
