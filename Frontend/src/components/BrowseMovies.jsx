import axios from 'axios';
import MovieContainer from './MovieContainer';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import InfoContext from '../useInfoContext/InfoContext';
import { API_END_POINT } from '../utils/constants';
import { setMovieDetails, setMovieIndex, setMovieTrailers, setNowPlayingMovies, setPopularMovies, setTopRatedMovies, setUpcomingMovies } from '../redux/movieSlice';

function BrowseMovies() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchBar, setSearchBar } = useContext(InfoContext);
  const isLogin = useSelector((store) => store.user.isLogin);
  const moviesIndex = useSelector((store) => store.movie.index);
  const movies = useSelector((store) => store.movie.nowPlayingMovies);
  const moviesTrailer = useSelector((store) => store.movie.movieTrailers);

  const getMovies = async () => {
    try {
      const [res1, res2, res3, res4, res5] = await Promise.all([
        axios.get(`${API_END_POINT}/movie/now_playing`),
        axios.get(`${API_END_POINT}/movie/popular_movies`),
        axios.get(`${API_END_POINT}/movie/top_rated_movies`),
        axios.get(`${API_END_POINT}/movie/upcoming_movies`),
        axios.get(`${API_END_POINT}/movie/movie_trailer`),
      ]);

      dispatch(setNowPlayingMovies(res1.data.data.data?.results));
      dispatch(setPopularMovies(res2.data.data.data?.results));
      dispatch(setTopRatedMovies(res3.data.data.data?.results));
      dispatch(setUpcomingMovies(res4.data.data.data?.results));
      dispatch(setMovieTrailers(res5.data.data.data));
      dispatch(setMovieIndex(res5.data.data.index));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getMovieId = async (id) => {
    const res = await axios.get(`${API_END_POINT}/movie/play_movie`, { params: { id } });
    let data = await res.data.data.data;
    dispatch(setMovieDetails(data));
    Navigate("/play-movie");
  }

  const scrollDiv = () => {
    const movieDiv = document.getElementById('movies');
    movieDiv.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (searchBar) setSearchBar(false)
    if (isLogin) {
      getMovies();
    } else {
      Navigate("/");
    }
  }, [isLogin, searchBar]);

  return (
    <div className="bg-black w-full">
      <div className="w-full h-full pt-20">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${moviesTrailer[0]?.key}?autoplay=1&mute=1&controls=1&loop=1&playlist=${moviesTrailer[0]?.key}&cc_load_policy=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>

        <div className='absolute top-20 md:top-36 lg:top-52 p-8'>
          <div className='w-full md:w-3/4 lg:w-1/2 mb-4'>
            <h2 className='text-white font-semibold md:font-bold text-lg md:text-xl lg:text-3xl mb-2'>{movies?.[moviesIndex]?.title || "Loading..."}</h2>
            <p className='text-[#cccccc] text-xs md:text-base lg:text-lg mb-2'>{movies?.[moviesIndex]?.overview || "Movie details will be displayed here."}</p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={(e) => getMovieId(movies[moviesIndex].id)}
              className="text-sm px-3 py-2 rounded-md bg-gradient-to-r from-black to-cyan-600 text-white">
              Play Now
            </button>
            <button
              className="text-sm px-3 py-2 rounded-md bg-gradient-to-r from-black to-cyan-600 text-white"
              onClick={scrollDiv}
            >
              Watch More
            </button>
          </div>
        </div>
      </div>
      <MovieContainer />
    </div>
  );
}

export default BrowseMovies;
