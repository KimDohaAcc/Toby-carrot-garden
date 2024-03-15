import React, { useState } from "react";

// import styled from "styled-components";
function UserInfoForm() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");

  // 비밀번호와 이름을 확인하는 함수
  const handleNextStep2 = () => {
    // 여기서 비밀번호 검증 로직을 추가할 수 있습니다.
    // 예시에서는 단순히 입력 값이 있는지만 확인합니다.
    if (password) {
      setStep(step + 1); // 다음 단계로 넘어갑니다.
    } else {
      alert("비밀번호 입력해주세요.");
    }
  };
  const handleNextStep3 = () => {
    // 여기서 비밀번호 검증 로직을 추가할 수 있습니다.
    // 예시에서는 단순히 입력 값이 있는지만 확인합니다.
    if (name) {
      setStep(step + 1); // 다음 단계로 넘어갑니다.
    } else {
      alert("이름을 입력해주세요.");
    }
  };
  return (
    <div>
      {step === 1 && (
        <div>
          <h2>비밀번호 입력하세요</h2>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleNextStep2}>다음</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>이름을 입력하세요</h2>

          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleNextStep3}>다음</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>생일을 입력하세요</h2>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          {/* 여기서 필요한 경우 다음 단계로 넘어가는 로직을 추가할 수 있습니다. */}
        </div>
      )}
    </div>
  );
}

export default UserInfoForm;
