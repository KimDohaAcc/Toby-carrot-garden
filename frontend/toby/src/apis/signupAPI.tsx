import api from "../config/apiConfig.tsx";

//카카오 로그인 페이지 이동
export const getKakaoPage = async () => {
  try {
    const response = await api.get("auth/oauth2/kakao");
    return response.data;
  } catch (error) {
    console.error("카카오 리다이렉트를 하지 zxxfz못했습니다", error);
    console.log("안녕");
  }
};

//카카오 인증 토큰 보내기
export const postKakaoToken = async (tokenCode) => {
  try {
    const requestBody = {
      tokenCode: tokenCode,
    };
    const response = await api.post("auth/token", requestBody);

    if (response.status === 200) {
      console.log("토큰전송완료", response.data.message);
    } else {
      console.error("재채점 요청 실패", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("재채점을 수행하지 못했습니다", error);
    return null;
  }
};

//회원가입 추가 정보 보내기
export const postSignInfo = async ({ name, birthDate, parentPassword }) => {
  try {
    const requestBody = {
      name: name,
      birthDate: birthDate,
      parentPassword: parentPassword,
    };
    const response = await api.post("auth/signup", requestBody);

    if (response.status === 200) {
      console.log("추가 정보 전송 완료", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("추가 정보 전송 실패", error);
    return null;
  }
};
