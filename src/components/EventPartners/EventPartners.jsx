import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './EventPartners.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default function EventPartners() {
  return (
    <>
       <Container>
    <h1>EVENT PARTNERS</h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        autoplay={{
          delay:500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        loop={true}
        modules={[Pagination,Autoplay]}
        className="mySwiper1"
      >
        <SwiperSlide className='partnerSlider'><img style={{width:"100%",height:"100%",marginTop:"15%"}} src="https://res.cloudinary.com/dx78kzenz/image/upload/v1710422677/UNiBIC_1_e2vfvf.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/coca%20cola.png?width=600&height=600&name=coca%20cola.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/Shell_logo.svg.png?width=675&height=626&name=Shell_logo.svg.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/Starbucks_Corporation_Logo_2011.svg.png?width=600&height=608&name=Starbucks_Corporation_Logo_2011.svg.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/Pepsi_logo_2014.svg.png?width=675&height=687&name=Pepsi_logo_2014.svg.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/McDonalds_Golden_Arches.svg.png?width=750&height=657&name=McDonalds_Golden_Arches.svg.png" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://blog.hubspot.com/hs-fs/hubfs/Instagram_logo_2016.svg.webp?width=600&height=600&name=Instagram_logo_2016.svg.webp" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://www.bmw.com/etc.clientlibs/settings/wcm/designs/bmwcom/base/resources/ci2020/img/logo-light.svg" alt=""/></SwiperSlide>
        <SwiperSlide className='partnerSlider'><img src="https://www.doritos.com/sites/doritos.com/themes/doritos/img/logo.gif" alt=""/></SwiperSlide>
      </Swiper>
      </Container>
    </>
  );
}

const Container = styled.div`
h1{
  padding: 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  @media(max-width:768px){
    font-size:16px;
  }
  `
  