import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConstructionModal from "../components/modals/constructionModal";
import PasswordModal from "../components/modals/passwordCheck"; // 비밀번호 입력 모달
import Logo from "../components/Logo";

const MainpageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Area1 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3fr 2fr 2fr;
  flex: 0 0 37.5%;
  border: 1px solid black;
`;

const ReportArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  top: -10%;
`;

const ReportImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 500px;
`;

const MartArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
`;

const MartImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 500px;
  position: relative;
  top: 5%;
`;

const Area2 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex: 0 0 25%;
  border: 1px solid black;
`;

const SchoolArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
`;

const SchoolImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  position: relative;
  top: 10%;
`;

const MypageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
`;

const MyPageImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  position: relative;
  top: -25%;
`;

const Area3 = styled.div`
  display: grid;
  grid-template-rows: 3fr 2fr;
  flex: 0 0 25%;
  border: 1px solid black;
`;

const HospitalArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
`;

const HospitalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 500px;
  position: relative;
  top: 5%;
`;

const PoliceArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
`;

const PoliceImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 500px;
`;

const Area4 = styled.div`
  display: grid;
  grid-template-rows: 5fr 2fr;
  border: 1px solid black;
  flex: 0 0 12.5%;
`;

const TobyArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
`;

const TobyImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 80%;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 모달 종류를 결정하는 상태

  const handleAreaClick = (path: string) => {
    setShowModal(true);
    if (path === "/report") {
      setModalType("password");
    } else if (path === "/police" || path === "/mart") {
      setModalType("construction");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <Logo />
      <MainpageContainer>
        <Area1>
          <div></div>
          <ReportArea>
            <ReportImage
              src="src\assets\images\reportImage.png"
              alt="report"
              onClick={() => handleAreaClick("/report")}
            />
          </ReportArea>
          <MartArea>
            <MartImage
              src="src\assets\images\martImage.png"
              alt="mart"
              onClick={() => handleAreaClick("/mart")}
            />
          </MartArea>
        </Area1>
        <Area2>
          <SchoolArea>
            <SchoolImage
              src="src\assets\images\schoolImage.png"
              alt="school"
              onClick={() => handleAreaClick("/school")}
            />
          </SchoolArea>
          <MypageArea>
            <MyPageImage
              src="src\assets\images\mypageImage.png"
              alt="mypage"
              onClick={() => handleAreaClick("/mypage")}
            />
          </MypageArea>
        </Area2>
        <Area3>
          <HospitalArea>
            <HospitalImage
              src="src\assets\images\hospitalImage.png"
              alt="hospital"
              onClick={() => handleAreaClick("/hospital")}
            />
          </HospitalArea>
          <PoliceArea>
            <PoliceImage
              src="src\assets\images\policeImage.png"
              alt="police"
              onClick={() => handleAreaClick("/police")}
            />
          </PoliceArea>
        </Area3>
        <Area4>
          <div></div>
          <TobyArea>
            <TobyImage
              src="src\assets\images\toby\maintoby.png"
              alt="toby"
              onClick={() => handleAreaClick("/toby")}
            />
          </TobyArea>
        </Area4>
      </MainpageContainer>
      {showModal && modalType === "construction" && (
        <ConstructionModal onClose={() => setShowModal(false)} />
      )}
      {showModal && modalType === "password" && (
        <PasswordModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MainPage;
