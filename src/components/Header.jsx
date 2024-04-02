import React, { useEffect,useState,useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { CiOutlined, LogoutOutlined, MenuOutlined, StarTwoTone, UpOutlined } from "@ant-design/icons";
import Topnav from "./TopNav/Topnav";

const API_URL = process.env.REACT_APP_API_URL;

function Header() {
  // const userPhoto = useSelector(selectUserPhoto);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const user = localStorage.getItem("User");
  var username ;
  if (user){
    username= true
  }
  else{
    username= false
  }
  // useEffect(() => {
  //     if (user) {
  //       dispatch(
  //         setUserLogin({
  //           name: user.username,
  //           email: user.email,
  //           photo: user.photoURL,
  //         })
  //       );
  //       navigate("/home");
  //     }
  //   });

  useEffect(() => {
    // Function to close the menu when clicking outside of it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    localStorage.removeItem("User")
      
    navigate("/login", { replace: true });
     
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <Nav>
      <Logo src="/images/Moviemads Logo.png"></Logo>
      {/* <h1 style={{ color: "Red" }}>MOVIE<span style={{ color: "gold" }}>MADS</span></h1> */}
      {!username ? (
        <LoginContainer>
          <Login  onClick={() =>
          (window.location =`${API_URL}/api/connect/google`)}>Login</Login>
        </LoginContainer>
      ) : (
        <>
        <MenuToggle onClick={toggleMenu}><MenuOutlined style={{fontSize:"24px"}} /></MenuToggle>
        <Menu isOpen={isMenuOpen} ref={menuRef}>
          <NavMenu>
            <a onClick={() => { navigate("/"); handleMenuClick(); }}>
              {/* <img src="/images/home-icon.svg" /> */}
              <span>Home</span>
            </a>
            <a onClick={() => { navigate("/movieTrailer"); handleMenuClick(); }}>
              {/* <img src="/images/movie-icon.svg" /> */}
              <span>Movie Trailers</span>
            </a>
            <a onClick={() => { navigate("/shortfilms"); handleMenuClick(); }}>
              {/* <img src="/images/original-icon.svg" /> */}
              <span>Short Films</span>
            </a>
            <a onClick={() => { navigate("/awards"); handleMenuClick(); }}>
              {/* <img src="/images/series-icon.svg" /> */}
              <span>Awards</span>
            </a>
            <a onClick={() => { navigate("/reviews"); handleMenuClick(); }}>
              {/* <img src="/images/watchlist-icon.svg" /> */}
              <span>Reviews</span>
            </a>
          <a className="sign-out" style={{cursor:"pointer"}} onClick={signOut}>SIGN<LogoutOutlined rotate={-90}  style={{fontSize:"20px",color:"red"}} /> UT </a>
          </NavMenu>
          </Menu>
        </> 
         )}  
    </Nav>
    </>
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
  z-index: 9;

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
