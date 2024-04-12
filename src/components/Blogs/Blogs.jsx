import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { json, Link } from 'react-router-dom';
import './Blogs.css'
import Footer from '../Footer/Footer.jsx'
import { ConfigProvider, Modal, Pagination, Typography } from 'antd';
import axios from 'axios';
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Token = localStorage.getItem("JwtToken");
const API_URL = process.env.REACT_APP_API_URL;
const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(1);
  const [current1, setCurrent1] = useState(1);
  const [current2, setCurrent2] = useState(1);
  const [pageSize] = useState(6);
  const [pageSize1] = useState(6);
  const [pageSize2] = useState(12);



  const [directorBytes, setDirectorBytes] = useState([]);
  const [studentBytes, setStudentBytes] = useState([]);
  const [miniBytes, setMiniBytes] = useState([]);
  const [noMovie, setNoMovie] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  
const option1 = {
  headers: {
  'Authorization':`Bearer ${Token}`
  },
  };
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  


  const getDirectorbytes = async() => {
    try{
      const res = await axios.get(`${API_URL}/api/director-bytes?populate[0]=byte.Thumbnail&populate[1]=byte.Poster`,option1);
      setDirectorBytes(res.data.data);
    }
    catch(err){
      console.error(err);
    }
  }
  const getstudentbytes = async() => {
    try{
      const res = await axios.get(`${API_URL}/api/college-bytes?populate[0]=byte.Thumbnail&populate[1]=byte.Poster`,option1);
      setStudentBytes(res.data.data);
    }
    catch(err){
      console.error(err);
    }
  }
  const getMinibytes = async() => {

    try{
      const res = await axios.get(`${API_URL}/api/mini-bytes?populate[0]=byte.Thumbnail&populate[1]=byte.Poster`,option1);
      setMiniBytes(res.data.data);
    }catch(err){
      console.error(err);
    }
  }
    useEffect(() => {
      getDirectorbytes();
      getstudentbytes();
      getMinibytes();
    },[]);

  const filteredMovies = directorBytes.filter(movie => {
    if (searchQuery && !movie.attributes.byte.data.attributes.caption.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  const currentPageMovies = filteredMovies.slice((current - 1) * pageSize, current * pageSize);

  const onChange = (page) => {
    setCurrent(page);
  };


/////////////////////////////
  const filteredMovies1 = studentBytes.filter(movie => {
    if (searchQuery1 && !movie.attributes.byte.data.attributes.caption.toLowerCase().includes(searchQuery1.toLowerCase())) {
      return false;
    }
    return true;
  });
  const currentPageMovies1 = filteredMovies1.slice((current1 - 1) * pageSize1, current1 * pageSize1);

  const onChange1 = (page) => {
    setCurrent1(page);
  };

  ////////////////////////////////////
  const filteredMovies2 = miniBytes.filter(movie => {
    if (searchQuery2 && !movie.attributes.byte.data.attributes.caption.toLowerCase().includes(searchQuery2.toLowerCase())) {
      return false;
    }
    return true;
  });
  const currentPageMovies2 = filteredMovies2.slice((current2 - 1) * pageSize2, current2 * pageSize2);

  const onChange2 = (page) => {
    setCurrent2(page);
  };

  return (
        <Container>
      <Toolbar>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "10px",
          }}
        >
           DIRECTORS BYTES 
        </p>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Toolbar>

      {!noMovie? (<Content>
      {currentPageMovies.map((movie) => (
          <div key={movie.id}>
             <Modal
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null} // If you don't want a footer in the modal
              >
               <iframe  src={movie.attributes.byte.data.attributes.YoutubeEmbedCode} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </Modal>
              <Link onClick={handleOpenModal}>
              <div className="movieTrailers-container">
              <img src={`${API_URL}${movie.attributes.byte.data.attributes.Thumbnail.data.attributes.url}`} alt="Img" id={movie.id}/>
                <div className="Movietrailers-overlay">
                  <p className="movieTrailers-title">{movie.attributes.byte.data.attributes.caption}</p>
                </div>
              </div>
              </Link>
          </div>
        ))}
      </Content>):(
        <h1>Movie Not Found</h1>
      )}
      <PaginationWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e50914",
            colorText: "#ffffff",
            colorIcon: "#e50914",
          },
          components: {
            Pagination: {
              colorPrimary: "#e50914",
              itemSize: "42px",
              fontSize: "22px",
              borderRadius: "20px",
              colorBgTextHover: "#e50914",
            },
          },
        }}
      >
        <Pagination
          className="pagination"
          size="small"
          current={current}
          onChange={onChange}
          total={filteredMovies.length}
          showSizeChanger={false}
          pageSize={pageSize}
        />
      </ConfigProvider>
      </PaginationWrapper>
      
