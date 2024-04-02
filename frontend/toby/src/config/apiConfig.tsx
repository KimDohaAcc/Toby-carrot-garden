import axios from "axios";

export const api = axios.create({
  // axios 인스턴스 생성
  baseURL: "https://j10a202.p.ssafy.io/api/", // 기본 url 설정
  // baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      // 요청을 보낼 때의 헤더 상태 확인
      console.log("Request Headers: ", config.headers);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const swaggerapi = axios.create({
  // axios 인스턴스 생성
  baseURL: "http://localhost:8080/swagger-ui/", // 기본 url 설정
});

export { swaggerapi };

// base url: [`https://i10a202.p.ssafy.io`]

// swagger url: [`http://localhost:8080/swagger-ui/index.html`]

export const tempToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzE5OTcyODU2fQ.BRvOAWqb8P63P73BoMo1vokoWTgLmedEULuqlonphAeen2o81eO_08lYDeqRDFWCfk0V9iN7DWA89k7EZon8hg";
