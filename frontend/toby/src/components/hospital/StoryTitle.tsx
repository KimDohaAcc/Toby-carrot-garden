import React from "react";
import styled from "styled-components";

const StoryTitleContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const StoryTitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  font-weight: bold;
  border: 1px solid black;
`;

const StoryTitleImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryTitleImage = styled.img`
  height: 95%;
  border: 1px solid black;
`;

const StoryTitle = ({ title, storyImageUrl }) => {
  console.log("StoryTitle: ", title, "storyImageUrl:", storyImageUrl);
  return (
    <StoryTitleContainer>
      <StoryTitleImageArea>
        <StoryTitleImage src={storyImageUrl} />
      </StoryTitleImageArea>
      <StoryTitleText>{title}</StoryTitleText>
    </StoryTitleContainer>
  );
};

export default StoryTitle;
