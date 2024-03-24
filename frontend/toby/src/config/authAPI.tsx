export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("저장된 accessToken:", accessToken); // 저장된 accessToken 확인
  console.log("저장된 refreshToken:", refreshToken); // 저장된 refreshToken 확인
};
