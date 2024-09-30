import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import StarIcon from "./StarIcon";
import { useForm } from "react-hook-form";
import axios from "axios";

const ReviewModal = ({ show, setShow, movie }) => {

    const {register, handleSubmit, reset} = useForm();

    const [score, setScore] = useState(3);

    const closeModal = () => {
        setShow(false);
    };

    const onSubmit = (data) => {

        const reviewData = {
            ...data,
            score: score,
            movie_id: movie.id,
            user_name: localStorage.getItem("auth_name"),
        }

        console.log(reviewData);
        
        axios.get("/sanctum/csrf-cookie").then(response => {
            const token = localStorage.getItem("auth_token");
            console.log(token)
            axios.post(`/api/review/show`, reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
              if(res.data.status === 200) {
                console.log('success');
              } else {
                console.log('error');
              }
            })
        })
    }
    if (show) {
        return (
            <>
                <div id="overlay" className="">
                    <form id="content" className="z-2 m-20 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-gray-400 shadow relative">
                            <h1 className="py-2 text-black font-bold text-center text-lg">
                                {movie.title}
                            </h1>
                            <IoMdClose
                                className="text-3xl right-1 absolute top-1 cursor-pointer"
                                onClick={closeModal}
                            />
                        </div>
                        <div className="p-10">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg ">評価</span>
                                <StarIcon
                                    score={score}
                                    setScore={setScore}
                                    className=""
                                />
                                <span>{score}点 / 5点中</span>
                            </div>

                            <h1 className="text-2xl font-bold text-center mb-2 mt-5">
                                感想
                            </h1>
                            <textarea
                            {...register('review', {required: true})}
                                className="w-full border border-black"
                                id=""
                            ></textarea>

                            <div className="flex justify-center mt-10">
                                <button
                                    type="submit"
                                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    投稿する
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default ReviewModal;
