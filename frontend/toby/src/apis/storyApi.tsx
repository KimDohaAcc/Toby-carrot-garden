import { api } from "../config/apiConfig";

//URI : /place/{place_id} 장소 진입시 스토리 리스트 조회
// {
//   “status” : 200,
//   “message” : “스토리 목록을 보냈습니다”,
//    “result” :
//     {
//       “list” :
//           [
//               {
//                   “storyId” : 3,
//                   “title” : “병원에 가요”,
//                    “storyImageUrl” : “표지”,
//                   “recommendAge” : “3~4”
//               } ,
//               {
//                   “storyId” : 4,
//                   “title” : “병원에 안 가요”,
//                    “storyImageUrl” : “표지”,
//                   “recommendAge” : “2”
//               }
//           ]
//      }
// }

export const getStoryList = async (place_id: number) => {
  try {
    const response = await api.get(`place/${place_id}`);

    return response.data.result.list;
  } catch (error) {
    console.error(error);
  }
};

// URI : /story/{story_id} 스토리 진입시 장면 리스트 조회
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
//                   “sceneImageUrl” : “s3 url”,
//                   “content” : “토끼가 일어났어요”,
//                   “voice” : “s3에 저장된 mp3 파일”,
//                   “quiz” : null
//               } ,
//              {
//                  “sceneId” : 2,
//                   “quizType” : “clear”,
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

export const getSceneList = async (story_id: number) => {
  try {
    const response = await api.get(`story/${story_id}`);
    return response.data.result.list;
  } catch (error) {
    console.error(error);
  }
};
