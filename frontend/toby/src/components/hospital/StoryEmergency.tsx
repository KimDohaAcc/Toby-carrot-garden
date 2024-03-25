import React from "react";
import styled from "styled-components";

import Phone from "./Phone";

const EmergencyContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 3fr 8fr 2fr;
  width: 100%;
  height: 100%;
`;

const EmergencyTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EmergencyContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EmergencyButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StoryEmergency = () => {
  return (
    <EmergencyContainer>
      <EmergencyTitle>Emergency</EmergencyTitle>
      <EmergencyContent>
        <Phone />
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
