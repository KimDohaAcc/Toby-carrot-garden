import axios from "axios";

export const api = axios.create({
  // axios 인스턴스 생성
  baseURL: "https://j10a202.p.ssafy.io/api/", // 기본 url 설정
  // baseURL: "http://localhost:5173/",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   // 모든 요청에 대해 헤더에 토큰을 넣어주기 위한 인터셉터
//   const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰을 가져옴
//   if (token) {
//     // 토큰이 존재한다면
//     config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰을 실어 보냄
//   }
//   return config; // 요청을 보냄
// });

// api.interceptors.request.use(
//   (config) => {
//     // 로컬 스토리지에서 accessToken 가져오기
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       // accessToken이 있으면 헤더에 추가
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     // 요청 에러 처리
//     console.log("error Promise rejected");
//     return Promise.reject(error);
//   }
// );

const swaggerapi = axios.create({
  // axios 인스턴스 생성
  baseURL: "http://localhost:8080/swagger-ui/", // 기본 url 설정
});

export { swaggerapi };

// base url: [`https://i10a202.p.ssafy.io`]

// swagger url: [`http://localhost:8080/swagger-ui/index.html`]

export const tempToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzE5OTcyODU2fQ.BRvOAWqb8P63P73BoMo1vokoWTgLmedEULuqlonphAeen2o81eO_08lYDeqRDFWCfk0V9iN7DWA89k7EZon8hg";
