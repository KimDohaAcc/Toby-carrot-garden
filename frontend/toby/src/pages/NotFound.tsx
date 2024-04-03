import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const Text = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  font-size: 2rem;
`;

const NotFoundImage = styled.img`
  flex: 0 0 80%;
  width: auto;
  height: 100%;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Text>
        404 Not Found <br />
        없는 페이지 입니다.
      </Text>
      <NotFoundImage src="/Image/toby/cuteRabbit.png" alt="notfound" />
    </NotFoundContainer>
  );
};

export default NotFound;
