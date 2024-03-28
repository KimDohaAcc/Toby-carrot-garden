// import React, { useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import styled from "styled-components";

// // 서명 캔버스를 감싸는 컨테이너를 스타일링한 컴포넌트 생성
// const SignatureContainer = styled.div`
//   margin: 20px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// // 서명 캔버스 스타일링
// const StyledSignatureCanvas = styled(SignatureCanvas)`
//   border: 1px solid #000;
// `;

// function Drawing() {
//   const signatureRef = useRef();

//   const clearSignature = () => {
//     signatureRef.current.clear();
//   };

//   const saveSignature = () => {
//     const dataUrl = signatureRef.current.toDataURL();
//     console.log(dataUrl); // 여기서 서명 데이터를 사용할 수 있습니다.
//   };

//   return (
//     <SignatureContainer>
//       <h2>Signature Pad</h2>
//       {/* styled-components로 스타일링된 서명 캔버스 */}
//       <StyledSignatureCanvas
//         ref={signatureRef}
//         penColor="black"
//         canvasProps={{ width: 500, height: 200 }}
//       />
//       <div>
//         <button onClick={clearSignature}>Clear</button>
//         <button onClick={saveSignature}>Save</button>
//       </div>
//     </SignatureContainer>
//   );
// }

// export default Drawing;
