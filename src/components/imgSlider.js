import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToshow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
          <Info>
            <Button1>Play Now</Button1>
            <Button2>More Info</Button2>
            <Subtitle>Greatest of all time(GOAT)</Subtitle>
            <Description>Upcoming Release of Thalapathy Vijay</Description>
          </Info>
          <img src="/images/GOAT.webp" alt="" />
      </Wrap>

      <Wrap>
          <Info>
            <Button1>Play Now</Button1>
            <Button2>More Info</Button2>
            <Subtitle>VETTAIYAN</Subtitle>
            <Description>Upcoming Release of Superstar Rajinikanth.</Description>
          </Info>
          <img src="/images/Vattaiyan.webp" alt="" />
      </Wrap>

      <Wrap>
          <Info>
            <Button1>Play Now</Button1>
            <Button2>More Info</Button2>
            <Subtitle>KANGUVA</Subtitle>
            <Description>Upcoming Release of Actor Surya Sivakumar</Description>
          </Info>
          <img src="/images/kanguva-1.jpg" alt="" />
      </Wrap>

      <Wrap>
          <Info>
            <Button1>Play Now</Button1>
            <Button2>More Info</Button2>
            <Subtitle>THANGALAAN</Subtitle>
            <Description>Upcoming Release of Actor Chiyaan Vikram.</Description>
          </Info>
          <img src="/images/chiyaan-sixteen_nine.jpg" alt="" />
      </Wrap>
    </Carousel>
  );
}

export default ImgSlider;
const Carousel = styled(Slider)`
  margin-top: 20px;

  ul li Button &:before {
    font-size: 10px;
    color: rgb(150, 158, 171);
  }

  li.slick-active Button1::before {
    color: white;
  }
  .slick-list {
    overflow: visible;
  }

  Button {
    z-index: 1;
  }
`;

const Wrap = styled.div`
  position: relative; /* To position the Button1s and information */
  cursor: pointer;
  width:80vw;
    height:70vh;
  img {
    border: 5px solid transparent;
    width:100%;
    height:100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

const Info = styled.div`

position: absolute;
z-index: 3;
bottom: 0;
margin-bottom: 10px;
margin-left: 20px;
`;

const Button1 = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #e50914;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;
const Button2 = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #303030;
  background:transparent;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

`;

const Subtitle = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #fff;
  font-size: 18px;
`;