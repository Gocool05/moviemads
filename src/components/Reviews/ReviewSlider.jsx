// import React from 'react'

// const ReviewSlider = () => {
//   return (
//     <Carousel {...settings}>
//       {movies.map((movie) => (
//       <Wrap>
//            <Info key={movie.id}>
     
//            <Subtitle>{movie.attributes.short_film.data.attributes.MovieName}</Subtitle>
//       <Link to={'/details/'+movie.attributes.short_film.data.id} onClick={() => window.scrollTo(0, 0)} className="movie-link1" >
//          <Button1><PlayCircleFilled spin/> Play Now</Button1>
//           <Button2><InfoCircleFilled /> More Info</Button2>
//            </Link>
//            <Description>{movie.attributes.short_film.data.attributes.Description}</Description>
//          </Info>
//          <Overlays>
//            <img src={`${API_URL}${movie.attributes.short_film.data.attributes.MovieThumbnail.data.attributes.url}`} alt="Img" id={movie.id}/>
//            </Overlays>
//     </Wrap>
           
//     ))}
//     </Carousel>
//   )
// }

// export default ReviewSlider