import React from 'react'
import MovieLists from '../components/MovieLists'


const AllView = () => {
 


    return (
      <div className='h-screen grid lg:grid-cols-5 md:grid-cols-3'>
        <MovieLists />
      </div>
      
    )
}

export default AllView