import React, { useEffect } from 'react'
import { useState } from 'react'

const ReviewLists = ({ id }) => {
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    axios.get(`/api/review/${id}`).then(res => {
      if (res.data.status === 200 ){
        console.log('success');
        setReviews(res.data.reviews);
      } else {
        console.log('failed');
      }
    })

    console.log(reviews);
  },[id])
  return (
    <>
    { reviews.length > 0 ? (
    reviews.map((review) => {
      return (

    <a href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full m-2">

     <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{review.user_name}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">{review.review}</p>
   </a>

      );
    })
    ) : (
      <>
      </>
    )}
    </>
  )
}

export default ReviewLists
