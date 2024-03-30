import React, { useState, useEffect } from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const Footer = () => {
  const navigate = useNavigate();
  const [footers, setFooters] = useState(null);
  const [Logo, setLogo] = useState(null);

  const homePage = () => {
    navigate("/home")
  }
  const movieTrailer = () => {
    navigate("/movieTrailer")
  }
  const shortFilms = () => {
    navigate("/shortFilms")
  }
  const Awards = () => {
    navigate("/awards")
  }
  const Reviews = () => {
    navigate("/reviews")
  }

  
  const options = {
    method: 'GET',
    headers:{
      "ngrok-skip-browser-warning": true,
      'Access-Control-Allow-Origin': '*',
  }
  };
 

 useEffect(() => {
  const getFooter = async () => {
    try {
      const res = await axios(`${API_URL}/api/footer?populate=*`, options);
      console.log("Footer CHECK", res.data);
      setFooters(res.data.data.attributes.footer);
       setLogo(res.data.data.attributes.Logo.data.attributes.url);
    } catch (error) {
      console.error("Error fetching footer:", error);
    }
  };
  console.log(footers,"footers")

  getFooter();
}, []);

  return (
    <>
<footer class="footer">
{footers && (
          <>
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About the company</span> 
      {footers.About}
    </p>
    <div class="icons">
      <a href={footers.Facebook}><i class="fa fa-facebook"></i></a>
      <a href={footers.Instagram}><i class="fa fa-instagram"></i></a>
      <a href={footers.Youtube}><i class="fa-brands fa-youtube"></i></a>
      <a href={footers.Twitter}><i class="fa-brands fa-x-twitter"></i></a>
      <a href={footers.LinkiedIn}><i class="fa fa-linkedin"></i></a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
    <div>
      <i class="fa fa-map-marker"></i>
      <p><span> {footers.Address1}</span> {footers.Address2}</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+91) {footers.phone}</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p><a href="#"> {footers.Email}</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <img class="Footer-logo" src={`${API_URL}${Logo}`}/>
    <p class="menu">
      <a onClick={homePage}> Home</a> | &nbsp;
      <a onClick={movieTrailer}> Movie Trailers </a> | &nbsp;
      <a onClick={shortFilms}> Short Films</a> | &nbsp;
      <a onClick={Awards}> Awards</a> | &nbsp;
      <a onclick={Reviews}> Reviews</a>
    </p>
    <p class="name" >  &copy; 2024 All rights reserved by{' '}<span style={{fontWeight: "bold"}}><a style={{color: "#e50914",textDecoration: "none",fontWeight: "bold"}} href='http://www.moviemads.com/'>MOVIEMADS</a></span></p>
    <br/>
    <p class="name">  Designed By{' '}<span ><a style={{color: "#e50914", textDecoration: "none",fontWeight: "bold"}} href='http://www.jgntechnologies.com/'>JGN TECHNOLOGIES</a></span></p>
  </div>
  </>)}
</footer>
    </>
  )
}

export default Footer