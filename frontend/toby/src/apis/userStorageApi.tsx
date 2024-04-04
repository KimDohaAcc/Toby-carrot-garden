// localStorage에서 사용자 정보를 조회하는 함수
export const getUserStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const name = localStorage.getItem("name");
  const birthDate = localStorage.getItem("birthDate");

  return { accessToken, refreshToken, name, birthDate };
};

// localStorage에서 사용자 정보를 삭제하는 함수
export const deleteUserStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("name");
  localStorage.removeItem("birthDate");
};

// localStorage에서 모든 사용자 정보를 삭제하는 함수
export const clearUserStorage = () => {
  localStorage.clear();
};
