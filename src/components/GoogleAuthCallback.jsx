import React, { useState, useEffect } from 'react'
import { Navigate,useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Home from './Home';
import App from '../App';
import Login from './Login';
import MovieTrailers from './MovieTrailers/MovieTrailers';
const API_URL = process.env.REACT_APP_API_URL;
function GoogleAuthCallback() {
  const [auth, setAuth] = useState()
  const [jwt, setJwt] = useState()
  const location = useLocation()
  const navigate = useNavigate();
  const id_token = useParams();
  useEffect(() => {
    if (!location) {
      return
    }
    const { search } = location
    axios({
        method: 'GET',
        url: `${API_URL}/api/auth/google/callback?${search}`,
        headers: {
          "ngrok-skip-browser-warning": true,
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((res) =>  res.data)
      .then(setAuth)
    },[location] )
    console.log(JSON.stringify(auth),'auth')
    localStorage.setItem('User',auth)
    const jwtToken = auth?.jwt

    localStorage.setItem('UserId',auth?.user.id)
    localStorage.setItem('EmailId',auth?.user.email)
    localStorage.setItem('JwtToken',jwtToken)
    console.log(jwtToken,'token');
    navigate("/");
}



export default GoogleAuthCallback