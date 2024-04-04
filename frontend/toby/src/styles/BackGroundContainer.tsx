import styled from "styled-components";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -5;
  background-size: cover;
  background-image: url("Image/common/backgroundImage.png");
  overflow: hidden;
`;

export default BackgroundContainer;
