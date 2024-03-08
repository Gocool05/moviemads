import React from 'react'
import styled from 'styled-components'
import './TopNav.css'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';

const { Text } = Typography;
const Topnav = () => {

  const navigate = useNavigate();
  return (
        <Nav>
        <div className="marquee-container">
      <Text strong className="marquee">
      Get ready for an exciting announcement: Moviemads 2024 Short Film Awards are coming soon! Prepare your best short films and stay tuned for more details!
      </Text>
    </div>
        <button class="button-57" role="button" ><span class="text">Contest</span><span onClick={() => navigate("/contest")}>Apply Now</span></button>
        </Nav>
  )
}

export default Topnav

const Nav = styled.div`
  height: 40px;
  background: linear-gradient(45deg, #e50914, #495057, #212529, #e50914);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;

  @-webkit-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  overflow-x: hidden;
  overflow-y: hidden;
`;