import { api } from "../config/apiConfig";

export const submitQuiz2 = async (formData) => {
  try {
    // API 요청
    const response = await api.post(`clear-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("클리어 파일 전송 완료");
    return response.data;
  } catch (error) {
    console.error("클리어 파일 전송 실패", error);
    throw error;
  }
};
