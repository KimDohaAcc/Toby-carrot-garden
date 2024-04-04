import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  align-items: center;
  border: 15px solid #ec903b;
  width: 60%;
  height: 70%;
  border-radius: 3%;
  background-color: white;
`;

const ConsentFormContainer = styled.div`
  padding: 10px;
  border: 3px solid #ccc;
  background-color: white;
  width: 70%;
  height: 70%;
  overflow-y: auto;
`;
const NextButton = styled.button`
  margin-top: 2%;
  margin-bottom: 2%;
  cursor: url("/Image/cursor/hover.png"), pointer;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center; // 체크박스와 라벨이 같은 높이에 위치하도록 정렬
  margin-top: 20px; // 필요에 따라 조절
`;
function PrivacyConsentForm() {
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent) {
      navigate("/kakaoSignup");
    } else {
      alert("개인정보 수집 및 이용에 동의해주세요.");
    }
  };

  return (
    <>
      <Container>
        <ConsentBorder>
          <h2>개인정보 수집 및 이용 동의서</h2>
          <ConsentFormContainer>
            <form onSubmit={handleSubmit}>
              <p>[개인정보 수집 및 이용에 대한 동의]</p>
              <p>
                본 동의서는 회원가입 과정에서 아이의 사진, 생일, 이름 정보를
                포함한 개인정보를 수집, 이용하는 데 대한 동의를 구하기
                위함입니다.
              </p>
              <h3>1. 수집하는 개인정보 항목</h3>
              <ul>
                <li>아이의 사진</li>
                <li>아이의 생일</li>
                <li>아이의 이름</li>
              </ul>
              <h3>2. 개인정보의 수집 및 이용 목적</h3>
              <p>
                귀하의 아이에 대한 정보는 다음의 목적을 위해 수집, 이용됩니다:
              </p>
              <ul>
                <li>회원 관리: 본인 확인 절차에 이용</li>
                <li>서비스 제공에 따른 본인 인증, 개인 맞춤 서비스 제공</li>
                <li>기타 새로운 서비스, 이벤트 정보 안내</li>
              </ul>
              <h3>3. 개인정보의 보유 및 이용 기간</h3>
              <p>
                귀하의 개인정보는 서비스 이용 계약 체결 시부터 서비스 이용 계약
                해지 시까지 보유 및 이용됩니다. 단, 관련 법령에 의거하여 보존할
                필요가 있는 경우 일정 기간 동안 개인정보를 보관할 수 있습니다.
              </p>
              <h3>4. 동의 거부 권리 및 동의 거부 시 불이익 내용</h3>
              <p>
                귀하는 위 개인정보의 수집 및 이용에 대한 동의를 거부할 권리가
                있습니다. 다만, 필수적인 개인정보의 수집 및 이용에 대한 동의를
                거부할 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.
              </p>
              <div></div>
            </form>
          </ConsentFormContainer>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="consentCheckbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label htmlFor="consentCheckbox">
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </CheckboxContainer>
          <NextButton onClick={handleSubmit}>다음</NextButton>
        </ConsentBorder>
      </Container>
    </>
  );
}

export default PrivacyConsentForm;
