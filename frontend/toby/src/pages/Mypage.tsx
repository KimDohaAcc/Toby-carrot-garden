import React, { useState } from "react";
import "./Carrot.css";

const Mypage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCarrotClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button
        onClick={() => {
          handleCarrotClick();
        }}
      >
        당근
      </button>
      <div
        className={`image-container ${isClicked ? "clicked" : ""}`}
        onClick={handleImageClick}
      >
        <img src="src\assets\images\backgroundImage.png" alt="이미지" />
      </div>
    </>
  );
};

export default Mypage;
