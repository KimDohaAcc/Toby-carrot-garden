import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { getEmergencyQuiz } from "../../apis/quizApi";

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
  justify-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

const SubmitArea = styled.div`
  grid-area: button;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RetryBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PhoneBackground = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const PhoneNumber = styled.div`
  position: absolute;
  display: flex;
  top: 18%;
  justify-content: center;
  font-size: 3.5rem;
`;

const PhoneButtonContainer = styled.div`
  display: grid;
  position: absolute;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  bottom: 5%;
  font-size: 3.5rem;
`;

const PhoneButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px 0 25px;
  cursor: pointer;
`;

const ErrorModal = styled.div`
  border: 1px solid black;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: white;
  z-index: 10;
`;

const ModalCloseBtn = styled.div`
  position: absolute;
  bottom: 0;
  cursor: pointer;
`;

const carrotModalani = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

const GetCarrotModal = styled.img`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 80%;
  z-index: 10;
  animation: ${carrotModalani} 2s linear none;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const AudioBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryEmergency = ({ index }: { index: number }) => {
  const [numList, setNumList] = useState(() => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"];
    return list;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCarrotModalOpen, setIsCarrotModalOpen] = useState(false);

  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  console.log(index);

  const [number, setNumber] = useState("");

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleBtnClick = (e) => {
    const newNumber = number + e;
    if (newNumber.length > 3) {
      setIsModalOpen(true);
    } else {
      setNumber(newNumber);
    }
  };

  const submit = async () => {
    try {
      const response = await getEmergencyQuiz({ place_id: 2 });
      console.log(response);
      openCarrotModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openCarrotModal = () => {
    setIsCarrotModalOpen(true);
    /* setTimeout(() => {
      setIsCarrotModalOpen(false);
    }, 4000); */
  };

  return (
    <EmergencyContainer>
      <EmergencyTitle>번호를 눌러주세요 이미지</EmergencyTitle>
      <EmergencyContent>
        <PhoneBackground src="/Image/modal/phone.png" alt="phone" />
        <PhoneNumber>{number}</PhoneNumber>
        {isModalOpen && (
          <ErrorModal>
            <div>정답은 세글자 입니다</div>
            <ModalCloseBtn
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              닫기
            </ModalCloseBtn>
          </ErrorModal>
        )}
        {isCarrotModalOpen && (
          <GetCarrotModal
            src="/Image/toby/carrotRabbit.png"
            alt="carrotRabbit"
          />
        )}
        <PhoneButtonContainer>
          {numList.map((num) => {
            return (
              <PhoneButton
                key={num}
                onClick={() => {
                  handleBtnClick(num);
                }}
              >
                {num}
              </PhoneButton>
            );
          })}
        </PhoneButtonContainer>
        <AudioPlayer ref={audioRef} controls preload="metadata" hidden>
          <source src={sceneList[index].voice} type="audio/mpeg" />
        </AudioPlayer>
        <AudioBtn onClick={handlePlay}>재생</AudioBtn>
      </EmergencyContent>
      <SubmitArea>
        <RetryBtn
          onClick={() => {
            setNumber("");
          }}
        >
          다시 입력
        </RetryBtn>
        {number.length > 2 ? (
          <SubmitBtn
            onClick={() => {
              submit();
            }}
          >
            전화걸기
          </SubmitBtn>
        ) : (
          <SubmitBtn>번호를 입력하세요</SubmitBtn>
        )}
      </SubmitArea>
    </EmergencyContainer>
  );
};

export default StoryEmergency;
