import api from "../config/apiConfig";

// 클라이언트에서 사진과 퀴즈 아이디 전달
// s3에 사진을 저장
// 퀴즈 아이디로 정답과 타입 조회
// pub/{퀴즈타입}으로 메시지 발신

// {
//   “analysisImage” : “multipartFile”,
//   “quizId” : 13
// }
// /quiz/submit

export const submitQuiz = async ({ analysisImage, quizId }) => {
  try {
    const formData = new FormData();
    formData.append("analysisImage", analysisImage);

    const response = await api.post(`quiz/submit?quizId=${quizId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
