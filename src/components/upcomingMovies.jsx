import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { json, Link } from 'react-router-dom';
import movies from '../movies.js';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css';
// import required modules
import { EffectCoverflow, Grid, Navigation, Pagination, Scrollbar, Virtual } from 'swiper/modules';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL,'API URL')
const UpcomingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [seoData, setSeoData] = useState(null);

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
    const getMovies = async() => {
      
      const res = await axios(`${API_URL}/api/movies?populate=*`,options);
      console.log("STARPI CHECK",res.data)
      setMovies(res.data.data);
      setSeoData()
    }
    console.log("Movies checck",movies)
    useEffect(() => {
      getMovies();
    },[]);
      return (
          <Container>

              <h1>POPULAR MOVIES</h1>
              <Swiper
        modules={[ Navigation, Pagination,Grid]}
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          // when window width is <= 768px
          768: {
            slidesPerView: 6,
          },
        }}
        className="mySwiper"
      >
                {movies.map((movie) => (
                        <SwiperSlide  key={movie.id}>
                            <Link to={'/details/'+movie.id} onClick={() => window.scrollTo(0, 0)} className="movie-link" >
                            <div className="movie-container">
                                <img src={`${API_URL}${movie.attributes.MoviePoster.data.attributes.url}`} alt="Img" id={movie.id}/>
                            <div className="overlay">
                                <p className="movie-name">{movie.attributes.MovieName}</p>
                            </div>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
                 </Swiper>
          </Container>
      )
}

export default UpcomingMovies

const Container = styled.div`
h1{
  padding: 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  @media(max-width:768px){
    font-size:16px;
  }
}`;

const Content = styled.div`
cursor: pointer;
height: 90%;
width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    height: 100%;
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;

    border-color: rgba(249, 249, 249, 0.8);
  }
`;