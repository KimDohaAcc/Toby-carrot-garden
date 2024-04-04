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
    const requestBody = { tokenCode };
    const response = await api.post("auth/token", requestBody);

    if (response.status === 200 && response.data && response.data.result) {
      const { accessToken, refreshToken, signupComplete } =
        response.data.result;
      console.log("여기까지 왔습니다.");
      if (accessToken && refreshToken) {
        // 토큰 저장
        saveTokens({ accessToken, refreshToken });
        console.log("토큰 전송 완료", response.data.message);
        console.log(localStorage.getItem(accessToken));

        // 회원가입이 완료되었으면 추가 정보를 가져옵니다.
        if (signupComplete) {
          const memberInfo = await getMemberInfo();
          if (memberInfo.status === 200 && memberInfo.result) {
            const { name, birthDate } = memberInfo.result;

            // localStorage에 사용자 정보 저장
            localStorage.setItem("name", name);
            localStorage.setItem("birthDate", birthDate);

            console.log("회원 정보 저장 완료", memberInfo.message);
          }
        }
      } else {
        console.error("응답 내 accessToken 또는 refreshToken 누락");
      }
    } else {
      console.error("토큰 전송 실패", response.data?.message);
    }
    return response.data;
  } catch (error) {
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
//유저 정보 갖고오기
export const getMemberInfo = async () => {
  try {
    const response = await api.get("auth/member-info");

    console.log("여기까진 왔다");
    return response.data;
  } catch (error) {
    console.error("맴버정보를 갖고오지 못했습니다.", error);
  }
};
