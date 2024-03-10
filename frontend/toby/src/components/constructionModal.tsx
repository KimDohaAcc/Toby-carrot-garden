import React from "react";
import constructionImage from "../assets/images/constructionImage.png";

interface Props {
  onClose: () => void;
}

const ConstructionModal: React.FC<Props> = ({ onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={onClose}
  >
    <div
      style={{
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
      }}
      onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
    >
      <h2>공사중입니다!</h2>
      <img
        src={constructionImage}
        alt="Construction"
        style={{ width: "100%", height: "auto" }}
      />
      <button onClick={onClose}>닫기</button>
    </div>
  </div>
);

export default ConstructionModal;
