import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const NotFoundImage = styled.img`
  width: auto;
  height: 100%;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404 Not Found</h1>
      <NotFoundImage src="/Image/toby/cuteRabbit.png" alt="notfound" />
    </NotFoundContainer>
  );
};

export default NotFound;
