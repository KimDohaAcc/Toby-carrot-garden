import React from "react";
import styled from "styled-components";

const CarrotFieldArea = styled.div`
  background-color: #f5f5f5d9;
  border-radius: 30px;
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
//               “gradeMax” : “60”,
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

const CarrotField = () => {
  return (
    <CarrotFieldArea>
      <div>당근 밭</div>
    </CarrotFieldArea>
  );
};

export default CarrotField;
