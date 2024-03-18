import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { json, Link } from 'react-router-dom';
import { Overlay } from "antd/es/popconfirm/PurePanel";
import { InfoCircleFilled, InfoCircleOutlined, PlayCircleFilled, PlayCircleOutlined, PlaySquareFilled } from "@ant-design/icons";
import './MovieTrailers.css'
function MovieSlider() {
  
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToshow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [movies, setMovies] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhOWQ1NDA4YjVhYmEwMjNjZjdiMDE2ZmJmNjc2NiIsInN1YiI6IjY1ZTAyZTVhMmQ1MzFhMDE4NWJmYWY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTjTU9CcYJYFqqwWS6mALcPpRaT5MykGbaYm3CHep9A'
    }
  };
  const getSlider = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US', options)
    .then(response => response.json())
    .then(json => setMovies(json.results))
    .catch(err => console.error(err));
  }
  console.log("Slider",movies)
  useEffect(() => {
    getSlider();
  },[]);



  return (
    <Carousel {...settings}>
      {/* {movies.map((movie) => (
        <Wrap>
             <Info key={movie.id}>
       
        <Link to={'/details/'+movie.id} onClick={() => window.scrollTo(0, 0)} className="movie-link1" >
         <Button1><PlayCircleFilled spin/> Play Now</Button1>
            <Button2><InfoCircleFilled /> More Info</Button2>
             </Link>
             <Subtitle>{movie.original_title}</Subtitle>
             <Description>{movie.overview}</Description>
           </Info>
           <Overlays>
             <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="Img" id={movie.id}/>
             </Overlays>
      </Wrap>
             
      ))} */}

      <Wrap>
          <Info>
            <Subtitle>LEO</Subtitle>
            <Button1><PlayCircleFilled spin/> Play Now</Button1>
            <Button2><InfoCircleFilled /> More Info</Button2>
            <Description>Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains attention from a drug cartel claiming he was once a part of them</Description>
          </Info>
          <img src="/images/Leo.jpg" alt="" />
      </Wrap>
      <Wrap>
          <Info>
            <Subtitle>JAILER</Subtitle>
            <Button1><PlayCircleFilled spin/> Play Now</Button1>
            <Button2><InfoCircleFilled /> More Info</Button2>
            <Description>A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker place. Can he emerge from this complex situation successfully?</Description>
          </Info>
          <img src="/images/Jailer.jpeg" alt="" />
      </Wrap>
      <Wrap>
          <Info>
            <Subtitle>VIKRAM</Subtitle>
            <Button1><PlayCircleFilled spin/> Play Now</Button1>
            <Button2><InfoCircleFilled /> More Info</Button2>
            <Description>A special investigator discovers a case of serial killings is not what it seems to be, and leading down this path is only going to end in a war between everyone involved.</Description>
          </Info>
          <img src="/images/vikram.jpg" alt="" />
      </Wrap>
      <Wrap>
          <Info>
            <Subtitle>BLUE STAR</Subtitle>
            <Button1><PlayCircleFilled spin/> Play Now</Button1>
            <Button2><InfoCircleFilled /> More Info</Button2>
            <Description>The cricket captains of Arakkonam, Ranjith and Rajesh, ignite a rivalry that ruins their chances of playing when politics interferes</Description>
          </Info>
          <img src="/images/Bluestar.jpg" alt="" />
      </Wrap>
    </Carousel>
  );
}


export default MovieSlider;

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
      height:30vh;
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
    font-size: 12px;
    margin-right: 10px;
  padding: 5px;
  }
`;
const Button2 = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #303030;
  background:#fba010;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 0px;
  padding: 5px;
  font-size: 12px;
  }
`;

const Subtitle = styled.h2`
  color: #fff;
  font-size: 32px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 5px;
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