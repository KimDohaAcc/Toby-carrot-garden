import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { RootState } from "../store/store";

import { useDispatch } from "react-redux";

import PasswordModal from "../components/modals/passwordCheck";
import Logo from "../components/Logo";
import HospitalStoryListModal from "../components/modals/hospital/HospitalStoryListModal";
import SchoolStoryListModal from "../components/modals/school/SchoolStoryListModal";
import MartStoryListModal from "../components/modals/mart/MartStoryListModal";
import PoliceStoryListModal from "../components/modals/police/PoliceStoryListModal";

import { getUserStorage, clearUserStorage } from "../apis/userStorageApi";
import { useSelector } from "react-redux";

import { setIsPlaceClear } from "../store/slices/placeSlice";

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
`;

const ReportArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const ReportImage = styled.img`
  max-width: 100%;
  width: 90%;
  height: 100%;
  position: absolute;

  top: -5%;
  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const MartArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const MartImage = styled.img`
  width: 85%;
  height: 100%;

  position: absolute;
  left: 15%;
  top: 7%;
  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const Area2 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr;
  flex: 0 0 29.5%;
`;

const SchoolArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const SchoolImage = styled.img`
  width: 150%;
  height: 80%;
  position: absolute;
  top: 3%;

  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const MypageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  position: relative;
`;

const MyPageImage = styled.img`
  max-width: 150%;
  max-height: 150%;
  width: 105%;
  height: 95%;
  position: relative;
  top: -28%;
  position: absolute;
  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const Area3 = styled.div`
  display: grid;
  grid-template-rows: 3fr 2fr;
  flex: 0 0 25%;
`;

const HospitalArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  position: relative;
`;

const HospitalImage = styled.img`
  max-width: 95%;
  max-height: 95%;
  width: 95%;
  height: 85%;
  position: absolute;
  top: 11%;
  left: 18%;

  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const PoliceArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  position: relative;
`;

const PoliceImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: -3%;

  box-shadow: none;
  transition: box-shadow 0.1s ease;

  &:hover,
  &:active {
    transform: translateY(3px);
  }
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const UserArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const Area4 = styled.div`
  display: grid;
  grid-template-rows: 5fr 2fr;
  flex: 0 0 12.5%;
`;

const TobyArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  box-sizing: border-box;
`;

const TobyImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 80%;
  height: 90%;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const UserName = styled.div`
  position: absolute;
  width: calc(100%);
  top: calc(5%);
  right: calc(15%);
  transform: translateX(-50%);
  padding: calc(3%) calc(10%);
  color: #ffffff;
  font-size: calc(2vw);
  z-index: 1;
  background-image: url("/Image/button/nameBackground.png");
  background-size: 100% 100%;
`;

const SoundButton = styled.img`
  width: calc(80%);
  align-self: center;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const LogoutArea = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: calc(30%);
  top: calc(5%);
  right: calc(8%);
`;

const SoundArea = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: calc(30%);
  top: calc(5%);
  right: calc(45%);
`;

const ButtonText = styled.div`
  font-size: 1.1vw;
  margin-top: 7px;
`;

