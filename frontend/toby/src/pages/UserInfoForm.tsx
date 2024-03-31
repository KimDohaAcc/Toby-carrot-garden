import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { postSignInfo } from "../apis/signupAPI";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: url("Image/common/startImage.png");
`;
const ConsentBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 15px solid #ec903b;
  width: 60%;
  height: 70%;
  border-radius: 3%;
  background-color: white;
`;
const InputInline = styled.input`
  padding: 20px 15px;
  border-radius: 5px;
  border: 2px solid #ccc;
  font-size: 20px;
  &:focus {
    outline: none;
    border-color: #ec903b;
  }
`;
const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 세로 중앙 정렬
  margin-top: 20px; // 상단 여백
`;
const TextContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
  margin-left: 5rem;
  text-align: left;
  font-size: 40pt;
  line-height: 5rem;
  padding: 0;
`;
const Button = styled.button`
  dislplay: flex;
  flex-flow: wrap row;
  align-items: flex-end;
  background-color: transparent; // 버튼 배경 투명하게
  border: none; // 버튼 테두리 제거
  padding: 0; // 패딩 제거
  align-self: flex-end;
`;
const RabbitImage1 = styled.img`
  height: 50%;
  position: absolute;
  top: 1%;
  right: 7%;
`;

const CheckButton = styled.img`
  width: 30%;
  margin-left: 50%;
  margin-top: 5%;
  margin-bottom: 0;
`;
const VillageButton = styled.img``;

function UserInfoForm() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // 생일 입력 필드에 대한 최소 및 최대 날짜 설정
  const minDate = "2000-01-01";
  const maxDate = today;
  const handleNextStep = () => {
    if (step === 1 && (!name || !birthday)) {
      alert("이름과 생일을 모두 입력해주세요.");
      return;
    }

    if (step === 2 && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 일치 검사 통과 후 다음 단계로
    if (step === 2) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };
  const handleSubmit = async () => {
    try {
      // 요청 전송 전 데이터를 콘솔에 출력
      const requestData = {
        name,
        birthDate: birthday, // birthday를 birthDate로 변경
        parentPassword: password,
      };
      console.log("보내기 전 요청 데이터:", requestData);

      const response = await postSignInfo(requestData);
      console.log("추가 정보 전송 완료", response.message);
      navigate("/main");
    } catch (error) {
      console.error("추가 정보 전송 실패", error);
    }
  };

  return (
    <Container>
      <ConsentBorder>
        <RabbitImage1 src="Image/toby/cuteRabbit_text2.png" alt="Rabbit" />
        {step === 1 && (
          <TextContainer>
            <p>
              내 이름은 <br />
              <InputInline
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              이고,
            </p>
            <span>
              내 생일은{" "}
              <InputInline
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                min={minDate} // 최소 날짜 설정
                max={maxDate} // 최대 날짜 설정
              />
              이야.
            </span>
            <Button>
              <CheckButton
                onClick={handleNextStep}
                src="Image/button/checkButton.png"
                alt="Check"
              ></CheckButton>
            </Button>
          </TextContainer>
        )}
        {step === 2 && (
          <div>
            <h1>분석페이지에서 이용할 부모용 비밀번호를 입력해주세요.</h1>
            <h2>*추후 퀴즈 재채점에 사용됩니다.</h2>
            <PasswordContainer>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputInline
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={handleSubmit}>
                <VillageButton
                  src="Image/button/signupClearButton.png"
                  alt="Go to Village"
                />
              </Button>
            </PasswordContainer>
          </div>
        )}
      </ConsentBorder>
    </Container>
  );
}
export default UserInfoForm;
