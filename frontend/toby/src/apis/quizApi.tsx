import { api } from "../config/apiConfig";

export const submitQuiz = async (formData) => {
  return new Promise((resolve, reject) => {
    api
      .request({
        method: "post",
        url: `/quiz/submit`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res);
        console.log("업로드 완료");
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

export const submitQuiz2 = async (formData) => {
  console.log("여기까지 옴");
  console.log(localStorage.getItem("accessToken"));
  try {
    const response = await api.post("quiz/submit", formData, {});

    return response.data;
  } catch (error) {
    console.error("퀴즈 제출을 실패했습니다.", error);
  }
};

export const getQuizAnswer = async ({ memberQuizId }) => {
  console.log("여기가ㅓ지 옴");
  console.log(memberQuizId);
  console.log(`quiz/${memberQuizId}/result`);

  try {
    const response = await api.get(`quiz/${memberQuizId}/result`);

    console.log(memberQuizId);
    console.log("여기까지 왔다");

    return response.data;
  } catch (error) {
    console.error("당근토끼를 갖고오지 못했습니다.", error);
    return null;
  }
};

//당근 count
export const getAllQuiz = async ({ place_id }) => {
  try {
    const response = await api.patch(`place/${place_id}/carrot`, {});
    return response.data;
  } catch (error) {
    console.error("119문제를 가져오지 못했습니다.", error);
    return null;
  }
};
