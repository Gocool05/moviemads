import styled from "styled-components";
import React, { useEffect } from "react";
import Viewers from "./Viewers";
import Movies from "./Movies";
import db from "../firebase";
import {useDispatch} from "react-redux"
import { setMovies } from "../features/movie/movieSlice";
import ImgSlider from "./imgSlider";
import Footer from "./Footer/Footer";
import UpcomingMovies from "./upcomingMovies";
import Topnav from "./TopNav/Topnav";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      let tempMovies = snapshot.docs.map((doc) => {
        console.log(doc.data());
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setMovies(tempMovies));
    });
  },[]);
  return (
    <>
    <Container>
      <ImgSlider />
      <UpcomingMovies/>
      <h1 style={{padding:"30px 0px"}}>SHORT FILM AWARDS</h1>
      <Viewers />
      <Movies />
    </Container>
      <Footer/>
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
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
