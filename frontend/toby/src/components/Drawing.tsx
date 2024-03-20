import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin: 20px;
`;

const Title = styled.h2`
  color: #333;
`;

const SignaturePadContainer = styled.div`
  border: 2px solid #000;
  margin: auto;
  width: 1020px; // 캔버스보다 약간 크게 설정하여 테두리가 보이도록 함
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Drawing() {
  const signatureRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const saveSignature = () => {
    const dataUrl = signatureRef.current?.toDataURL();
    if (dataUrl) {
      console.log(dataUrl);
    }
  };

  return (
    <Container>
      <Title>Signature Pad</Title>
      <SignaturePadContainer>
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            width: 1000,
            height: 800,
            className: "signature-canvas",
          }}
        />
      </SignaturePadContainer>
      <div>
        <Button onClick={clearSignature}>Clear</Button>
        <Button onClick={saveSignature}>Save</Button>
      </div>
    </Container>
  );
}

export default Drawing;
