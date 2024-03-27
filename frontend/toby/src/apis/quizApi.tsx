import { api } from "../config/apiConfig";

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

    // 멀티파트 폼 데이터의 Content-Type 설정
    const response1 = await api.post(`quiz/submit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // JSON 데이터의 Content-Type 설정
    const response2 = await api.post(
      `quiz/submit`,
      { quizId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return [response1.data, response2.data];
  } catch (error) {
    console.error(error);
  }
};

export const submitQuiz2 = async (formData) => {
  try {
    // API 요청
    const response = await api.post(`quiz/submit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("그리기 파일 전송 완료");
    return response.data;
  } catch (error) {
    console.error("그리기 파일 전송 실패", error);
    throw error;
  }
};
