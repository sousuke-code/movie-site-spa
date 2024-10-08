import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SerchMovieResults = ({ word }) => {
    const navigate = useNavigate()
    const notify = () =>
        toast("お気に入りに登録しました", {
            theme: "light",
        });

    const [flag, setFlag] = useState(false);
    const [movies, setMovies] = useState([]);

    const Clickhandler = (movieId) => {
        const data = { movie_id: movieId };
        axios.get("/sanctum/csrf-cookie").then((response) => {
            const token = localStorage.getItem("auth_token");
            axios
                .post(`/api/favorite`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        console.log("success");
                    } else {
                        console.log("failed");
                    }
                });
        });
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=cac949cc68cd8bd8d6110b32bf991cd0&language=ja&query=${word}`
                );
                const data = await response.json();
                setFlag(true);
                setMovies(data.results);
            } catch (error) {
                console.error("データの取得に失敗", error);
                setFlag(true);
            }
        };
        fetchMovie();
    }, [word]);

    //初期ロードと空文字の時の判定
    if (!flag || word === "") {
        return null;
    }

    return (
        <>
            {movies.length > 0 ? (
                movies.map((movie) => {
                    return movie.poster_path ? (
                        <div key={movie.id} className="relative m-4">
                            <Link to={`/movie/show/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt=""
                                    className="rounded h-full"
                                />
                            </Link>
                            <MdFavoriteBorder
                                className="absolute text-black top-2 right-2 text-3xl"
                                onClick={() =>
                                    localStorage.getItem("auth_name")
                                        ? (Clickhandler(movie.id), notify())
                                        : (
                                            navigate('/register')
                                        )
                                }
                            />
                            <ToastContainer />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-7xl">
                            <MdImageNotSupported />
                        </div>
                    );
                })
            ) : (
                <p className="text-black font-semibold flex justify-center text-lg">
                    映画が見つかりませんでした
                </p>
            )}
        </>
    );
};

export default SerchMovieResults;
