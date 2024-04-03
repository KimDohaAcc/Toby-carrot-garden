// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { getUserStorage } from "../apis/userStorageApi";

// const LogoWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: calc(20%);
//   border: 2px solid cyan;
//   justify-content: center;
//   align-items: center;
//   z-index: 10;
// `;

// const LogoWrapper2 = styled.div`
//   position: absolute;
//   height: 100%;
//   width: auto;
//   border: 2px solid black;
//   justify-content: center;
//   align-items: center;
//   object-fit: contain;
//   overflow: hidden;
//   cursor: pointer;
// `;

// const LogoImg = styled.img`
//   width: 100%;
//   height: 100%;
// `;

// const Logo = () => {
//   const navigate = useNavigate();
//   const handleLogoClick = () => {
//     if (getUserStorage.accessToken) {
//       navigate("/main");
//     } else {
//       console.log("Access Denied. No accessToken found.");
//     }
//   };
//   return (
//     <LogoWrapper2 onClick={handleLogoClick}>
//       <LogoImg src="/Image/common/logoImage.png" alt="logo" />
//     </LogoWrapper2>
//   );
// };

// export default Logo;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserStorage } from "../apis/userStorageApi";

const LogoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: calc(20%);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const LogoWrapper2 = styled.div`
  position: absolute;
  height: 100%;
  width: auto;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  overflow: hidden;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Logo = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    if (getUserStorage.accessToken) {
      navigate("/main");
    } else {
      console.log("Access Denied. No accessToken found.");
    }
  };

  return (
    <LogoWrapper2 onClick={handleLogoClick}>
      <LogoImg src="/Image/common/logoImage.png" alt="logo" />
    </LogoWrapper2>
  );
};

export default Logo;
