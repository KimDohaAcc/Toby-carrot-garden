import axios from "axios";

const api = axios.create({
  // axios 인스턴스 생성
  baseURL: "https://i10a202.p.ssafy.io/api", // 기본 url 설정
});

api.interceptors.request.use((config) => {
  // 모든 요청에 대해 헤더에 토큰을 넣어주기 위한 인터셉터
  const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰을 가져옴
  if (token) {
    // 토큰이 존재한다면
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰을 실어 보냄
  }
  return config; // 요청을 보냄
});

const swaggerapi = axios.create({
  // axios 인스턴스 생성
  baseURL: "http://localhost:8080/swagger-ui/", // 기본 url 설정
});

export default api;
export { swaggerapi };

// base url: [`https://i10a202.p.ssafy.io`]

// swagger url: [`http://localhost:8080/swagger-ui/index.html`]
