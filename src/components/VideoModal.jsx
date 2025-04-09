// VideoModal.js
import { notification } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const user = localStorage.getItem("UserId");
const Token = localStorage.getItem("JwtToken");
const API_URL = process.env.REACT_APP_API_URL;


Modal.setAppElement('#root');

const VideoModal = ({ showModal, handleClose }) => {
  
  if(localStorage.getItem('redirect')){
    localStorage.removeItem('redirect')
    // window.location.reload();
  }

  const [isParticipated,setIsParticipated] = useState(false);
  const [isPaid,setIsPaid] = useState(false);
  const [contestDetails,setContestDetails] = useState(0);
  const navigate = useNavigate();

  const IsApplied = async() =>{
    if(user){

      try{
        const response = await axios.get(`${API_URL}/api/users/${user}?populate=contest,contest.MovieThumbnail,contest.MoviePoster,contest.VideoFile`);
        console.log(response);
        if(response.data.contest){
          setIsParticipated(true);
          setContestDetails(response.data.contest);
          localStorage.setItem('formId',response.data.contest.id);
          if(response.data.contest.Payment=='Paid'){
            notification.error({
              message: 'Upload Error',
              description: 'You Already Participated In The Contest',
              placement:'top'
            });
          }else{
            navigate('/Contest');
          }
          if(response.data.contest.MovieThumbnail && response.data.contest.MoviePoster && response.data.contest.VideoFile){
            // setIsUploaded(true);
            // console.log('uploaded')
            setIsParticipated(true);
          }else{
            // console.log('uploaded not')
            // setIsUploaded(false);
            setIsParticipated(false);
          }
        }else{
          navigate('/Contest');
        }
      }catch(err){
        console.error(err);
      }

      
    }else{
      localStorage.setItem('redirect','/Contest');
      navigate('/login')
    }
  }
  // useEffect(() => {
  //   IsApplied();
  // },[user]);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleClose}
      style={{
        content: {
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          height:'auto',
          width:'auto',
          background: 'rgba(0, 0, 0, 0.75)',
          zIndex:'10'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex:'10'
        },
      }}
    >
      <VideoContainer>
        <img
        src='https://api.moviemads.com/uploads/updated_a61fce118c.jpg'
        alt='Moviemads Invitation'
        />

       <button className='glowing-btn1' onClick={IsApplied} >Click here to Register</button>
      
      </VideoContainer>
    </Modal>
  );
};

export default VideoModal;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction:column;
  // gap:10px;
  overflow: hidden;
  min-width: 100%;
  background: black;
    border: 4px solid rgba(255, 0, 0, 0.315);
    img{
      width: 400px;
      height: auto;
      object-fit: cover;
    }
    @media (max-width: 768px) {
      img{
        width: 300px;
      }
    }

`;
