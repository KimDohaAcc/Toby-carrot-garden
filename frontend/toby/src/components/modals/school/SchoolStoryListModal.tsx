import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getStoryList } from "../../../apis/storyApi";
import { setStoryList } from "../../../store/slices/schoolSlice";
import { getPlaceId } from "../../../store/slices/placeSlice";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  padding: 3%;
  background-image: url("/Image/storyList/schoolBackground.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  animation: ${fadeInAnimation} 0.5s ease;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 99;
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
  padding: 1%;
  cursor: url("/Image/cursor/hover.png"), pointer;
  flex-basis: calc(25% - 70px);
  font-size: calc(0.7em);
  background-color: white;
  border-radius: 10px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 10%;
  border-radius: 5px;
  padding: 10px;
  font-size: calc(1.5em);
  background-color: white;
  cursor: url("/Image/cursor/hover.png"), pointer;
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
  font-size: calc(0.75em + 1vw);
  margin: 5px;
  background-color: #fdffb6;
  flex: 1; /* 5:2:1 비율 중 세 번째 행 */
`;
const List = styled.p`
  margin-left: 8%;
  font-size: calc(1.5em + 1vw);
  font-weight: bold;
  color: white;
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
        dispatch(getPlaceId(placeId));
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
      <ModalBackground onClick={onClose} />
      <ModalContainer>
        <CloseBtn onClick={onClose}>❌</CloseBtn>
        <List>학교 스토리 목록</List>
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
                  ? story.title.slice(0, 6) + "..."
                  : story.title}
              </StoryTitle>
              <AgeRecommendation>
                권장 나이 : {story.recommendAge}
              </AgeRecommendation>
            </StoryContent>
          ))}
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default SchoolStoryListModal;
