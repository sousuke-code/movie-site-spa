import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdFavoriteBorder } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpComingMovieLists = ( {notify}) => {
  const [movies, setMovies] = useState([]);

  const Clickhandler = (movieId) => {

    const data = { movie_id: movieId }
    axios.get('/sanctum/csrf-cookie').then(response => {
      const token = localStorage.getItem('auth_token');
      axios.post(`/api/favorite`, data,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }).then(res => {
        if(res.data.status === 200){
          console.log('success');

      } else {
          console.log('failed');
       }
      });
    });

  }


  useEffect(()=> {
    const fetchMovies = async() => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=cac949cc68cd8bd8d6110b32bf991cd0');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('データの取得に失敗',error);
      }
    };
    fetchMovies();
  },[]);
  return (
    <>
      {movies.map((movie) => {
      return (
        <div key={movie.id} className='m-4 relative'>
          <Link to={`/movie/show/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded'/>
          </Link>
          <MdFavoriteBorder className='absolute text-white top-2 right-2 text-3xl' onClick={() => {Clickhandler(movie.id); notify(); }}/>
        </div>
      )
     })}
    </>
  )
}

export default UpComingMovieLists
