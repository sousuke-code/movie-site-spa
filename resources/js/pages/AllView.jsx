import React from 'react'
import MovieLists from '../components/MovieLists'
import PopularMovieLists from '../components/PopularMovieLists'
import UpComingMovieLists from '../components/UpComingMovieLists'


const AllView = () => {
 


    return (
       <>
        <h1 className='text-white flex justify-center font-semibold text-lg'>人気の映画</h1>
        <div className=' grid lg:grid-cols-5 md:grid-cols-3 mb-10'>
         <PopularMovieLists />
        </div >
        <div className='mt-10'>

        <h1 className='text-white flex justify-center font-semibold text-lg'>公開予定の映画</h1>
        </div>

        <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3'>
        <UpComingMovieLists />
        </div>
       </>

      
    )
}

export default AllView