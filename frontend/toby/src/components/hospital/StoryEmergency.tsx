import React from "react";
import styled from "styled-components";

const EmergencyContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas:
    "title title title"
    ". content ."
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
  grid-area: content;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  object-fit: cover;
`;

const StoryEmergency = () => {
  return (
    <EmergencyContainer>
      <EmergencyTitle>번호를 눌러주세요 이미지</EmergencyTitle>
      <EmergencyContent>
        <PhoneBackground src="/Image/modal/phone.png" alt="phone" />
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
