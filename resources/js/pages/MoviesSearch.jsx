import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import SerchMovieResults from '../components/SerchMovieResults';

const MoviesSearch = () => {
  const[inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  }


  return (
    <>
    <div className='bg-white-200 flex justify-center m-19'>
       <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="映画のタイトルを入力してください"
       value = {inputValue}
       onChange={handleChange}
        />
    </div>

    <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3'>
    <SerchMovieResults word={inputValue} />
    </div>
    </>
  )
}

export default MoviesSearch
