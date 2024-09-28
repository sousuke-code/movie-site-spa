import React from 'react'
import MovieLists from '../components/MovieLists'
import PopularMovieLists from '../components/PopularMovieLists'
import UpComingMovieLists from '../components/UpComingMovieLists'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllView = () => {
    const notify = () => toast("お気に入りに登録しました", {
        theme: "light"
    });


    return (
        <>
            <div className='flex justify-center items-center m-10 mb-0'>
                <h1 className='text-black  font-semibold text-2xl'>今注目の映画</h1>
            </div>
            <span className='flex justify-center items-center text-3xl font bold'>---</span>

            <div className=' grid grid-cols-3  lg:grid-cols-5 mb-10'>
                <PopularMovieLists notify={notify} />
            </div >

            <div className='mt-10'>
                <h1 className='text-black flex justify-center font-semibold text-2xl'>公開予定の映画</h1>
            </div>

            <span className='flex justify-center items-center text-3xl font bold'>---</span>

            <div className='mt-10 grid grid-cols-3 lg:grid-cols-5'>
                <UpComingMovieLists notify={notify} />
                <ToastContainer
                />
            </div>
        </>


    )
}

export default AllView