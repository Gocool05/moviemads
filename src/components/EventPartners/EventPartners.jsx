import React, { useRef, useState,useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './EventPartners.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export default function EventPartners() {
const [partners, setPartners] = useState([]);


const getSponsers = async() => {
  try{
    const res = await axios.get(`${API_URL}/api/event-partners?populate=*`,);
    setPartners(res.data.data);
  }catch(err){
    console.error(err);
  }
}

 
  useEffect(() => {
    getSponsers();
  },[]);

  return (
    <>
       <Container>
    <h1>EVENT PARTNERS  <span>&#8702;</span> </h1>
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
      >      {partners.map((partner) => (
        <SwiperSlide className='partnerSlider' key={partner.id}><img src={`${API_URL}${partner.attributes.Image.data.attributes.url}`} alt="Img" id={partner.id}/></SwiperSlide>
        ))}
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
  color: #fff;
  cursor: pointer;
  span{
    opacity:0;
    font-size:1.5rem;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    display: inline-block;
    transform: translateX(-25px);
  }
  &:hover{
    color:#e50914;
    span{
        opacity:1;
    transform: translateX(5px);
      }
  }
}
  @media(max-width:768px){
    font-size:16px;
  }
}`;