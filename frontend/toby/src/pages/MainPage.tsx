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
  display: grid;
  grid-template-rows: 3fr 2fr 2fr;
  flex-grow: 3;
  border: 1px solid black;
`;

const ReportArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MartImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  left: 10%;
`;

const Area2 = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex-grow: 2;
  border: 1px solid black;
`;

const SchoolArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SchoolImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
`;

const MypageArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex-grow: 2;
  border: 1px solid black;
`;

const HospitalArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HospitalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  top: -20%;
`;

const PoliceArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PoliceImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  position: relative;
  left: -20%;
  top: -10%;
`;

const Area4 = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-rows: 5fr 2fr;
  border: 1px solid black;
`;

const TobyArea = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
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
