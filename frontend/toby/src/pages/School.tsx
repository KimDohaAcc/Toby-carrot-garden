import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { setSceneList } from "../store/slices/schoolSlice.tsx";
import { setSchoolQuizClear } from "../store/slices/schoolSlice.tsx";
import { setIsPlaceClear } from "../store/slices/placeSlice.tsx";

import { getSceneList } from "../apis/storyApi.tsx";

import Logo2 from "../components/Logo2";

import StoryTitle from "../components/placeStory/StoryTitle";
import StoryContent from "../components/placeStory/StoryContent.tsx";
import StoryQuiz from "../components/placeStory/StoryQuiz.tsx";
import StoryClear from "../components/placeStory/StoryClear.tsx";

const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;
// 로고와 병원 내용을 나누기 위한 컨테이너
const LogoArea = styled.div`
  position: relative;
  flex: 0 0 14%;
`;

const StoryContentArea1 = styled.div`
  background-image: url("/Image/common/storyFrameImage.png");
  background-size: 100% 100%;
  flex: 0 0 86%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StoryContentArea2 = styled.div`
  display: grid;
  grid-template-areas:
    "conten closeBtn"
    "conten ."
    "conten nextBtn";
  grid-template-columns: 11fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  width: 81%;
  height: 77%;
  position: absolute;
  left: 5%;
  top: 9%;
`;

const CloseBtnArea = styled.div`
  grid-area: closeBtn;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: calc(35%);
  right: calc(25%);
  grid-area: closeBtn;
  border-radius: 5px;
  cursor: url("/Image/cursor/hover.png"), pointer;
  width: 3vw;
  height: 3vw;
  box-sizing: border-box;
  background-image: url("/Image/button/close.png");
  background-size: 100% 100%;
  background-color: transparent;
  border: none;

  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
  &:active {
    transform: scale(0.95); /* 클릭시 버튼이 살짝 축소되는 효과 */
  }
`;

const ButtonArea = styled.div`
  position: absolute;
  bottom: 0;
  right: calc(1%);
  width: calc(10%);
`;

const NextBtn = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: nextBtn;
  img {
    width: 100%;
  }

  cursor: url("/Image/cursor/hover.png"), pointer;
  box-shadow: none;
  transition: box-shadow 0.1s ease;
  &:active {
    transform: translateY(2px);
  }
`;

const NextBtn2 = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: nextBtn;
  img {
    width: 100%;
  }
`;

const Content = styled.div<{ fadeIn: boolean }>`
  grid-area: conten;
  opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
  transition: ${({ fadeIn }) => (fadeIn ? "opacity 0.5s ease-in" : "none")};
