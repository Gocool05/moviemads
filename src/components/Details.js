import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "antd";

function Details() {
  const [details, setDetails] = useState(null); // Initialize details state as null
  const [loading, setLoading] = useState(true); // Initialize loading state as true
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

  return (
    <>
      {loading ? (
        <div>
          <Skeleton
        avatar
        paragraph={{
          rows: 4,
        }}
      /></div>
      ) : (
        <Container>
          {/* Render details only if it's not null */}
          {details && (
            <>
              <Background>
                <img alt="..." src={`https://image.tmdb.org/t/p/w500/${details?.backdrop_path}`} />
              </Background>
              <ImgTitle>
                <img alt={details?.original_title} src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`} />
              </ImgTitle>
              <Controls>
              <PlayButton>
            <img src="/images/play-icon-black.png" alt="" />
            <span>PLAY</span>
          </PlayButton>
          <TrailerButton>
            <img src="/images/play-icon-white.png" alt="" />
            <span>TRAILER</span>
          </TrailerButton>
              </Controls>
              <Description>{details?.overview}</Description>
            </>
          )}
        </Container>
      )}
    </>
  );
}

export default Details;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding:30px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoadingMessage = styled.div`
  
`;

const ImgTitle = styled.div`
  height: 35vh;
  min-height: 170px;
  min-width: 200px;
  width: auto;
  margin:30px;
  float: left;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
`;

const PlayButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  font-size: 15px;
  padding: 0px 24px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  height: 56px;
  // background-color: rgb(249, 249, 249);
  background-color: #e50914;
  border: none;
  letter-spacing: 1.8px;
  text-transform: uppercase;

  &:hover {
    // background-color: rgb(198, 198, 198);
    background-color: #fba010;
  }
`;

const TrailerButton = styled(PlayButton)`
  background-color: #495057;
  border: 1px solid rgb(249, 249, 249);
  text-transform: uppercase;
  color: rgb(249, 249, 249);
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 50%;
  background-color: rgb(0, 0, 0, 0.6);
  span {
    font-size: 30px;
    color: white;
  }
`;

const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
`;
