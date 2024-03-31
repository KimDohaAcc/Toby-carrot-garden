import React, { useRef } from "react";
import styled from "styled-components";

const EmergencyContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas:
    "title title title"
    ". conteent ."
    ". button .";
  grid-template-rows: 3fr 8fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
`;

const EmergencyTitle = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmergencyContent = styled.div`
  grid-area: conteent;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmergencyButton = styled.button`
  grid-area: button;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhoneBackground = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const StoryEmergency = () => {
  const clickref = useRef(null);
  return (
    <EmergencyContainer>
      <EmergencyTitle>번호를 눌러주세요 이미지</EmergencyTitle>
      <EmergencyContent>
        <PhoneBackground
          src="/Image/modal/phone.png"
          alt="phone"
          ref={clickref}
          onClick={() => {
            console.log("Phone Image Clicked");
            console.log(clickref.current);
          }}
        />
      </EmergencyContent>
      <EmergencyButton
        onClick={() => {
          console.log("Emergency Button Clicked");
        }}
      >
        Emergency Button
      </EmergencyButton>
    </EmergencyContainer>
  );
};

export default StoryEmergency;
