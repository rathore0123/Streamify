import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_END_POINT } from '../utils/constants';
import { setMovieDetails } from '../redux/movieSlice';

function MovieList({ Title, movies = [], className }) {
    const sliderRef = useRef(null);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const scroll = (e) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: e.deltaY,
                behavior: 'smooth',
            });
        }
    };

    const getMovieId = async(id) => {
        const res = await axios.get(`${API_END_POINT}/movie/play_movie`, {params: {id}});
        let data = await res.data.data.data;
        dispatch(setMovieDetails(data));
        Navigate("/play-movie");
    }

    return (
        <div className="flex flex-col gap-5 w-full justify-center px-4">
            <h1 className={`text-2xl underline font-semibold text-white text-center md:text-left `}>
                {Title}
            </h1>
            <div
                ref={sliderRef}
                onWheel={scroll}
                className={`${className} mx-auto slider p-4 bg-white cursor-pointer w-fit max-w-full overflow-x-scroll flex items-center gap-x-4 rounded-md scrollbar-hide overscroll-contain`}
            >
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        movie.poster_path &&
                        <div
                            onClick={() => getMovieId (movie.id)}
                            key={movie.id}
                            className="card h-fit p-3 flex-shrink-0 bg-slate-700 flex flex-col justify-center items-center rounded-md w-[200px] hover:scale-105 duration-300"
                        >
                            <img
                                className="rounded-md w-[200px] h-[200px] object-cover"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || "No title available"}
                            />
                            <h3 className="text-center text-white font-semibold text-base mt-2">
                                {movie.title || "Untitled"}
                            </h3>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 italic">
                        No movies available.
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieList;
