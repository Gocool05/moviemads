import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import { Route, BrowserRouter, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Topnav from "./components/TopNav/Topnav";
import MovieTrailers from "./components/MovieTrailers/MovieTrailers";
import ShortFilms from "./components/ShortFilms/ShortFilms";
import Awards from "./components/Awards/Awards";
import Reviews from "./components/Reviews/Reviews";
import Contest from "./components/Contest/Contest";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
import ReviewInfo from "./components/Reviews/ReviewInfo";
import Blogs from "./components/Blogs/Blogs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  // const isLoginPage = location.pathname === '/login';
const user = localStorage.getItem("User");

  return !user?(
    <>
       <Header />
       <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/' element={<Navigate to={'/login' } />} />
      <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
    </Routes>
    </>
  ):(
    <>
      <Topnav/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/details/movieTrailer/:id" element={<Details />} />
        <Route path="/details/review/:id" element={<Details />} />
        <Route path="/review/:id" element={<ReviewInfo />} />
        <Route path="/movieTrailer" element={<MovieTrailers />} />
        <Route path="/shortFilms" element={<ShortFilms />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contest" element={<Contest />} />
      </Routes>
    </>
  );
}

export default App;
