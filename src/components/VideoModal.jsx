// VideoModal.js
import React from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

Modal.setAppElement('#root');

const VideoModal = ({ showModal, handleClose }) => {
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
          width: '80%',
          maxWidth: '800px',
          padding: '0',
          background: 'rgba(0, 0, 0, 0.75)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <VideoContainer>
      <ReactPlayer
          url='https://api.moviemads.com/uploads/Trophy_09829cd62f.mp4'
          width='100%'
          height='auto'
          controls={true}
          muted={true}
          loop={true}
          playing={true}
        />
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
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: black;
    border: 4px solid rgba(255, 0, 0, 0.315);
`;
