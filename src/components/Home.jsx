import styled from "styled-components";
import React, { useEffect } from "react";
import Viewers from "./Viewers";
import Movies from "./Movies";
import ImgSlider from "./imgSlider";
import Footer from "./Footer/Footer";
import UpcomingMovies from "./upcomingMovies";
import Topnav from "./TopNav/Topnav";
import TopRated from "./TopRated";
import EventPartners from "./EventPartners/EventPartners";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import MovieReviews from "./MovieReviews";

function Home() {
  const user = localStorage.getItem("User");
  
  return (
    <>
    {user?(
      <div>
    <Container>
      <ImgSlider />
      <UpcomingMovies/>
      <TopRated/>
      <Viewers />
      {/* <Movies /> */}
      <MovieReviews/>
      <EventPartners/>
    </Container>
      <Footer/>
      </div>
      ):
      <Login />}
  </>
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
  &:before {
    // background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  h1{

  }
`;
