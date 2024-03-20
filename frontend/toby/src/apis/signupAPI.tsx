import api from "../config/apiConfig.tsx";

//카카오 로그인 페이지 이동
export const getKakaoPage = async () => {
  try {
    const response = await api.get("auth/oauth2/kakao");
    return response.data;
  } catch (error) {
    console.error("카카오 리다이렉트를 하지 못했습니다", error);
  }
};

//카카오 인증 토큰 보내기
export const postKakaoToken = async () => {
  try {
    const response = await api.post("auth/oauth2/kakao");
    return response.data;
  } catch (error) {
    console.error("카카오 인증토큰을 갖고오지 못했습니다", error);
  }
};
