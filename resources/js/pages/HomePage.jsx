import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // const data = localStorage.getItem('auth_id');
  useEffect(() => {
    axios.get('/sanctum/csrf-cookie').then(response => {
      const token = localStorage.getItem('auth_token');
      axios.get(`/api/homepage`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.data.status === 200) {
          setMovies(res.data.movies);
        }
        setLoading(false);
      })
    })
  }, []);

  if (loading === true) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Audio
          height="150"
          width="150"
          color="black"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    )

  } else {
    return (
      <>
			  <h1>
					<Link to="/theater">
					近くの映画館を探す
					</Link>
				</h1>
        <h1 className='font-bold text-2xl flex justify-center m-2'>お気に入りの映画一覧</h1>
        <div className='grid grid grid-cols-3 lg:grid-cols-5'>
          {movies.length > 0 ? (
            (movies.map((movie) => {
              return (
                <div key={movie.id} className='relative m-4'>
                  <Link to={`/movie/show/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded h-full' />
                  </Link>
                </div>
              )
            })))
            : (
              <p className='text-black font-semibold flex justify-center text-lg'>映画が見つかりませんでした</p>
            )
          }
        </div>
      </>
    )

  }

}

export default HomePage
