import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { json, Link } from 'react-router-dom';
import { Overlay } from "antd/es/popconfirm/PurePanel";
import { InfoCircleFilled, InfoCircleOutlined, PlayCircleFilled, PlayCircleOutlined, PlaySquareFilled } from "@ant-design/icons";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function ShortFlimSlider() {
  
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToshow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [movies, setMovies] = useState([]);
 
 

  
  const getSlider = async() => {
    const res = await axios.get(`${API_URL}/api/short-film-sliders?populate[0]=short_film.MovieThumbnail&populate[1]=short_film.VideoFile`);
    // console.log("ShortFlim Slider CHECK",res.data)
    setMovies(res.data.data);
  }
  useEffect(() => {
    getSlider();
  },[]);



  return (
    <Carousel {...settings}>
      {movies.map((movie) => (
      <Wrap>
           <Info key={movie.id}>
     
           <Subtitle>{movie.attributes.short_film.data.attributes.MovieName}</Subtitle>
      <Link to={'/details/'+movie.attributes.short_film.data.id} onClick={() => window.scrollTo(0, 0)} className="movie-link1" >
         <Button1><PlayCircleFilled spin/> Play Now</Button1>
          <Button2><InfoCircleFilled /> More Info</Button2>
           </Link>
           <Description>{movie.attributes.short_film.data.attributes.Description}</Description>
         </Info>
         <Overlays>
           <img src={`${API_URL}${movie.attributes.short_film.data.attributes.MovieThumbnail.data.attributes.url}`} alt="Img" id={movie.id}/>
           </Overlays>
    </Wrap>
           
    ))}
    </Carousel>
  );
}


export default ShortFlimSlider;

const Carousel = styled(Slider)`
//   margin-top: 20px;
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
  object-fit: cover;
  object-position: center center;
    height:80vh;
    @media (max-width: 768px) {
      height:25vh;
    }
  img {
    border: 5px solid transparent;
    opacity: 0.8;
    width:100%;
    height:100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
    // &:hover {
    //   border: 4px solid rgba(249, 249, 249, 0.8);
    // }

  }
`;
const Overlay1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Info = styled.div`
position: absolute;
z-index: 3;
bottom: 0;
margin-bottom: 10px;
margin-left: 20px;
@media (max-width: 768px) {
  // display: none;
}
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
  font-size: 10px;
  margin-right: 3px;
padding: 5px;
}
`;
const Button2 = styled.button`
// margin: 5px;
padding: 10px;
background-color: #303030;
background:#fba010;
color: #fff;
font-weight: bold;
font-size: 15px;
border-radius: 5px;
cursor: pointer;
@media (max-width: 768px) {
  margin: 0px;
  font-size: 10px;
padding: 5px;
}
`;

const Subtitle = styled.h2`
  color: #fff;
  font-size: 32px;
  margin-bottom: 10px;
  text-transform: uppercase;
  opacity:0.8;
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
    font-size: 10px;
  }
`;