import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper 모듈 사용 초기화
SwiperCore.use([Pagination, Navigation]);

const Tutorial = () => {
  return (
    <CarouselContainer>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true} // navigation을 true로 설정하여 내장 네비게이션 버튼을 활성화
        pagination={{ clickable: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <SwiperSlide>
          <SlideImage src="path/to/image1.jpg" alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <SlideImage src="path/to/image2.jpg" alt="Image 2" />
        </SwiperSlide>
        <SwiperSlide>
          <SlideImage src="path/to/image3.jpg" alt="Image 3" />
        </SwiperSlide>
        {/* 추가적인 SwiperSlide를 여기에 넣을 수 있습니다. */}
      </Swiper>
    </CarouselContainer>
  );
};

// 스타일드 컴포넌트를 사용한 스타일 정의
const CarouselContainer = styled.div`
  width: 100%;
  height: 500px; // 캐러셀의 높이를 조절하려면 이 값을 변경하세요.
  .swiper-button-next,
  .swiper-button-prev {
    color: #000;
  }
  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지 비율을 유지하면서 슬라이드에 꽉 차게 표시
`;

export default Tutorial;
