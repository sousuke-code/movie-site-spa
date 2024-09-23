import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const MovieShow = () => {
  const {id} = useParams();

  const[movie, setMovie] = useState({});

  useEffect(()=> {
    const fetchMovie = async() => {
     try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cac949cc68cd8bd8d6110b32bf991cd0&language=ja`);
      const data = await response.json();
      setMovie(data);
     } catch (error) {
      console.error('データの取得に失敗', error);
     }
    };
    fetchMovie();
  }, []);

  console.log(movie);

  const genres = movie.genres || [];

  console.log(genres)

  return (
    <>
    <div className='grid grid-cols-2'>
     <div className='m-5 flex justify-center '>
       <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt=""  className='rounded'/>
     </div>

     <div>
       <h1 className='text-3xl font-bold flex mt-10 justify-center text-white '>{movie.title}</h1>
       
       <div className='flex justify-center'>
         {genres.length > 0 &&(
          genres.map((genre) => (
            <p key={genre.id} className='text-white m-2'>{genre.name}</p>
          ))
         )}
       </div>


        <h4 className='font-bold text-2xl text-white flex justify-center mt-10 mb-5'>作品紹介</h4>
        <p className='text-xl text-white'>{movie.overview}</p>




     </div>

    </div>
    <Link to='/' >
    <button>戻る</button>
    </Link>
    </>
  )
}

export default MovieShow
