import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

function MovieContainer() {
  const movies = useSelector((store) => store.movie);

  return (
    <div id='movies' className="w-full bg-slate-950 py-10 flex flex-col gap-5">
      {movies?.nowPlayingMovies?.length > 0 && (
        <MovieList Title="Now Playing Movies" movies={movies.nowPlayingMovies} />
      )}
      {movies?.popularMovies?.length > 0 && (
        <MovieList Title="Popular Movies" movies={movies.popularMovies} />
      )}
      {movies?.topRatedMovies?.length > 0 && (
        <MovieList Title="Top Rated Movies" movies={movies.topRatedMovies} />
      )}
      {movies?.upcomingMovies?.length > 0 && (
        <MovieList Title="Upcoming Movies" movies={movies.upcomingMovies} />
      )}
    </div>
  )
}

export default MovieContainer