`;

interface Quiz {
  quizId: number;
  correctAnswer: string;
  quizType: string;
}

interface SchoolSceneList {
  sceneId: number;
  sceneType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
  quiz?: Quiz;
}

const School = () => {
  const [scenesList, setScenesList] = useState<SchoolSceneList[]>([]); // 받아온 장면 목록 저장해주는 곳

  const [sceneType, setSceneType] = useState<string>(""); // 장면 타입
  const [sceneIndex, setSceneIndex] = useState<number>(-1); // 장면 인덱스

  const [fadeIn, setFadeIn] = useState(false);
  const [prevState, setPrevState] = useState(false);

  const location = useLocation();
  const { storyId, title, storyImageUrl } = location.state; // storyId, title, storyImageUrl navigate의 state로 받아오기

  const dispatch = useDispatch(); // 리덕스 디스패치
  const navigate = useNavigate(); // 페이지 이동

  const SchoolSceneList = useSelector<RootState, SchoolSceneList[]>( // 리덕스 스토어에서 장면 목록 가져오기
    (state: RootState) => state.school.sceneList // hospital 슬라이스의 sceneList 가져오기
  );
  const isQuizClear = useSelector<RootState, boolean>(
    (state: RootState) => state.school.quizClear
  ); // 퀴즈 클리어 여부 가져오기

  const placeName = "school"; // 장소 이름

  // let storyId, title, storyImageUrl;

  // if (location.state) {
  //   const { storyId: id, title: t, storyImageUrl: imageUrl } = location.state;
  //   storyId = id;
  //   title = t;
  //   storyImageUrl = imageUrl;
  // } else {
  //   // location.state가 존재하지 않는 경우 에러 처리
  //   // 예를 들어 기본값을 설정하거나, 사용자에게 알림을 표시할 수 있습니다.
  //   console.error("location.state가 존재하지 않습니다.");
  //   // alert('잘못된 접근입니다. 메인 화면으로 이동합니다.');
  //   navigate("/main");
  //   // 또는 기본값 설정
  //   storyId = "";
  //   title = "";
  //   storyImageUrl = "";
  // }

  useEffect(() => {
    setFadeIn(true);
  }, [sceneIndex]);

  useEffect(() => {
    const fetchSceneList = async () => {
      try {
        if (sceneIndex === -1) {
          setPrevState(true);
        } else {
          setPrevState(false);
        }
        const response = await getSceneList(storyId); // storyId에 해당하는 장면 목록 받아오기
        console.log(response);
        setScenesList(response); // 받아온 장면 목록 저장
        dispatch(setSceneList(response)); // 받아온 장면 목록 리덕스 스토어에 저장
        setSceneType(response[sceneIndex].sceneType); // 장면 타입 설정
      } catch (error) {
        console.error(error);
      }
    };
    fetchSceneList();
  }, [dispatch, storyId, sceneIndex]); // storyId, sceneIndex가 바뀔 때마다 실행
  console.log(scenesList);

  const renderSceneContent = () => {
    console.log("sceneType: ", sceneType);
    if (sceneIndex === -1) {
      return (
        <StoryTitle
          title={title}
          storyImageUrl={storyImageUrl}
          placeName={placeName}
        />
      );
    } else {
      switch (sceneType) {
        case "NORMAL":
          return <StoryContent index={sceneIndex} placeName={placeName} />;
        case "CLEAR":
          return <StoryClear index={sceneIndex} placeName={placeName} />;
        case "QUIZ":
          return <StoryQuiz index={sceneIndex} placeName={placeName} />;
        default:
          return <div>Scene Type Error!!!</div>;
      }
    }
  };

  const handleOnclickNextBtn = () => {
    setFadeIn(false);
    setSceneIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      setSceneType(SchoolSceneList[nextIndex].sceneType);
      return nextIndex;
    });
    dispatch(setSchoolQuizClear(false));
  };

  const handleOnclickCloseBtn = () => {
    navigate("/main");
    dispatch(setSchoolQuizClear(false));
  };

  const handleOnclickFinishBtn = () => {
    navigate("/main", { state: { placeName } });
    dispatch(setIsPlaceClear(true));
    dispatch(setSchoolQuizClear(false));
  };

  const handleOnclickCarrotBtn = () => {
    navigate("/mypage", { state: { placeName } });
    dispatch(setIsPlaceClear(true));
    dispatch(setSchoolQuizClear(false));
  };

  const handleOnclickPrevBtn = () => {
    console.log("sceneIndex: ", sceneIndex);
    setFadeIn(false);
    if (sceneIndex > 0) {
      setSceneIndex((currenIndex) => {
        const prevIndex = currenIndex - 1;
        setSceneType(SchoolSceneList[prevIndex].sceneType);
        return prevIndex;
      });
    } else {
      setSceneIndex(-1);
    }
  };

  return (
    <>
      <StoryContainer>
        <LogoArea>
          <Logo2 />
        </LogoArea>
        <StoryContentArea1>
          <StoryContentArea2>
            <Content fadeIn={fadeIn}>{renderSceneContent()}</Content>
            <CloseBtnArea>
              <CloseBtn onClick={handleOnclickCloseBtn} />
            </CloseBtnArea>

            {sceneType === "QUIZ" && !isQuizClear ? (
              <ButtonArea>
                <NextBtn
                  onClick={() => {
                    handleOnclickPrevBtn();
                  }}
                >
                  <img src="/Image/button/prevBtn.png" alt="이전 버튼" />
                </NextBtn>
                <NextBtn2>
                  <img src="/Image/button/nextBtn2.png" alt="다음 버튼" />
                </NextBtn2>
              </ButtonArea>
            ) : sceneType === "CLEAR" ? (
              <ButtonArea>
                <NextBtn
                  onClick={() => {
                    handleOnclickPrevBtn();
                  }}
                >
                  <img
                    src="/Image/button/prevBtn.png"
                    alt="이전 버튼"
                    hidden={prevState}
                  />
                </NextBtn>
                <NextBtn
                  onClick={() => {
                    handleOnclickFinishBtn();
                  }}
                >
                  <img
                    src="/Image/button/showStoryList.png"
                    alt="스토리 보기 버튼"
                  />
                </NextBtn>
                <NextBtn
                  onClick={() => {
                    handleOnclickCarrotBtn();
                  }}
                >
                  <img
                    src="/Image/button/carrotBtn.png"
                    alt="당근밭으로 버튼"
                  />
                </NextBtn>
              </ButtonArea>
            ) : (
              <ButtonArea>
                <NextBtn
                  onClick={() => {
                    handleOnclickPrevBtn();
                  }}
                >
                  <img
                    src="/Image/button/prevBtn.png"
                    alt="이전 버튼"
                    hidden={prevState}
                  />
                </NextBtn>
                <NextBtn
                  onClick={() => {
                    handleOnclickNextBtn();
                  }}
                >
                  <img src="/Image/button/nextBtn.png" alt="다음 버튼" />
                </NextBtn>
              </ButtonArea>
            )}
          </StoryContentArea2>
        </StoryContentArea1>
      </StoryContainer>
    </>
  );
};

export default School;
