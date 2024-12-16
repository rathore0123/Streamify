import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    index: null,
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    movieTrailers: [],
    SearchedMovie: [],
    movieDetails: [],
}

export const movieSlice = createSlice ({
    name: 'movie',
    initialState,
    reducers: {
        setMovieIndex: (state, action) => {
            state.index = action.payload;
        },
        setNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        setUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        setMovieTrailers: (state, action) => {
            state.movieTrailers = action.payload;
        },
        setSearchedMovie: (state, action) => {
            state.SearchedMovie = action.payload;
        },
        setMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        }
    }
});

export const { setNowPlayingMovies, setPopularMovies, setTopRatedMovies, setUpcomingMovies, setMovieTrailers, setMovieIndex, setSearchedMovie, setMovieDetails } = movieSlice.actions
export default movieSlice.reducer;