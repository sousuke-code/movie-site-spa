import React from 'react'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const PopularMovieLists = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cac949cc68cd8bd8d6110b32bf991cd0');
          const data = await response.json();
          setMovies(data.results);
      } catch (error) {
        console.error('データの取得に失敗',error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <>
       {movies.map((movie) => {
      return (
        <div key={movie.id} className='m-4'>
          <Link to={`/movie/show/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded'/>
          </Link>
        </div>
      )
     })}
    </>
  )
}

export default PopularMovieLists