const LogoutButton = styled.img`
  cursor: url("/Image/cursor/hover.png"), pointer;
  align-self: center;
  width: calc(80%);
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false); // 병원 스토리 리스트 모달 상태
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showMartModal, setShowMartModal] = useState(false); // 병원 스토리 리스트 모달 상태
  const [showPoliceModal, setShowPoliceModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 모달 종류를 결정하는 상태
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const isPlaceClear = useSelector<RootState, boolean>(
    (state: RootState) => state.place.isplaceClear
  );

  const location = useLocation();

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const areaAudioRef = React.useRef<HTMLAudioElement>(null);
  const [muteImage, setMuteImage] = useState("/Image/button/no-sound.png");

  useEffect(() => {
    // 컴포넌트 마운트 시 getUserStorage를 호출하여 사용자 이름 가져오기
    const userInfo = getUserStorage();
    if (userInfo && userInfo.name) {
      setUserName(`${userInfo.name}` + " ");
    }
    if (isPlaceClear) {
      const { placeName } = location.state;

      if (placeName === "hospital") {
        setShowHospitalModal(true);
        setModalType("hospital");
        dispatch(setIsPlaceClear(false));
      } else if (placeName === "school") {
        setShowSchoolModal(true);
        setModalType("school");
        dispatch(setIsPlaceClear(false));
      } else if (placeName === "mart") {
        setShowMartModal(true);
        setModalType("mart");
        dispatch(setIsPlaceClear(false));
      } else if (placeName === "police") {
        setShowPoliceModal(true);
        setModalType("police");
        dispatch(setIsPlaceClear(false));
      }
    }
  }, [location.state, isPlaceClear, dispatch]);
  const handleLogout = () => {
    clearUserStorage();
    navigate("/");
  };
  const handleAreaClick = (path: string) => {
    // setShowHospitalModal(true);
    if (path === "/report") {
      setShowModal(true);
      setModalType("password");
    } else if (path === "/police") {
      setShowPoliceModal(true);
      setModalType("police");
    } else if (path === "/mart") {
      setShowMartModal(true);
      setModalType("mart");
    } else if (path === "/hospital") {
      setShowHospitalModal(true);
      setModalType("hospital");
    } else if (path === "/school") {
      setShowSchoolModal(true);
      setModalType("school");
    } else {
      navigate(path);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      if (audioRef.current.muted) {
        setMuteImage("/Image/button/sound.png");
      } else {
        setMuteImage("/Image/button/no-sound.png");
      }
    } else {
      console.error("audioRef is null");
    }
  };

  // const playAudio = (audioFilePath) => {
  //   const audio = new Audio(audioFilePath);
  //   audio.play();
  // };

  const [audioElements, setAudioElements] = useState([
    { id: "report", isPlaying: false },
    { id: "mart", isPlaying: false },
    { id: "hospital", isPlaying: false },
    { id: "police", isPlaying: false },
    { id: "mypage", isPlaying: false },
    { id: "school", isPlaying: false },
    // 다른 오디오 요소에 대한 정보도 추가
  ]);

  const playAudio = (id) => {
    setAudioElements((prevAudioElements) =>
      prevAudioElements.map((element) =>
        element.id === id ? { ...element, isPlaying: true } : element
      )
    );
  };

  const stopAudio = (id) => {
    setAudioElements((prevAudioElements) =>
      prevAudioElements.map((element) =>
        element.id === id ? { ...element, isPlaying: false } : element
      )
    );
  };
  const tobyClick = () => {
    const audio = new Audio("/Sound/toby.mp3");
    audio.play();
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
              onMouseEnter={() => playAudio("report")}
              onMouseLeave={() => stopAudio("report")}
            />
            {audioElements.map((audio) =>
              audio.isPlaying ? (
                <audio key={audio.id} controls autoPlay hidden>
                  <source
                    src={`/Sound/mainPage/${audio.id}.mp3`}
                    type="audio/mpeg"
                  />
                </audio>
              ) : null
            )}
          </ReportArea>
          <MartArea>
            <MartImage
              src="\Image\village\martImage.png"
              alt="mart"
              onClick={() => handleAreaClick("/mart")}
              onMouseEnter={() => playAudio("mart")}
              onMouseLeave={() => stopAudio("mart")}
            />
            {audioElements.map((audio) =>
              audio.isPlaying ? (
                <audio key={audio.id} controls autoPlay hidden>
                  <source
                    src={`/Sound/mainPage/${audio.id}.mp3`}
                    type="audio/mpeg"
                  />
                </audio>
              ) : null
            )}
          </MartArea>
        </Area1>
        <Area2>
          <SchoolArea>
            <SchoolImage
              src="\Image\village\schoolImage.png"
              alt="school"
              onClick={() => handleAreaClick("/school")}
              onMouseEnter={() => playAudio("school")}
              onMouseLeave={() => stopAudio("school")}
            />
            <audio id="school" controls hidden>
              <source src="/Sound/mainPage/school.mp3" type="audio/mpeg" />
            </audio>
          </SchoolArea>
          <MypageArea>
            <MyPageImage
              src="\Image\village\mypageImage.png"
              alt="mypage"
              onClick={() => handleAreaClick("/mypage")}
              onMouseEnter={() => playAudio("mypage")}
              onMouseLeave={() => stopAudio("mypage")}
            />
            <audio id="mypage" controls hidden>
              <source src="/Sound/mainPage/mypage.mp3" type="audio/mpeg" />
            </audio>
          </MypageArea>
        </Area2>
        <Area3>
          <HospitalArea>
            <HospitalImage
              src="\Image\village\hospitalImage.png"
              alt="hospital"
              onClick={() => handleAreaClick("/hospital")}
              onMouseEnter={() => playAudio("hospital")}
              onMouseLeave={() => stopAudio("hospital")}
            />
            <audio ref={audioRef} controls hidden>
              <source src="/Sound/mainPage/hospital.mp3" type="audio/mpeg" />
            </audio>
          </HospitalArea>
          <PoliceArea>
            <PoliceImage
              src="\Image\village\policeImage.png"
              alt="police"
              onClick={() => handleAreaClick("/police")}
              onMouseEnter={() => playAudio("police")}
              onMouseLeave={() => stopAudio("police")}
            />
            <audio id="police" controls hidden>
              <source src="/Sound/mainPage/police.mp3" type="audio/mpeg" />
            </audio>
          </PoliceArea>
        </Area3>
        <Area4>
          {/* <div> {userName && <h1>{userName}</h1>}</div> */}
          <UserArea>
            <UserName>{userName} 어린이</UserName>
            <SoundArea>
              <audio ref={audioRef} controls autoPlay loop hidden>
                <source src="/Sound/메인_BGM.mp3" type="audio/mpeg" />
              </audio>
              <SoundButton src={muteImage} onClick={handleMute} />
              <ButtonText>
                {muteImage == "/Image/button/no-sound.png"
                  ? "소리끄기"
                  : "소리듣기"}
              </ButtonText>
            </SoundArea>

            <LogoutArea>
              <LogoutButton
                src="\Image\button\logoutButton.png"
                onClick={handleLogout}
              />
              <ButtonText>로그아웃</ButtonText>
            </LogoutArea>
          </UserArea>
          <TobyArea>
            <TobyImage
              src="\Image\toby\maintoby.png"
              alt="toby"
              onClick={() => tobyClick()}
            />
          </TobyArea>
        </Area4>
      </MainpageContainer>
      {showMartModal && modalType === "mart" && (
        <MartStoryListModal onClose={() => setShowMartModal(false)} />
      )}
      {showPoliceModal && modalType === "police" && (
        <PoliceStoryListModal onClose={() => setShowPoliceModal(false)} />
      )}
      {showModal && modalType === "password" && (
        <PasswordModal onClose={() => setShowModal(false)} />
      )}
      {showHospitalModal && modalType === "hospital" && (
        <HospitalStoryListModal onClose={() => setShowHospitalModal(false)} />
      )}
      {showSchoolModal && modalType === "school" && (
        <SchoolStoryListModal onClose={() => setShowSchoolModal(false)} />
      )}
    </>
  );
};

export default MainPage;
