import { api } from "../config/apiConfig.tsx";
import { getUserStorage } from "./userStorageApi.tsx";
import { tempToken } from "../config/apiConfig.tsx";
//정답률 비교 막대그래프
export const getCorrectAnswer = async () => {
  const { accessToken } = getUserStorage();
  try {
    // accessToken을 콘솔에 출력합니다.
    console.log(
      "현재 accessToken: "
      // accessToken
    );
    console.log(accessToken);
    const response = await api.get("analysis/", {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    // const response = await api.get("analysis/");
    console.log("잘 연결되었습니다");
    return response.data;
  } catch (error) {
    console.error("정답률 갖고오지 못했습니다", error);
    console.log("현재 accessToken:", accessToken);
  }
};

//최근 7일 이내 표현퀴즈 히스토리
export const getDrawingsQuiz = async () => {
  try {
    const response = await api.get("analysis/drawings", {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    // const response = await api.get("analysis/drawings");
    console.log("잘 갖고왔다");
    return response.data;
  } catch (error) {
    console.error("그림퀴즈 히스토리를 갖고 오지 못했습니다", error);
  }
};

//아이가 풀었던 문제리스트
export const getEmotionList = async () => {
  try {
    const response = await api.get("analysis/emotion", {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    // const response = await api.get("analysis/emotion");
    return response.data;
  } catch (error) {
    console.error("감정퀴즈 히스토리를 갖고 오지 못했습니다", error);
  }
};

//아이가 풀었던 감정리스트
export const getObjectList = async () => {
  try {
    const response = await api.get("analysis/objects", {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    // const response = await api.get("analysis/object");
    return response.data;
  } catch (error) {
    console.error("감정퀴즈 히스토리를 갖고 오지 못했습니다", error);
  }
};

//재채점
export const getRescore = async (memberQuizId, score) => {
  try {
    const requestBody = {
      memberQuizId: memberQuizId,
      score: score,
    };
    // api.patch 호출 시 requestBody와 headers를 올바르게 분리하여 전달합니다.
    const response = await api.patch("analysis/regrade", requestBody, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    // const response = await api.patch("analysis/regrade", requestBody);
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
export const postParentsPassword = async (parentPassword) => {
  try {
    const requestBody = {
      parentPassword,
    };
    const response = await api.post("/analysis/certificate", requestBody);

    if (response.status === 200) {
      console.log("부모 비밀번호 통신 완료", response.data.message);
      return response.data.result.isCorrect;
    } else {
      return false;
    }
  } catch (error) {
    console.error("비밀번호 검증 중 오류가 발생했습니다", error);

    return false;
  }
};
