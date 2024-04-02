import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { json, Link } from 'react-router-dom';
import { Overlay } from "antd/es/popconfirm/PurePanel";
import { InfoCircleFilled, InfoCircleOutlined, PlayCircleFilled, PlayCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
const API_URL = process.env.REACT_APP_API_URL;
function ImgSlider() {
 
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToshow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    method: 'GET',
    // headers: {
    //   accept: 'application/json',
    //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhOWQ1NDA4YjVhYmEwMjNjZjdiMDE2ZmJmNjc2NiIsInN1YiI6IjY1ZTAyZTVhMmQ1MzFhMDE4NWJmYWY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTjTU9CcYJYFqqwWS6mALcPpRaT5MykGbaYm3CHep9A'
    // }
    headers:{
      "ngrok-skip-browser-warning": true,
      'Access-Control-Allow-Origin': '*',
  }
  };

  
  const getSlider = async() => {
    
    const res = await axios(`${API_URL}/api/sliders?populate[0]=movie.MovieThumbnail&populate[1]=movie.VideoFile`,options);
    console.log("STARPI CHECK",res.data)
    setMovies(res.data.data);
    setLoading(false);
  }
  console.log("Slider checck",movies)
  useEffect(() => {
    getSlider();
  },[]);



  return (

    <Carousel {...settings}>
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonWrapper key={index}>
            <SkeletonAvatar active   />
          </SkeletonWrapper>
        ))
      ) : (
        movies.map((movie) => (
          <Wrap key={movie.id}>
            <Info>
              <Subtitle>{movie.attributes.movie.data.attributes.MovieName}</Subtitle>
              <Link to={'/details/' + movie.attributes.movie.data.id} onClick={() => window.scrollTo(0, 0)} className="movie-link1">
                <Button1><PlayCircleFilled spin /> Play Now</Button1>
                <Button2><InfoCircleFilled /> More Info</Button2>
              </Link>
              <Description>{movie.attributes.movie.data.attributes.Description}</Description>
            </Info>
            <Overlays>
              <img src={`${API_URL}${movie.attributes.movie.data.attributes.MovieThumbnail.data.attributes.url}`} alt="Img" id={movie.id} />
            </Overlays>
          </Wrap>
        ))
      )}
    </Carousel>
  );
}

export default ImgSlider;
const Carousel = styled(Slider)`
  ul li Button &:before {
    font-size: 10px;
    color: rgb(150, 158, 171);
  }

  .slick-next:before {
   color: #ff0015;
   font-size: 40px;
   font-weight: bold;
   opacity: 100%;
  }
  .slick-prev:before {
    color: #ff0015;
    font-size: 40px;
    font-weight: bold;
    opacity: 100%;
  }
  @media (max-width: 768px) {
    .slick-next:before{
      display: none;
    }
    .slick-prev:before{
      display: none;
    }
  }
    
  li.slick-active Button1::before {
    color: white;
    display: none;
  }
  .slick-list {
    overflow: visible;
  }

  Button {
    z-index: 1;
  }
`;

const SkeletonWrapper = styled.div`
  margin: 20px;
`;

const Wrap = styled.div`
  position: relative; /* To position the Button1s and information */
  
&:after {
  content: "";
  position: absolute;
  width: 100%; /* Adjust width as needed */
  height: 45%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0)0%, #000000 100%);
  bottom: 0;
  right: 0;
  pointer-events: none;
  @media (max-width: 768px) {
    height: 70%;
  }
}

  cursor: pointer;
    height:80vh;
    @media (max-width: 768px) {
      height: 25vh;
    }
  img {
    border: 5px solid transparent;
    width:100%;
    height:100%;
    object-fit: cover;
    border-radius: 10px;
    opacity: 0.8;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
  }
`;

const Info = styled.div`

position: absolute;
z-index: 3;
bottom: 0;
left: 0;
padding-left: 20px;
padding-top: 10px;
`;

const Button1 = styled.button`
padding: 10px;
background-color: #ff0015;
color: #ffffff;
border-radius: 5px;
font-size: 15px;
font-weight: bold;
cursor: pointer;
@media (max-width: 768px) {
  margin: 0px;
  font-size: 8px;
  margin-right: 3px;
padding: 5px;
}
`;
const Button2 = styled.button`
  // margin: 5px;
  padding: 10px;
  // background-color: #303030;
  background:#fba010;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 0px;
    font-size: 8px;
   
  padding: 5px;
  }
`;

const Subtitle = styled.h2`
  color: #fff;
  font-size: 32px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 1px;
  }
`;
const Overlays = styled.div`
background: rgba(0, 0, 0, 0.9);
width: 100%;
height: 100%;
`;

const Description = styled.p`
  color: #fff;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 8px;
    z-index: 10;
  }
`;