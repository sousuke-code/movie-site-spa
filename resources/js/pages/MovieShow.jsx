import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieSubscription from "../components/MovieSubscription";
import ReviewLists from "../components/ReviewLists";
import "../../css/app.css";
import ReviewModal from "../components/ReviewModal";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

const MovieShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reviewShow, setReviewShow] = useState(false);
		const [loginModal, setLoginModal] = useState(false);
    const [movie, setMovie] = useState({});

    const login = localStorage.getItem("auth_name");

		console.log(login)

    const Clickhandler = (e) => {
        if (login) {
            console.log("success");
            setReviewShow(true);
        } else {
					console.log("non acount ログインモーダル表示")
					setLoginModal(true);
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=cac949cc68cd8bd8d6110b32bf991cd0&language=ja&append_to_response=credits`
                );
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("データの取得に失敗", error);
            }
        };
        fetchMovie();
    }, []);

    console.log(movie);

    const genres = movie.genres || [];

    console.log(genres);

    console.log(movie.credits ? movie.credits.cast : []);

    const cast = movie.credits ? movie.credits.cast : [];

    return (
        <>
            <div className="grid lg:grid-cols-2 m-2">
                <div className="m-5 flex justify-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt=""
                        className="rounded"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold flex mt-10 justify-center text-black ">
                        {movie.title}
                    </h1>

                    <div className="flex justify-center">
                        {genres.length > 0 &&
                            genres.map((genre) => (
                                <p key={genre.id} className="text-black m-2">
                                    {genre.name}
                                </p>
                            ))}
                    </div>

                    <h4 className="font-sans text-2xl text-black flex justify-center mt-10 mb-5">
                        上映時間 : {movie.runtime} 分
                    </h4>

                    <div className="m-10">
                        <h4 className="font-bold text-2xl text-black flex justify-center mt-10 mb-5">
                            作品紹介
                        </h4>
                        <p className="text-xl text-black font-sans tracking-wider">
                            {movie.overview}
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mt-10">
                        {cast.length > 0 ? (
                            cast.slice(0, 5).map((actor) => (
                                <div key={actor.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                        class="hover:opacity-50 transition ease-in-out duration-150 rounded-lg"
                                    ></img>
                                    <div className="mt-2">
                                        <a className="text-black font-bold">
                                            {actor.name}
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p> キャスト情報がありません </p>
                        )}
                    </div>

                    <MovieSubscription id={id} />

                    <div
                        className="grid sm:p-2
        sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-5 w-full"
                    >
                        <ReviewLists id={movie.id} />
                    </div>

                    {/*レビュー投稿コンポーネント*/}
                    <div className="flex justify-center mt-10">
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => Clickhandler(movie.id)}
                        >
                            レビューを投稿する
                        </button>

												
													<ReviewModal
															show={reviewShow}
															setShow={setReviewShow}
															movie={movie}
													/>

													<LoginModal 
															loginModal = {loginModal}
															setLoginModal = {setLoginModal}
													/>

									
											
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieShow;
