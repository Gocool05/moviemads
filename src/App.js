import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Topnav from "./components/TopNav/Topnav";
import MovieTrailers from "./components/MovieTrailers/MovieTrailers";
import ShortFilms from "./components/ShortFilms/ShortFilms";
import Awards from "./components/Awards/Awards";
import Reviews from "./components/Reviews/Reviews";
import Contest from "./components/Contest/Contest";

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
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Topnav />}
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/movieTrailer" element={<MovieTrailers />} />
        <Route path="/shortFilms" element={<ShortFilms />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contest" element={<Contest />} />
      </Routes>
    </>
  );
}

export default App;
