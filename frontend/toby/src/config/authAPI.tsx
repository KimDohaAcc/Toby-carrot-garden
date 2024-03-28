export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("저장된 accessToken:", localStorage.getItem("accessToken"));
  console.log("저장된 refreshToken:", localStorage.getItem("refreshToken"));
};
