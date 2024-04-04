import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d1d8e0; /* background color */
  height: 100vh;
`;

const ConfettiContainer = styled.div`
  position: relative;
`;

interface ConfettiPieceProps {
  color: string;
  duration: number;
  delay: number;
}

const ConfettiPiece = styled.div<ConfettiPieceProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color}; /* color */
  border-radius: 50%;
  animation: confettiAnimation ${({ duration }) => duration}s ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes confettiAnimation {
    0% {
      transform: translateY(0) rotate(0);
    }
    100% {
      transform: translateY(200vh) rotate(360deg);
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &__text {
    background: #3867d6; /* button color */
    color: #fff; /* text color */
    padding: 1em 3em;
    border-radius: 3em;
    font-weight: 600;
    font-size: 1rem;
    white-space: nowrap;
    position: relative;
    z-index: 1;
    letter-spacing: 0.075em;
    border: 3px solid transparent;
    text-transform: uppercase;
  }
`;

const getRandomColor = () => {
  const colors = [
    "#4b7bec",
    "#fc5c65",
    "#fed330",
    "#26de81",
    "#2bcbba",
    "#fd9644",
    "#a55eea",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomDuration = () => Math.random() * 5 + 1;

const getRandomDelay = () => Math.random() * 2;

const Example = () => {
  const [isConfettiActive, setConfettiActive] = useState(false);

  const handleClick = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000); // reset after 3 seconds
  };

  return (
    <Container>
      <ConfettiContainer>
        {isConfettiActive &&
          Array.from({ length: 100 }, (_, index) => (
            <ConfettiPiece
              key={index}
              color={getRandomColor()}
              duration={getRandomDuration()}
              delay={getRandomDelay()}
            />
          ))}
      </ConfettiContainer>
      <Button onClick={handleClick}>
        <span className="button__text">click me</span>
      </Button>
    </Container>
  );
};

export default Example;
