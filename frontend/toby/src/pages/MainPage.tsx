import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConstructionModal from "../components/modals/constructionModal";
import PasswordModal from "../components/modals/passwordCheck"; // 비밀번호 입력 모달
import Logo from "../components/Logo";
import HospitalStoryListModal from "../components/modals/hospital/HospitalStoryListModal";
import { getUserStorage } from "../apis/userStorageApi";

const MainpageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Area1 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 2fr 3fr 3fr;
  flex: 0 0 33%;
  border: 1px solid black;
`;

const ReportArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  border: 1px solid black;
`;

const ReportImage = styled.img`
  /* max-width: 100%;
  max-height: 100%; */
  max-width: 100%;
  height: 100%;
  position: absolute;

  top: -5%;
`;

const MartArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
  position: relative;
`;

const MartImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 85%;

  position: absolute;
  left: 15%;
  top: 7%;
`;

const Area2 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex: 0 0 29.5%;
  border: 1px solid black;
`;

const SchoolArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
  position: relative;
`;

const SchoolImage = styled.img`
  max-width: 150%;
  max-height: 150%;
  width: 150%;
  position: absolute;
  top: 3%;
`;

const MypageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
  position: relative;
`;

const MyPageImage = styled.img`
  max-width: 150%;
  max-height: 150%;
  width: 120%;
  position: relative;
  top: -42%;
  position: absolute;
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
  position: relative;
`;

const HospitalImage = styled.img`
  max-width: 95%;
  max-height: 95%;
  width: 95%;
  position: absolute;
  top: 11%;
  left: 18%;
`;

const PoliceArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
  position: relative;
`;

const PoliceImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  position: absolute;
  top: -3%;
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
  const [showHospitalModal, setShowHospitalModal] = useState(false); // 병원 스토리 리스트 모달 상태

  const [modalType, setModalType] = useState(""); // 모달 종류를 결정하는 상태
  const [userName, setUserName] = useState("");
  useEffect(() => {
    // 컴포넌트 마운트 시 getUserStorage를 호출하여 사용자 이름 가져오기
    const userInfo = getUserStorage();
    if (userInfo && userInfo.name) {
      setUserName(`${userInfo.name}, 안녕`);
    }
  }, []);

  const handleAreaClick = (path: string) => {
    setShowHospitalModal(true);
    if (path === "/report") {
      setShowModal(true);
      setModalType("password");
    } else if (path === "/police" || path === "/mart") {
      setShowModal(true);
      setModalType("construction");
    } else if (path === "/hospital") {
      setShowHospitalModal(true);
      setModalType("hospital");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <MainpageContainer>
        <Area1>
          <div style={{ position: "relative" }}>
            <Logo />
          </div>
          <ReportArea>
            <ReportImage
              src="\Image\village\reportImage.png"
              alt="report"
              onClick={() => handleAreaClick("/report")}
            />
          </ReportArea>
          <MartArea>
            <MartImage
              src="\Image\village\martImage.png"
              alt="mart"
              onClick={() => handleAreaClick("/mart")}
            />
          </MartArea>
        </Area1>
        <Area2>
          <SchoolArea>
            <SchoolImage
              src="\Image\village\schoolImage.png"
              alt="school"
              onClick={() => handleAreaClick("/school")}
            />
          </SchoolArea>
          <MypageArea>
            <MyPageImage
              src="\Image\village\mypageImage.png"
              alt="mypage"
              onClick={() => handleAreaClick("/mypage")}
            />
          </MypageArea>
        </Area2>
        <Area3>
          <HospitalArea>
            <HospitalImage
              src="\Image\village\hospitalImage.png"
              alt="hospital"
              onClick={() => handleAreaClick("/hospital")}
            />
          </HospitalArea>
          <PoliceArea>
            <PoliceImage
              src="\Image\village\policeImage.png"
              alt="police"
              onClick={() => handleAreaClick("/police")}
            />
          </PoliceArea>
        </Area3>
        <Area4>
          <div> {userName && <h1>{userName}</h1>}</div>
          <TobyArea>
            <TobyImage
              src="\Image\toby\maintoby.png"
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
      {showHospitalModal && modalType === "hospital" && (
        <HospitalStoryListModal onClose={() => setShowHospitalModal(false)} />
      )}
    </>
  );
};

export default MainPage;
