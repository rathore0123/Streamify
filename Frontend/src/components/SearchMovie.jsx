import axios from 'axios';
import MovieList from './MovieList';
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import React, { useState, useEffect } from 'react'
import { API_END_POINT } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedMovie } from '../redux/movieSlice';

function SearchMovie() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [searchMovie, setSearchMovie] = useState('');
    const isLogin = useSelector((store) => store.user.isLogin);
    const SearchedMovie = useSelector((store) => store.movie.SearchedMovie);

    const handleSearch = async (e) => {
        e.preventDefault();
        setTitle(searchMovie);
        const res = await axios.get(`${API_END_POINT}/movie/search_movie`, { params: { searchMovie } });
        let data = await res.data.data.data;
        console.log(data)
        dispatch(setSearchedMovie(data));
    }

    useEffect(() => {
        if (!isLogin) {
            Navigate("/");
        }
    }, [isLogin]);


    return (
        <div className="w-screen min-h-screen pt-28 pb-10 flex flex-col gap-40 items-center bg-[url('/src/assets/Netflix-Background.jpg')]">
            <form onSubmit={handleSearch} action="">
                <div className="flex items-center justify-center gap-2 bg-gray-600 rounded-full p-2 py-1 w-fit">
                    <input
                        onChange={(e) => setSearchMovie(e.target.value)}
                        value={searchMovie}
                        className="bg-slate-200 rounded-full px-4 py-2 text-lg border-none outline-none w-[400px]"
                        type="text"
                        placeholder="Enter Movie Name"
                        name="searchMovie"
                        id="searchMovie"
                    />
                    <button className="text-4xl text-gray-200 cursor-pointer">
                        <IoSearchSharp />
                    </button>
                </div>
            </form>
            {
                SearchedMovie.length > 0 ? (
                    <MovieList Title={title} movies={SearchedMovie} className="py-2" />
                )
                    :
                    (
                        <div>No Results found for {searchMovie}</div>
                    )
            }
        </div>
    )
}

export default SearchMovie