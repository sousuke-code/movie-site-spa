import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [movies,setMovies ] = useState([]);

  // const data = localStorage.getItem('auth_id');
  useEffect(()=> {
    axios.get('/sanctum/csrf-cookie').then(response=> {
      const token = localStorage.getItem('auth_token');
      axios.get(`/api/homepage`,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }).then(res => {
        if (res.data.status === 200 ) {
          setMovies(res.data.movies);
        }
      })
    })
  },[]);

  return (
    <>
    {movies.length > 0 ? (
      (movies.map((movie) => {
        return (
          <div key={movie.id} className='relative m-4'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded h-full'/>
          </div>
        )
      })))
    : (
      <p className='text-black font-semibold flex justify-center text-lg'>映画が見つかりませんでした</p>
    )
  }
   </>
  )
}

export default HomePage
