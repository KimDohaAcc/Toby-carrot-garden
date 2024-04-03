import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [modalShown, setModalShown] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");

  // if (!accessToken && !modalShown) {
  //   setModalShown(true);
  //   alert("로그인이 필요한 서비스입니다.");
  // }

  return accessToken ? <Outlet /> : <Navigate to="/" />;
  // return accessToken && refreshToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
