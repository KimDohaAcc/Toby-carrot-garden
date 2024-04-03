import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Cursor = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url("path/to/cursor-image.png");
  background-size: cover;
  pointer-events: none;
  z-index: 9999;
`;

const NormalCursor = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  pointer-events: none;
  z-index: 9999;
  cursor: url(/Image/cursor/normal.png);
`;

const ClickCursor = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  pointer-events: none;
  z-index: 9999;
  cursor: url(/Image/cursor/clicked.png);
`;

const HoverCursor = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url(path/to/hover-cursor-image.png);
  background-size: cover;
  pointer-events: none;
  z-index: 9999;
  cursor: none;
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {isClicked && (
        <ClickCursor style={{ left: position.x, top: position.y }} />
      )}
      {isHovered && !isClicked && (
        <HoverCursor style={{ left: position.x, top: position.y }} />
      )}
      {!isHovered && !isClicked && (
        <NormalCursor style={{ left: position.x, top: position.y }} />
      )}
    </>
  );
};

export default CustomCursor;
