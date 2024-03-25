import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getStoryList } from "../../../apis/hospitalApi";
import { setStoryList } from "../../../store/slices/hospitalSlice";

//더미 데이터
const dummyData: HospitalStoryList[] = [
  {
    storyId: 1,
    title: "더미 데이터 제목 1",
    storyImageUrl: "https://via.placeholder.com/150",
    recommendAge: "2",
  },
  {
    storyId: 2,
    title: "더미 데이터 제목 2",
    storyImageUrl: "https://via.placeholder.com/150",
    recommendAge: "3~4",
  },
  // 추가적인 더미 데이터들...
];

const ModalConatiner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  border: 2px solid black;
  padding: 50px;
  background-color: #cdcdcd;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
`;

interface HospitalStoryList {
  storyId: number;
  title: string;
  storyImageUrl: string;
  recommendAge: string;
}

const HospitalStoryListModal = ({ onClose }) => {
  const place_id = 1;
  // const [storyList, setStoryList] = useState([]);
  const [storyList, setStoryList] = useState<HospitalStoryList[]>(dummyData);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchStoryList = async () => {
  //     try {
  //       const storyList = await getStoryList(place_id);
  //       setStoryList(storyList);
  //       console.log(storyList);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchStoryList();
  // }, []);

  const handleOnClickStory = (
    storyId: number,
    title: string,
    storyImageUrl: string
  ) => {
    navigate(`/hospital/${storyId}`, { state: { title, storyImageUrl } });
  };

  return (
    <>
      <ModalConatiner>
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
        <div>병원 스토리 목록</div>
        <ModalContent>
          {storyList.map((story: HospitalStoryList) => (
            <StoryContent
              key={story.storyId}
              onClick={() =>
                handleOnClickStory(
                  story.storyId,
                  story.title,
                  story.storyImageUrl
                )
              }
            >
              <img src={story.storyImageUrl} alt={story.title} />
              <h1>{story.title}</h1>
              <p>권장 나이 : {story.recommendAge}</p>
            </StoryContent>
          ))}
        </ModalContent>
      </ModalConatiner>
    </>
  );
};

export default HospitalStoryListModal;
