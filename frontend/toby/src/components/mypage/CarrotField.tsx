import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getCarrot } from "../../apis/mypageApi";

const NoCarrot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
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

const CarrotFieldArea = styled.div`
  background-color: #f5f5f5d9;
  border-radius: 30px;
  display: grid;
  grid-template-rows: 4fr 1fr;
  justify-items: center;
  align-items: center;
`;

const CarrotFieldContent = styled.div`
  display: grid;
  grid-template-areas:
    "school hospital"
    "mart police";
`;

const ScholCarrot = styled.div`
  grid-area: school;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const HospitalCarrot = styled.div`
  grid-area: hospital;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MartCarrot = styled.div`
  grid-area: mart;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PoliceCarrot = styled.div`
  grid-area: police;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//데이터 형식 예시
// {
//   “status” : 200,
//   “message” : “당근밭 정보 목록”,
//   “result” : {
//       list: [
//           {
//               “placeId” :  1,
//               “carrotCount” : “3”,
//               “gradeMax” : “20”,
//               “carrotGrade” :  “seed”
//           },
//           {
//               “placeId” :  2,
//               “carrotCount” : “23”,
//               “gradeMax” : “60”,
//               “carrotGrade” :  “baby”
//           },
//           {
//               “placeId” :  3,
//               “carrotCount” : “33”,
//               “gradeMax” : “60”,
//               “carrotGrade” :  “master”
//           },
//           {
//               “placeId” :  4,
//               “carrotCount” : “31”,
//               “gradeMax” : “60”,
//               “carrotGrade” :  “adult”
//           },        ]
//   }
// }

//<Grade> 1- 씨앗 2- 새싹 3- 아기 당근 4- 어른 당근 5- 특화 당근
//<PlaceId> 1- 학교 2- 병원 3- 상점 4- 경찰서

// Header
// {
//   “Content-Type”: “application/json”
// }

interface Carrot {
  placeId: number;
  carrotCount: number;
  gradeMax: number;
  carrotGrade: string;
}

const CarrotField = () => {
  const [carrot, setCarrot] = useState<Carrot | null>(null);

  useEffect(() => {
    //당근 정보 가져옴
    const fetchData = async () => {
      try {
        const response = await getCarrot();
        setCarrot(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!carrot ? (
        <CarrotFieldArea>
          <NoCarrot>
            <h1>
              아직
              <br />
              당근이 자라고 있어요!
            </h1>
          </NoCarrot>
          <GotoStory>
            당근 모으러 가기
            <img
              src="ads"
              alt="caarrottoby"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </GotoStory>
        </CarrotFieldArea>
      ) : (
        <CarrotFieldContent>
          <ScholCarrot>학교 당근</ScholCarrot>
          <HospitalCarrot>병원 당근</HospitalCarrot>
          <MartCarrot>상점 당근</MartCarrot>
          <PoliceCarrot>경찰서 당근</PoliceCarrot>
        </CarrotFieldContent>
      )}
    </>
  );
};

export default CarrotField;
