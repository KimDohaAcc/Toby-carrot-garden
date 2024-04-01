import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { postSignInfo } from "../apis/signupAPI";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  font-weight: bold;
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
  padding: 15px 15px;
  vertical-align: top;
  width: calc(20%);
  font-size: 3vh;
  border-radius: 5px;
  border: 2px solid #ccc;
  &:focus {
    outline: none;
    border-color: #ec903b;
  }
`;

const PasswordInputInline = styled.input`
  padding: 2%;
  vertical-align: top;
  width: calc(50%);
  margin-bottom: 10px;
  align-self: center;
  font-size: 2.5vh;
  border-radius: 5px;
  border: 2px solid #ccc;
  &:focus {
    outline: none;
    border-color: #ec903b;
  }
`;
const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7%;
  margin-right: 150px;
  margin-top: 20px;
`;

const TextContainer = styled.div`
  display: inline;
  flex-flow: wrap column;
  margin-left: 5%;
  line-height: 7vh;
`;

const Text = styled.span`
  font-size: 6vh;
  text-align: left;
`;

const SubText = styled.span`
  font-size: 3vh;
  text-align: left;
`;

const Button = styled.button`
  position: absolute;
  bottom: 20%;
  right: 25%;
  background-color: transparent;
  border: none;
  background-image: url("Image/button/checkButton.png");
  background-size: 100% 100%;
  width: calc(10%);
  height: calc(10%);
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: translateY(1px);
  }
`;

const RabbitImage1 = styled.img`
  height: 50%;
  position: absolute;
  top: 1%;
  right: 7%;
`;

const SignupClearButton = styled.div`
  position: absolute;
  bottom: 20%;
  right: 25%;
  background-image: url("Image/button/signupClearButton.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: calc(10%);
  height: calc(10%);
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: translateY(2px);
  }
`;

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
            <Text>내 이름은</Text> <br />
            <InputInline
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Text> 이고,</Text>
            <br /> <br />
            <Text> 내 생일은 &nbsp;</Text>
            <InputInline
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              min={minDate} // 최소 날짜 설정
              max={maxDate} // 최대 날짜 설정
            />
            <Text> 이야.</Text>
            <Button onClick={handleNextStep} />
          </TextContainer>
        )}
        {step === 2 && (
          <PasswordContainer>
            <Text>분석페이지에서 이용할</Text>
            <Text>부모용 비밀번호를 입력해주세요.</Text>
            <SubText>*추후 퀴즈 재채점에 사용됩니다.</SubText>
            <br />
            <br />
            <PasswordInputInline
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInputInline
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SignupClearButton onClick={handleSubmit} />
          </PasswordContainer>
        )}
      </ConsentBorder>
    </Container>
  );
}
export default UserInfoForm;
