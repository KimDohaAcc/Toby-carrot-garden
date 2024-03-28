export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("저장된 accessToken:", accessToken);
  console.log("저장된 refreshToken:", refreshToken);
};
