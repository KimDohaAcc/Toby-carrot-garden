import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { setSceneList } from "../store/slices/schoolSlice.tsx";
import { getSceneList } from "../apis/storyApi.tsx";

import Logo from "../components/Logo";

import StoryTitle from "../components/placeStory/StoryTitle";
import StoryContent from "../components/placeStory/StoryContentSchool.tsx";
import StoryQuiz from "../components/placeStory/StoryQuizSchool.tsx";
import StoryClear from "../components/placeStory/StoryClearSchool.tsx";
const StoryContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid black;
`;

// 로고와 병원 내용을 나누기 위한 컨테이너
const LogoArea = styled.div`
  flex: 0 0 14%;
  border: 2px solid black;
  box-sizing: border-box;
`;

const StoryContentArea1 = styled.div`
  background-image: url("/Image/common/storyFrameImage.png");
  background-size: 100% 100%;
  flex: 0 0 86%;
  border: 2px solid black;
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
  width: 82%;
  height: 80%;
  border: 2px solid black;
  position: absolute;
  left: 5%;
  top: 7%;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center; /* 버튼 내에서 텍스트를 수직 가운데 정렬 */
  grid-area: closeBtn;
  border-radius: 10%;
  background-color: #ff9d9d;
  color: #ff0000;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s ease; /* 마우스 호버 시 배경색이 부드럽게 변경되도록 트랜지션 추가. */
  font-size: 3rem;
  font-weight: bold;
  box-sizing: border-box;

  &:hover {
    background-color: #ffffff;
  }
`;

const NextBtn = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: nextBtn;
  border: 1px solid black;
  img {
    width: 100%;
  }
`;

const Content = styled.div`
  grid-area: conten;
  border: 1px solid black;
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
// const Image = styled.img`
//   object-fit: cover;
//   height: 100%; /* 이미지의 높이를 100%로 설정하여 부모 요소에 맞게 확장 */
// `;

const School = () => {
  const [scenesList, setScenesList] = useState<SchoolSceneList[]>([]); // 받아온 장면 목록 저장해주는 곳

  const [sceneType, setSceneType] = useState<string>(""); // 장면 타입
  const [sceneIndex, setSceneIndex] = useState<number>(-1); // 장면 인덱스

  const location = useLocation();
  console.log(location.state);
  const { storyId, title, storyImageUrl } = location.state; // storyId, title, storyImageUrl navigate의 state로 받아오기
  console.log(storyId, title, storyImageUrl);
  const dispatch = useDispatch(); // 리덕스 디스패치
  const navigate = useNavigate(); // 페이지 이동

  const SchoolSceneList = useSelector<RootState, SchoolSceneList[]>( // 리덕스 스토어에서 장면 목록 가져오기
    (state: RootState) => state.school.sceneList // hospital 슬라이스의 sceneList 가져오기
  );
  console.log(SchoolSceneList);

  useEffect(() => {
    const fetchSceneList = async () => {
      try {
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

  // useEffect(() => {
  //   // Dummy data를 Redux 스토어에 저장
  //   dispatch(setSceneList(dummyData));
  //   setSceneType("title");
  // }, [dispatch]);

  const renderSceneContent = () => {
    console.log("sceneType: ", sceneType);
    if (sceneIndex === -1) {
      return <StoryTitle title={title} storyImageUrl={storyImageUrl} />;
    } else {
      switch (sceneType) {
        case "NORMAL":
          return <StoryContent index={sceneIndex} />;
        case "CLEAR":
          return <StoryClear index={sceneIndex} />;
        case "QUIZ":
          return <StoryQuiz index={sceneIndex} />;
        default:
          return <div>Scene Type Error!!!</div>;
      }
    }
  };

  const handleOnclickNextBtn = () => {
    console.log("sceneIndex: ", sceneIndex);
    setSceneIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      setSceneType(SchoolSceneList[nextIndex].sceneType);
      return nextIndex;
    });
  };

  return (
    <>
      <Logo />
      <StoryContainer>
        <LogoArea />
        <StoryContentArea1>
          <StoryContentArea2>
            <Content>{renderSceneContent()}</Content>
            <CloseBtn
              onClick={() => {
                navigate("/main");
              }}
            >
              ✘
            </CloseBtn>

            {sceneType === "CLEAR" ? (
              <NextBtn>
                <img src="/Image/button/nextBtn2.png" alt="다음 버튼" />
              </NextBtn>
            ) : (
              <NextBtn
                onClick={() => {
                  handleOnclickNextBtn();
                }}
              >
                <img src="/Image/button/nextBtn.png" alt="다음 버튼" />
              </NextBtn>
            )}
          </StoryContentArea2>
        </StoryContentArea1>
      </StoryContainer>
    </>
  );
};

export default School;
