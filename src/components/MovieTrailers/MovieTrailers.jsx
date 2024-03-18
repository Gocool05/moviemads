import React,{useState,useEffect} from 'react'
import MovieSlider from './MovieSlider'
import styled from 'styled-components'
import './MovieTrailers.css'
import { json, Link } from 'react-router-dom';
// Import Swiper styles
import './MovieTrailers.css'
import Footer from '../Footer/Footer.js'
import { ConfigProvider, Pagination, Typography } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
// import required modules

const MovieTrailers = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(10);



  const [movies, setMovies] = useState([]);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhOWQ1NDA4YjVhYmEwMjNjZjdiMDE2ZmJmNjc2NiIsInN1YiI6IjY1ZTAyZTVhMmQ1MzFhMDE4NWJmYWY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTjTU9CcYJYFqqwWS6mALcPpRaT5MykGbaYm3CHep9A'
      }
    };
    const getMovies = () => {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=5e1a9d5408b5aba023cf7b016fbf6766&with_original_language=ta', options)
      .then(response => response.json())
      .then(json => setMovies(json.results))
      .catch(err => console.error(err));
    }
    console.log("TV",movies)
   
    useEffect(() => {
      getMovies();
    },[]);


  // Function to filter movies based on search query, language, and genre
  const filteredMovies = movies.filter(movie => {
    // Filter by search query
    if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Filter by selected language
    // if (selectedLanguage && movie.language !== selectedLanguage) {
    //   return false;
    // }
    // // Filter by selected genre
    // if (selectedGenre && !movie.genres.includes(selectedGenre)) {
    //   return false;
    // }
    return true;
  });

  // const totalPage = Math.ceil(filteredMovies.length / pageSize);

  const currentPageMovies = filteredMovies.slice((current - 1) * pageSize, current * pageSize);

  const onChange = (page) => {
    setCurrent(page);
  };



  return (
    <Container>
      <MovieSlider />
      <Toolbar>
        <p
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginRight: "10px",
            fontSize: "1.5rem",
          }}
        >
          Movie Trailers
        </p>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <LanguageSelect
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
            <option value="Tamil">Tamil</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>

        </LanguageSelect>
        <GenreSelect
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science fiction">Science fiction</option>
            <option value="Sports">Sports</option>
            <option value="Thriller">Thriller</option>
            <option value="Documentary">Documentary</option>
    
        </GenreSelect> */}
      </Toolbar>

      <Content>
        {currentPageMovies.map((movie) => (
          <div key={movie.id}>
            <Link
              to={"/details/" + movie.id}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="movieTrailers-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Img"
                  id={movie.id}
                />
                <div className="Movietrailers-overlay">
                  <p className="movieTrailers-title">{movie.title}</p>
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
          size="large"
          current={current}
          onChange={onChange}
          total={filteredMovies.length}
          showSizeChanger={false}
          pageSize={pageSize}
        />
      </ConfigProvider>
      </PaginationWrapper>
      <Footer />
    </Container>
  );
}

export default MovieTrailers

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  padding-bottom: 50px;
  overflow-x: hidden;
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
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SearchInput = styled.input`
  margin-right: 10px;
  padding: 15px;
  border: 2px inset #ff0015;
  color: #fba010;
  float: right;
  width: 30%;
  background-color: transparent;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const LanguageSelect = styled.select`
  margin-right: 10px;
  padding: 15px;
  border: 1px solid #fba010;
  background-color: transparent;
  color: #fba010;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GenreSelect = styled.select`
  padding: 15px;
  border: 1px solid #fba010;
  background-color: transparent;
  color: #fba010;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

