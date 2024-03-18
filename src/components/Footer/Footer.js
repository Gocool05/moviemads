import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate();

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
  return (
    <>
<footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About the company</span> MovieMads is Film marketing & promotion that is carried out pre-release of the film. The film is a product that has to be showcase to the audience and productively doing  where the marketing for the film comes into play. It combines several way of communication that involve promotion, Branding, social media campaigns, press releases, etc. to reach the audience. All these ways are at the ejection of the producer to get a massive reach. Moviemads is well-Design campaign a film to make success.
    </p>

    <div class="icons">
      <a href="https://www.facebook.com/people/Movie-mads/100088595811792/"><i class="fa fa-facebook"></i></a>
      <a href="https://www.instagram.com/moviemadsindia/"><i class="fa fa-instagram"></i></a>
      <a href="https://www.youtube.com/@Moviemadsindia"><i class="fa-brands fa-youtube"></i></a>
      <a href="https://twitter.com/moviemadsindia/"><i class="fa-brands fa-x-twitter"></i></a>
      <a href="https://www.linkedin.com/in/movie-mads-53233125b/"><i class="fa fa-linkedin"></i></a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
    <div>
      <i class="fa fa-map-marker"></i>
      <p><span> 332, Arcot Rd, Vadapalani,</span> Chennai, Tamil Nadu 600026</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+91) 9884030207</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p><a href="#"> info@moviemads.com</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <img class="Footer-logo" src="/images/Moviemads Logo.png"/>
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
</footer>
    </>
  )
}

export default Footer