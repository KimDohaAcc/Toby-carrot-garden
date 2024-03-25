import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.tsx";
import { useLocation, useNavigate } from "react-router-dom";

// import { getSceneList } from "../apis/hospitalApi";
import { setSceneList } from "../store/slices/hospitalSlice.tsx";

import Logo from "../components/Logo";

import StoryTitle from "../components/hospital/StoryTitle";
import StoryContent from "../components/hospital/StoryContent";
import StoryQuiz from "../components/hospital/StoryQuiz";
import StoryClear from "../components/hospital/StoryClear";

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

const dummyData = [
  {
    sceneId: 1,
    quizType: "normal",
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "토끼가 일어났어요",
    voice: "s3에 저장된 mp3 파일",
  },

  {
    sceneId: 2,
    quizType: "quiz",
    quiz: [
      {
        quizId: 1,
        correctAnswer: "딸기",
        quizType: "objects",
      },
    ],
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "토끼는 뭘 먹었을까요?",
    voice: "s3에 저장된 mp3 파일",
  },
  {
    sceneId: 3,
    quizType: "quiz",
    quiz: [
      {
        quizId: 1,
        correctAnswer: "딸기",
        quizType: "drawings",
      },
    ],
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "토끼는 뭘 먹었을까요?",
    voice: "s3에 저장된 mp3 파일",
  },
  {
    sceneId: 4,
    quizType: "quiz",
    quiz: [
      {
        quizId: 1,
        correctAnswer: "딸기",
        quizType: "feelings",
      },
    ],
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "토끼는 뭘 먹었을까요?",
    voice: "s3에 저장된 mp3 파일",
  },
  {
    sceneId: 5,
    quizType: "quiz",
    quiz: [
      {
        quizId: 1,
        correctAnswer: "딸기",
        quizType: "emergency",
      },
    ],
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "토끼는 뭘 먹었을까요?",
    voice: "s3에 저장된 mp3 파일",
  },
  {
    sceneId: 6,
    quizType: "clear",
    sceneImageUrl: "https://via.placeholder.com/150",
    content: "사진 촬영하세요",
    voice: "s3에 저장된 mp3 파일",
  },
];

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
`;

const StoryContentArea1 = styled.div`
  flex: 0 0 86%;
  border: 2px solid black;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoryContentArea2 = styled.div`
  display: grid;
  grid-template-areas:
    "conten closeBtn"
    "conten ."
    "conten nextBtn";
  grid-template-columns: 11fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  width: 90%;
  height: 90%;
  border: 2px solid black;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: closeBtn;
  color: #4e2626;
  border: 1px solid black;
`;

const NextBtn = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  grid-area: nextBtn;
  color: #128f8f;
  border: 1px solid black;
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
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
  quiz?: Quiz[];
}

const Hospital = () => {
  // const [sceneList, setSceneList] = useState<HospitalSceneList[]>([]);

  // useEffect(() => {
  //   const fetchSceneList = async () => {
  //     try {
  //       const response = await getSceneList(1);
  //       setSceneList(response.list);
  //     }
  //     catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchSceneList();
  // }, []);

  const [pageType, setPageType] = useState<string>("");
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const location = useLocation();
  const { title, storyImageUrl } = location.state; // title, storyImageUrl 받아오기

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const hospitalSceneList = useSelector<RootState, HospitalSceneList[]>(
    (state: RootState) => state.hospital.sceneList
  );

  useEffect(() => {
    // Dummy data를 Redux 스토어에 저장
    dispatch(setSceneList(dummyData));
    setPageType("title");
  }, [dispatch]);

  const renderSceneContent = () => {
    console.log("pageType: ", pageType);
    switch (pageType) {
      case "title":
        return <StoryTitle title={title} storyImageUrl={storyImageUrl} />;
      case "normal":
        return <StoryContent index={sceneIndex - 1} />;
      case "clear":
        return <StoryClear index={sceneIndex - 1} />;
      case "quiz":
        return <StoryQuiz index={sceneIndex - 1} />;
    }
  };

  const handleOnclickNextBtn = () => {
    console.log("sceneIndex: ", sceneIndex);
    setSceneIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      setPageType(hospitalSceneList[sceneIndex].quizType);
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
              X
            </CloseBtn>

            {pageType === "clear" ? (
              <div>마지막 페이지임</div>
            ) : (
              <NextBtn
                onClick={() => {
                  handleOnclickNextBtn();
                }}
              >
                다음
              </NextBtn>
            )}
          </StoryContentArea2>
        </StoryContentArea1>
      </StoryContainer>
    </>
  );
};

export default Hospital;
