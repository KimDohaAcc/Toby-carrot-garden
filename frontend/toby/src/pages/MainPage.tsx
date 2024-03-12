import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ConstructionModal from "../components/modals/constructionModal";
import Logo from "../components/Logo.tsx";

const MainpageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Area1 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3fr 2fr 2fr;
  flex: 3 0 auto;
  border: 1px solid black;
`;

const ReportArea = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ReportImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  top: -10%;
`;

const MartArea = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const MartImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  left: 20%;
`;

const Area2 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex: 2 0 auto;
  border: 1px solid black;
`;

const SchoolArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const SchoolImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
`;

const MypageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const MyPageImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  top: -30%;
`;

const Area3 = styled.div`
  display: grid;
  grid-template-rows: 3fr 2fr;
  flex: 2 0 auto;
  border: 1px solid black;
`;

const HospitalArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const HospitalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  top: 20%;
`;

const PoliceArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const PoliceImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  left: -20%;
`;

const Area4 = styled.div`
  display: grid;
  grid-template-rows: 5fr 2fr;
  border: 1px solid black;
  flex: 1 0 auto;
`;

const TobyArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const TobyImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAreaClick = (path: string) => {
    if (path === "/police" || path === "/mart") {
      setShowModal(true);
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
    </>
  );
};

export default MainPage;
