import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";
import Movies from "./Movies";
import { ControlFilled, EyeOutlined,CalendarOutlined,ClockCircleOutlined,HeartOutlined,ShareAltOutlined, HeartTwoTone, HeartFilled, UserAddOutlined } from "@ant-design/icons";
import Footer from "./Footer/Footer";
import YouMayLike from "./YouMayLike";
function Details() {
  const [details, setDetails] = useState(null); // Initialize details state as null
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const [videoId, setVideoId] = useState(null); // State to store YouTube video ID
  const { id } = useParams();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhOWQ1NDA4YjVhYmEwMjNjZjdiMDE2ZmJmNjc2NiIsInN1YiI6IjY1ZTAyZTVhMmQ1MzFhMDE4NWJmYWY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTjTU9CcYJYFqqwWS6mALcPpRaT5MykGbaYm3CHep9A'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
        const responseData = response.data;
        setDetails(responseData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, [id]); // Fetch data whenever id changes

  const handlePlayButtonClick = (videoId) => {
    setShowModal(true);
    setVideoId(videoId);
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoId(null);
  };

  return (
    <>
    <Container>
      {loading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <>
          <Backdrop>
            <img alt="Backdrop" src={`https://image.tmdb.org/t/p/w500/${details?.backdrop_path}`} />
            <PlayButton onClick={() => handlePlayButtonClick(details?.videoId)}>  
              <img src="/images/play-icon-black.png" alt="" />
              {/* <span>PLAY</span> */}
            </PlayButton>
            <Controls>
              <Views> <EyeOutlined /> 152 Views</Views>
              <ReleaseDate><CalendarOutlined /> {details?.release_date}</ReleaseDate>
              <Duration><ClockCircleOutlined /> {details?.runtime} Mins </Duration>
              <Popularity><ShareAltOutlined /> Share</Popularity>
            </Controls>
          </Backdrop>
          
          <DetailsContainer>
            <Title>{details?.original_title}</Title>
            <ActorName><span >Popularity: </span>{details?.popularity} <HeartFilled /></ActorName>
            <ActorName><span>Vote Count: </span>{details?.vote_count} <UserAddOutlined /></ActorName>
            <Description>{details?.overview}</Description>
          </DetailsContainer>
        </>
      )}
      {showModal && <Modal onClose={closeModal} videoId={videoId} />}
    </Container>
      <YouMayLike/>
      <Footer/>
      </>
  );
}

export default Details;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Backdrop = styled.div`
  position: relative;
  flex: 0 0 60%; /* Adjust as needed */
  margin-right: 20px; /* Add some space between backdrop and details */
  max-width: 60%;
  max-height: 50vh;
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
    margin-right: 0px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const PlayButton = styled.button`

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);;
  color: white;
  border: none;
  padding: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
background: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: width 0.3s, height 0.3s;
    z-index: -1;
  }

  &:hover::after {
    width: 200%;
    height: 200%;
  }

`;

const DetailsContainer = styled.div`
  flex: 0 0 40%; /* Adjust as needed */
`;
const Controls = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 20px;
  bottom: 10px;
  right: 10px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const Views = styled.p`
`;

const ReleaseDate = styled.p` 
`;
const Duration = styled.p`
 `;
const Popularity = styled.p`
 `;
const Title = styled.h2`
  margin-bottom: 20px;
`;

const Description = styled.p`
  line-height: 1.4;
`;
const ActorName = styled.p`
  line-height: 1.4;
  span {
    font-weight: bold;
    text-transform: uppercase;
    color: #e50914;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  // width: 70%;
  z-index: 10;
  @media (max-width: 768px) {
    padding: 3px;
  }
  iframe {
    width:750px;
  height: 422px;
  border-color: #e50914;
  @media (max-width: 768px) {
    width: 90vw;
    height: 30vh;
    object-fit: cover;
  }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Modal = ({ onClose, videoId }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* <CloseButton onClick={onClose}>Close</CloseButton> */}
         <iframe
          // src={`https://www.youtube.com/embed/${videoId}`}
          src={`https://www.youtube.com/embed/vzc0SepNqeQ?si=L8eLQW2Hrz729xn-`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ModalContent>
    </ModalBackdrop>
  );
};

