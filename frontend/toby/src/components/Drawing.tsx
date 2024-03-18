import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function Drawing() {
  const signatureRef = useRef(); // 서명 캔버스를 참조하기 위한 ref 생성

  // 서명 지우기
  const clearSignature = () => {
    signatureRef.current.clear(); // ref를 통해 signature canvas의 clear 메소드 호출
  };

  // 서명 저장
  const saveSignature = () => {
    const dataUrl = signatureRef.current.toDataURL(); // ref를 통해 signature canvas의 toDataURL 메소드 호출하여 데이터 URL 생성
    console.log(dataUrl); // 콘솔에 데이터 URL 출력
  };

  return (
    <div>
      <h2>Signature Pad</h2>
      <SignatureCanvas
        ref={signatureRef} // SignatureCanvas 컴포넌트에 ref 연결
        penColor="black" // 펜 색상 설정
        canvasProps={{
          width: 1000,
          height: 800,
          className: "signature-canvas",
        }} // 캔버스 속성 설정
      />
      <div>
        <button onClick={clearSignature}>Clear</button> {/* 서명 지우기 버튼 */}
        <button onClick={saveSignature}>Save</button> {/* 서명 저장 버튼 */}
      </div>
    </div>
  );
}

export default Drawing; // Drawing 컴포넌트를 기본으로 내보냄
