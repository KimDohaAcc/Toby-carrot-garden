import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getStoryList } from "../../../apis/storyApi";
import { setStoryList } from "../../../store/slices/schoolSlice";

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
  background-color: #e6e6fa;
  z-index: 100;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
  gap: 20px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d5d5fb;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fbeaf8;
  }
`;

const StoryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  flex-basis: calc(25% - 20px);
  background-color: white;
  border-radius: 10px;
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

const StoryTitle = styled.h1`
  margin: 5px;
  flex: 2; /* 5:2:1 비율 중 두 번째 행 */
  overflow: hidden;
`;

const StoryImage = styled.img`
  width: 100%;
  flex: 5; /* 5:2:1 비율 중 첫 번째 행 */
`;

const AgeRecommendation = styled.p`
  font-size: 2rem;
  margin: 5px;
  background-color: #fdffb6;
  flex: 1; /* 5:2:1 비율 중 세 번째 행 */
`;

interface SchoolStoryList {
  storyId: number;
  title: string;
  storyImageUrl: string;
  recommendAge: string;
}

const SchoolStoryListModal = ({ onClose }) => {
  const placeId = 1;
  const dispatch = useDispatch();
  const [storysList, setStorysList] = useState<SchoolStoryList[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoryList = async () => {
      try {
        const response = await getStoryList(placeId);
        setStorysList(response);
        dispatch(setStoryList(response));
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStoryList();
  }, [dispatch]);

  const handleOnClickStory = (
    storyId: number,
    title: string,
    storyImageUrl: string
  ) => {
    navigate(`/school/${storyId}`, {
      state: { storyId, title, storyImageUrl },
    });
  };

  return (
    <>
      <ModalConatiner>
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
        <p>학교 스토리 목록</p>
        <ModalContent>
          {storysList.map((story: SchoolStoryList) => (
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
              <StoryImage src={story.storyImageUrl} alt={story.title} />
              <StoryTitle>
                {story.title.length > 8
                  ? story.title.slice(0, 5) + "..."
                  : story.title}
              </StoryTitle>
              <AgeRecommendation>
                권장 나이 : {story.recommendAge}
              </AgeRecommendation>
            </StoryContent>
          ))}
        </ModalContent>
      </ModalConatiner>
    </>
  );
};

export default SchoolStoryListModal;
