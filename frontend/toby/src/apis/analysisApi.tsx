import api from "../config/apiConfig.tsx";

//정답률 비교 막대그래프
export const getCorrectAnswer = async () => {
  try {
    const response = await api.get("analysis");
    return response.data;
  } catch (error) {
    console.error("정답률 갖고오지 못했습니다", error);
  }
};

//최근 7일 이내 표현퀴즈 히스토리
export const getExpressQuiz = async () => {
  try {
    const response = await api.get("analysis/drawings");
    return response.data;
  } catch (error) {
    console.error("표현퀴즈 히스토리를 갖고 오지 못했습니다", error);
  }
};

//아이가 풀었던 문제리스트
export const getHistoryList = async () => {
  try {
    const response = await api.get("analysis/history");
    return response.data;
  } catch (error) {
    console.error("표현퀴즈 히스토리를 갖고 오지 못했습니다", error);
  }
};

//재채점
export const getRescore = async (memberQuizId, newScore) => {
  try {
    const requestBody = {
      memberQuizId: memberQuizId,
      score: newScore,
    };
    const response = await api.patch("analysis/regrade", requestBody);

    if (response.status === 200) {
      console.log("재채점 완료", response.data.message);
    } else {
      console.error("재채점 요청 실패", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("재채점을 수행하지 못했습니다", error);
    return null;
  }
};

//부모 비밀번호 인증
export const postParentsPassword = async (memberQuizId, newScore) => {
  try {
    const requestBody = {
      memberQuizId: memberQuizId,
      score: newScore,
    };
    const response = await api.post("analysis/regrade", requestBody);

    if (response.status === 200) {
      console.log("재채점 완료", response.data.message);
    } else {
      console.error("재채점 요청 실패", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("재채점을 수행하지 못했습니다", error);
    return null;
  }
};
