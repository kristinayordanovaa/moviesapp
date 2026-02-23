import React from "react";  
const MovieCard = ({ movie }) => {
  return (
  <div className="movie-card">
    <img src={movie.Poster !== 'N/A' ? movie.Poster : '/src/assets/no-movie.png'} alt={movie.Title} />
    <div className="mt-4">
    <h3>{movie.Title}</h3>
    <div className="content">
      <span className="year">{movie.Year}</span>
    </div>

    </div>


  </div>
    );  
};

export default MovieCard;