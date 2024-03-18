import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { json, Link } from 'react-router-dom';
import { selectMovies } from '../features/movie/movieSlice';
import { useSelector } from 'react-redux';
import movies from '../movies.js';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
// import required modules
import { EffectCoverflow, Grid, Navigation, Pagination, Scrollbar, Virtual } from 'swiper/modules';


function YouMayLike() {
  const [movies, setMovies] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhOWQ1NDA4YjVhYmEwMjNjZjdiMDE2ZmJmNjc2NiIsInN1YiI6IjY1ZTAyZTVhMmQ1MzFhMDE4NWJmYWY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTjTU9CcYJYFqqwWS6mALcPpRaT5MykGbaYm3CHep9A'
    }
  };
  const getMovies = () => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5e1a9d5408b5aba023cf7b016fbf6766&with_original_language=ta', options)
    .then(response => response.json())
    .then(json => setMovies(json.results))
    .catch(err => console.error(err));
  }
  console.log("hello",movies)
  useEffect(() => {
    getMovies();
  },[]);
  
    return (
        <Container>
            <h1>You May Also Like  </h1>
            <Swiper
        modules={[ Navigation, Pagination,Grid]}
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={20}
        // pagination={{
        //   type: 'fraction',
        // }}
        breakpoints={{
          // when window width is <= 768px
          768: {
            slidesPerView: 6,
          },
        }}
        navigation={true}
      >
                {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={'/details/'+movie.id} onClick={() => window.scrollTo(0, 0)} className="movie-link" >
                            <div className="movie-container">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Img" id={movie.id}/>
                            <div className="overlay">
                                <p className="movie-name">{movie.title}</p>
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

export default YouMayLike;

const Container = styled.div`
padding: 10px 30px;
h1{
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}
`;

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