import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import School from "./pages/School";
import Hospital from "./pages/Hospital";
import PoliceOffice from "./pages/PoliceOffice";
import Mypage from "./pages/Mypage";
import Mart from "./pages/Mart";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/StartPage";
import AuthPage from "./pages/AuthPage";
import PrivacyConsentForm from "./pages/PrivacyConsentForm";
import KakaoSignup from "./pages/KakaoSignup";
import KakaoLogin from "./pages/KakaoLogin";
import UserInfoForm from "./pages/UserInfoForm";
import Example from "./pages/Example";

export const RouterInfo = [
  { path: "/", element: <StartPage />, withAuth: false },
  { path: "auth", element: <AuthPage />, withAuth: false },
  { path: "kakaoSignup", element: <KakaoSignup />, withAuth: false },
  { path: "kakaoLogin", element: <KakaoLogin />, withAuth: false },
  { path: "signplus", element: <UserInfoForm />, withAuth: false },
  {
    path: "privacyConsentForm",
    element: <PrivacyConsentForm />,
    withAuth: false,
  },
  { path: "main", element: <MainPage />, withAuth: true },
  { path: "school/*", element: <School />, withAuth: true },
  { path: "hospital/*", element: <Hospital />, withAuth: true },
  { path: "police/*", element: <PoliceOffice />, withAuth: true },
  { path: "mart/*", element: <Mart />, withAuth: true },
  { path: "mypage", element: <Mypage />, withAuth: true },
  { path: "report", element: <Report />, withAuth: true },

  { path: "example", element: <Example />, withAuth: false },
  { path: "*", element: <NotFound />, withAuth: true },
];