{/*                //////////////////////////////////////////////     */}

      <Toolbar>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "10px",
          }}
        >
           COLLEGE BYTES
        </p>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery1}
          onChange={(e) => setSearchQuery1(e.target.value)}
        />
      </Toolbar>

      <Content>
      {currentPageMovies1.map((movie) => (
          <div key={movie.id}>
            <Modal
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null} 
              >
               <iframe  src={movie.attributes.byte.data.attributes.YoutubeEmbedCode} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </Modal>
              <Link onClick={handleOpenModal}>
              <div className="movieTrailers-container">
              <img src={`${API_URL}${movie.attributes.byte.data.attributes.Thumbnail.data.attributes.url}`} alt="Img" id={movie.id}/>
                <div className="Movietrailers-overlay">
                  <p className="movieTrailers-title">{movie.attributes.byte.data.attributes.caption}</p>
                </div>
              </div>
              </Link>
          </div>
        ))}
      </Content>
      <PaginationWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e50914",
            colorText: "#ffffff",
            colorIcon: "#e50914",
          },
          components: {
            Pagination: {
              colorPrimary: "#e50914",
              itemSize: "42px",
              fontSize: "22px",
              borderRadius: "20px",
              colorBgTextHover: "#e50914",
            },
          },
        }}
      >
        <Pagination
          className="pagination"
          size="small"
          current={current1}
          onChange={onChange1}
          total={filteredMovies1.length}
          showSizeChanger={false}
          pageSize={pageSize1}
        />
      </ConfigProvider>
      </PaginationWrapper>


      {/*                //////////////////////////////////////////////     */}

      <Toolbar>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "10px",
          }}
        >
          MINI BYTES 
        </p>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery2}
          onChange={(e) => setSearchQuery2(e.target.value)}
        />
      </Toolbar>

      <Content1>
      {currentPageMovies2.map((movie) => (
          <div key={movie.id}>
            <Modal
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null} 
              >
               <iframe  src={movie.attributes.byte.data.attributes.YoutubeEmbedCode} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </Modal>
              <Link onClick={handleOpenModal}>
              <div className="movie-container">
              <img className='mini-bytes-img' src={`${API_URL}${movie.attributes.byte.data.attributes.Poster.data.attributes.url}`} alt="Img" id={movie.id}/>
                <div className="overlay">
                  <p className="movie-name">{movie.attributes.byte.data.attributes.caption}</p>
                </div>
              </div>
              </Link>
          </div>
        ))}
      </Content1>
      <PaginationWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e50914",
            colorText: "#ffffff",
            colorIcon: "#e50914",
          },
          components: {
            Pagination: {
              colorPrimary: "#e50914",
              itemSize: "42px",
              fontSize: "22px",
              borderRadius: "20px",
              colorBgTextHover: "#e50914",
            },
          },
        }}
      >
        <Pagination
          className="pagination"
          size="small"
          current={current2}
          onChange={onChange2}
          total={filteredMovies2.length}
          showSizeChanger={false}
          pageSize={pageSize2}
        />
      </ConfigProvider>
      </PaginationWrapper>
     
      <Footer />
    </Container>
  );
}

export default Blogs;


const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y:hidden;
  &:before {
    // background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Content = styled.div`
cursor: pointer;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  &:hover{
    transform: scale(1.2);
  }
}
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    grid-gap: 10px;
    height: 100%;
  }
`;
const Content1 = styled.div`
cursor: pointer;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  &:hover{
    transform: scale(1.2);
  }
}
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
    grid-gap: 10px;
    height: 100%;
  }
`;


const Toolbar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 15px;
  background-color: #101011;

  p {
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SearchInput = styled.input`
  margin-right: 10px;
  padding: 15px;
  border: 0px inset #ff0015;
  background-color: #212529;
  border-radius: 5px;
  color: #fba010;
  float: right;
  width: 30%;
  @media (max-width: 768px) {
    width: 60%;
    padding: 10px;
  }
`;

