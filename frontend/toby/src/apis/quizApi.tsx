import { api } from "../config/apiConfig";

import { tempToken } from "../config/apiConfig";

// 클라이언트에서 사진과 퀴즈 아이디 전달
// s3에 사진을 저장
// 퀴즈 아이디로 정답과 타입 조회
// pub/{퀴즈타입}으로 메시지 발신

// {
//   “analysisImage” : “multipartFile”,
//   “quizId” : 13
// }
// /quiz/submit

// export const submitQuiz = async (formData) => {
//   try {
//     const response = await api.post("/quiz/submit", formData, {
//       headers: {
//         Authorization: `Bearer ${tempToken}`,
//         // "Content-Type": undefined, // 이 줄을 추가하여 axios가 Content-Type을 자동으로 설정하도록 합니다.
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("퀴즈 제출을 실패했습니다.", error);
//   }
// };
export const submitQuiz = async (formData) => {
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
  return new Promise((resolve, reject) => {
    api
      .request({
        method: "post",
        url: `/quiz/submit`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${tempToken}`,
        },
      })
      .then((res) => {
        resolve(res);
        console.log("업로드 완료");
      })
      .catch((err) => {
        reject(err);
        console.log(err);
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
      });
  });
};

export const submitQuiz2 = async (formData) => {
  console.log("여기까지 옴");
  console.log(localStorage.getItem("accessToken"));
  try {
    // const response = await api.post("quiz/submit", formData);
    const response = await api.post("quiz/submit", formData, {
      // headers: {
      //   Authorization: `Bearer ${tempToken}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("퀴즈 제출을 실패했습니다.", error);
  }
};

//아이가 풀었던 퀴즈 정답
export const getQuizAnswer = async ({ memberQuizId }) => {
  console.log("여기가ㅓ지 옴");
  console.log(memberQuizId);
  console.log(`quiz/${memberQuizId}/result`);

  try {
    // `headers`를 포함하는 옵션 객체를 `get` 메소드의 두 번째 인자로 전달합니다.
    // const response = await api.get(`quiz/${quizId}/result`, {
    const response = await api.get(`quiz/${memberQuizId}/result`, {
      // headers: {
      //   Authorization: `Bearer ${tempToken}`, // `tempToken`은 유효한 토큰 문자열이어야 합니다.
      // },
    });
    console.log(memberQuizId);
    // const response = await api.get(`quiz/${quizId}/result`);
    return response.data;
  } catch (error) {
    console.error("당근토끼를 갖고오지 못했습니다.", error);
    return null; // 에러 발생 시 명시적으로 null 반환을 고려할 수 있습니다.
  }
};

//119문제 당근 부여
export const getEmergencyQuiz = async ({ place_id }) => {
  try {
    const response = await api.patch(`place/${place_id}/carrot`, {
      // headers: {
      //   Authorization: `Bearer ${tempToken}`,
      // },
    });
    return response.data;
  } catch (error) {
    console.error("119문제를 가져오지 못했습니다.", error);
    return null;
  }
};
