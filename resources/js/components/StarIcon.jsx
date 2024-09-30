import React from 'react'
import { AiFillStar } from "react-icons/ai";

const StarIcon = ({ score,setScore }) => {
  return (
    <>
      <AiFillStar
            className={(score >= 1) ? "text-yellow-400" : "text-gray-100"} onClick={() => setScore(1)}
             />
            <AiFillStar
            className={(score >= 2) ? "text-yellow-400" : "text-gray-100"} onClick={() => setScore(2)}
             />
            <AiFillStar
            className={(score >= 3) ? "text-yellow-400" : "text-gray-100"} onClick={() => setScore(3)}
             />
            <AiFillStar
            className={(score >= 4) ? "text-yellow-400" : "text-gray-100"} onClick={() => setScore(4)}
             />
            <AiFillStar
            className={(score >= 5) ? "text-yellow-400" : "text-gray-100"} onClick={() => setScore(5)}
             />
    </>
  )
}

export default StarIcon
