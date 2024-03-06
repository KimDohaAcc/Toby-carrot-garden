import React, { useState } from "react";
import "./Carrot.css";

const Carrot = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`image-container ${isClicked ? "clicked" : ""}`}
      onClick={handleImageClick}
    >
      <img src="src\assets\images\backgroundImage.png" alt="이미지" />
    </div>
  );
};

export default Carrot;
