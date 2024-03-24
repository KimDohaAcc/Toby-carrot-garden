import { api } from "../config/apiConfig.tsx";
import { saveTokens } from "../config/authAPI.tsx";
//카카오 로그인 페이지 이동
export const getKakaoPage = async () => {
  try {
    const response = await api.get("auth/oauth2/kakao");
    console.log("API response:", response.data); // 이 줄 추가
    console.log("여기까진 왔다");
    return response.data;
  } catch (error) {
    console.error("카카오 리다이렉트를 하지 못했습니다", error);
    //
  }
};

//카카오 인증 토큰 보내기
export const postKakaoToken = async (tokenCode) => {
  try {
    // 요청 본문
    const requestBody = { tokenCode };

    // API 요청
    const response = await api.post("auth/token", requestBody);

    // 응답 로그 출력
    console.log("응답:", response);

    // 응답 검증 및 토큰 저장
    if (response.status === 200 && response.data && response.data.result) {
      const { accessToken, refreshToken } = response.data.result;

      // 토큰 존재 여부 확인
      if (accessToken && refreshToken) {
        // 토큰 저장 및 로그 출력
        saveTokens({ accessToken, refreshToken });
        console.log("토큰 전송 완료", response.data.message);
      } else {
        // 응답 내 토큰 누락 시 오류 로그 출력
        console.error("응답 내 accessToken 또는 refreshToken 누락");
      }
    } else {
      // 토큰 전송 실패 시 오류 로그 출력
      console.error("토큰 전송 실패", response.data?.message);
    }
    return response.data;
  } catch (error) {
    // 요청 중 오류 발생 시 오류 로그 출력
    console.error("토큰 전송 중 오류 발생", error);
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
    const response = await api.post("auth/signup", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("추가 정보 전송 완료", response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("추가 정보 전송 실패", error);
    return null;
  }
};
