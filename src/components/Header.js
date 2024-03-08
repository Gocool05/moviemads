import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import { LogoutOutlined } from "@ant-design/icons";

function Header() {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/home");
      }
    });
  }, []);
  const signIn = () => {
    // auth.signInWithPopup(provider).then((result) => {
    //   let user = result.user;
    //   dispatch(
    //     setUserLogin({
    //       name: user.displayName,
    //       email: user.email,
    //       photo: user.photoURL,
    //     })
    //   );
      navigate("/home");
    // });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate("/");
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Nav>
      <Logo src="/images/Moviemads Logo.png"></Logo>
      {/* <h1 style={{ color: "Red" }}>MOVIE<span style={{ color: "gold" }}>MADS</span></h1> */}
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
        <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>
        <Menu isOpen={isMenuOpen}>
          <NavMenu>
            <a onClick={() => navigate("/home")}>
              {/* <img src="/images/home-icon.svg" /> */}
              <span>Home</span>
            </a>
            <a onClick={() => navigate("/movieTrailer")}>
              {/* <img src="/images/movie-icon.svg" /> */}
              <span>Movie Trailers</span>
            </a>
            <a onClick={() => navigate("/shortFilms")}>
              {/* <img src="/images/original-icon.svg" /> */}
              <span>Short Flims</span>
            </a>
            <a onClick={() => navigate("/awards")}>
              {/* <img src="/images/series-icon.svg" /> */}
              <span>Awards</span>
            </a>
            <a onClick={() => navigate("/reviews")}>
              {/* <img src="/images/watchlist-icon.svg" /> */}
              <span>Reviews</span>
            </a>
           
          </NavMenu>
          </Menu>
          <LogoutOutlined rotate={-90} style={{fontSize:"20px"}} onClick={signOut} />
        </> 
      )}
    </Nav>
  );
}

export default Header;


const MenuToggle = styled.div`
  display: none; /* Hide toggle button by default */
  cursor: pointer;
  /* Show toggle button only for small screens */
  @media (max-width: 768px) {
    display: block;
    padding: 10px;
  }
`;

// Styles for mobile menu
const Menu = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")}; /* Hide or show menu based on isOpen prop */
  flex-direction: column;
  background: #090b13;
  position: absolute;
  
  top: 75px; /* Adjust according to your header height */
  left: 0;
  width: 100%;
  z-index: 1;

  /* Adjust display for desktop screens */
  @media (min-width: 768px) {
    display: flex; /* Always show menu for desktop screens */
    position: static; /* Reset position for desktop screens */
    background: transparent; /* Adjust background for desktop screens */
    flex-direction: row; /* Display menu items horizontally for desktop screens */
    justify-content: flex-end; /* Align menu items to the right for desktop screens */
    width: auto; /* Adjust width for desktop screens */
    top: auto; /* Reset top position for desktop screens */
  }
`;

const Nav = styled.div`
  height: 75px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  overflow-y: hidden;
  justify-content: space-between;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 150px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    line-height: 40px;
    margin: 25px 0px;
    flex-direction: column;
  }
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
    }

    span {
      font-size: 15px;
      letter-spacing: 1.42px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;


      &:after {
        content: "";
        height: 2px;
        background:#e50914;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin:   center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);

      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
       background: #e50914;
      }
    }
  }
`;

const UserImg = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  :hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;
