import React from "react";
import styled from "styled-components";

const StoryTitle = ({ title, storyImageUrl }) => {
  return (
    <div>
      <h1>StoryTitle</h1>
      <div>{title}</div>
      <img src={storyImageUrl} alt={title} />
    </div>
  );
};

export default StoryTitle;
