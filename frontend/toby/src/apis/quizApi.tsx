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

export const submitQuiz = async ({ formData }) => {
  try {
    const response = await api.post("quiz/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization: `Bearer ${tempToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("퀴즈 제출을 실패했습니다.", error);
  }
};

export const submitQuiz2 = async (formData) => {
  console.log("여기까지 옴");
  console.log(localStorage.getItem("accessToken"));
  try {
    const response = await api.post("quiz/submit", formData);
    return response.data;
  } catch (error) {
    console.error("퀴즈 제출을 실패했습니다.", error);
  }
};

//아이가 풀었던 퀴즈 정답
export const getQuizAnswer = async ({ quizId }) => {
  try {
    const response = await api.get(`quiz/${quizId}/result`);
    return response.data;
  } catch (error) {
    console.error("웨이팅토끼를 갖고오지 못했습니다.", error);
  }
};
