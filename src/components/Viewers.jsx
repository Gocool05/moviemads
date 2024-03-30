import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";

const Viewers = (props) => {
  const vidRef = useRef();
  useEffect(() => {
    vidRef.current.play();
  }, []);
  return (
    <Container>
      <Wrap>
        <h1>BEST DIRECTOR AWARD</h1>
        <video
          src="/videos/coming.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
      <h1>BEST ACTOR AWARD</h1>
        <video
          src="/videos/award1.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
      <h1>BEST SCREENPLAY</h1>
        <video
          src="/videos/award4.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
        <h1>BEST STORY AWARD</h1>
        <video
          src="/videos/award3.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
      <Wrap>
      <h1>BEST ACTRESS AWARD</h1>
        <video
          src="/videos/award2.mp4"
          type="video/mp4"
          ref={vidRef}
          muted
          autoPlay
          loop
        />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  // margin-top: 30px;
  // padding: 30px 0px 26px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  h1{
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    text-align: center;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 60%;
    bottom: 0;
    // font-size: 24px;
    left: 50%;
    transform: translate(-50%, -50%);
   
    @media (max-width: 1250px) {
      font-size: 25px;
      @media (max-width: 468px) {
        font-size: 18px;
      }
    }
  }
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    h1{
      display: none;
    }
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`;

export default Viewers;
