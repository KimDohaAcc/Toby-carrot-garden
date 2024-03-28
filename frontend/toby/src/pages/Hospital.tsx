import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { setSceneList } from "../store/slices/hospitalSlice.tsx";

import { getSceneList } from "../apis/storyApi.tsx";

import Logo from "../components/Logo";

import StoryTitle from "../components/placeStory/StoryTitle.tsx";
import StoryContent from "../components/placeStory/StoryContentHospital.tsx";
import StoryQuiz from "../components/placeStory/StoryQuizHospitial.tsx";
import StoryClear from "../components/placeStory/StoryClearHospital.tsx";

//더미 데이터
// {
//   “status” : 200,
//   “message” : “장면 목록을 보냈습니다”,
//    “result” :
//     {
//       “list” :
//           [
//               {
//                  “sceneId” : 1,
//                   “quizType” : “normal”,
//                   “quiz” : null,
//                   “sceneImageUrl” : “s3 url”,
//                   “content” : “토끼가 일어났어요”,
//                   “voice” : “s3에 저장된 mp3 파일”
//               } ,
//              {
//                  “sceneId” : 2,
//                   “quizType” : “clear”,
//                   “quiz” : null,
//                   “sceneImageUrl” : “s3 url”,
//                   “content” : “사진 촬영하세요”,
//                   “voice” : “s3에 저장된 mp3 파일”
//               },
//               {
//                  “sceneId” : 3,
//                   “quizType” : “quiz”,
//                    “quiz” : {
//                                 “quizId” : 1,
//                                 “correctAnswer” : “딸기”,
//                                 “quizType” : “drawings”
//                                 }
//                   “sceneImageUrl” : “s3 url”,
//                   “content” : “토끼는 뭘 먹었을까요?”,
//                   “voice” : “s3에 저장된 mp3 파일”
//               }
//           ]
//      }
// }

// const dummyData = [
//   {
//     sceneId: 1,
//     sceneType: "normal",
//     sceneImageUrl: "https://via.placeholder.com/150",
//     content:
//       "코코가 케이크를 너무 많이 먹은 나머지 배가 아파서 쓰러졌어요. 토비가 너무 놀랐네요. 어떤 표정을 하고있을지 표정을 지어볼까요?",
//     voice: "s3에 저장된 mp3 파일",
//   },

//   {
//     sceneId: 2,
//     sceneType: "quiz",
//     quiz: {
//       quizId: 1,
//       correctAnswer: "딸기",
//       quizType: "objects",
//     },

//     sceneImageUrl: "https://via.placeholder.com/150",
//     content: "토끼는 뭘 먹었을까요?",
//     voice: "s3에 저장된 mp3 파일",
//   },
//   {
//     sceneId: 3,
//     sceneType: "quiz",
//     quiz: {
//       quizId: 1,
//       correctAnswer: "딸기",
//       quizType: "drawings",
//     },

//     sceneImageUrl: "https://via.placeholder.com/150",
//     content: "토끼는 뭘 먹었을까요?",
//     voice: "s3에 저장된 mp3 파일",
//   },
//   {
//     sceneId: 4,
//     sceneType: "quiz",
//     quiz: {
//       quizId: 1,
//       correctAnswer: "딸기",
//       quizType: "feelings",
//     },

//     sceneImageUrl: "https://via.placeholder.com/150",
//     content:
//       "코코가 케이크를 너무 많이 먹은 나머지 배가 아파서 쓰러졌어요. 토비가 너무 놀랐네요. 어떤 표정을 하고있을지 표정을 지어볼까요?",
//     voice: "s3에 저장된 mp3 파일",
//   },
//   {
//     sceneId: 5,
//     sceneType: "quiz",
//     quiz: {
//       quizId: 1,
//       correctAnswer: "딸기",
//       quizType: "emergency",
//     },

//     sceneImageUrl: "https://via.placeholder.com/150",
//     content: "토끼는 뭘 먹었을까요?",
//     voice: "s3에 저장된 mp3 파일",
//   },
//   {
//     sceneId: 6,
//     sceneType: "clear",
//     sceneImageUrl: "https://via.placeholder.com/150",
//     content: "사진 촬영하세요",
//     voice: "s3에 저장된 mp3 파일",
//   },
// ];

// 전체 컨테이너
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

interface HospitalSceneList {
  sceneId: number;
  sceneType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
  quiz?: Quiz;
}

const Hospital = () => {
  const [scenesList, setScenesList] = useState<HospitalSceneList[]>([]); // 받아온 장면 목록 저장해주는 곳

  const [sceneType, setSceneType] = useState<string>(""); // 장면 타입
  const [sceneIndex, setSceneIndex] = useState<number>(-1); // 장면 인덱스

  const location = useLocation();
  console.log(location.state);
  const { storyId, title, storyImageUrl } = location.state; // storyId, title, storyImageUrl navigate의 state로 받아오기
  console.log(storyId, title, storyImageUrl);
  const dispatch = useDispatch(); // 리덕스 디스패치
  const navigate = useNavigate(); // 페이지 이동

  const hospitalSceneList = useSelector<RootState, HospitalSceneList[]>( // 리덕스 스토어에서 장면 목록 가져오기
    (state: RootState) => state.hospital.sceneList // hospital 슬라이스의 sceneList 가져오기
  );
  console.log(hospitalSceneList);

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
      setSceneType(hospitalSceneList[nextIndex].sceneType);
      return nextIndex;
    });
    console.log("sceneIndex2: ", sceneIndex);
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

export default Hospital;
