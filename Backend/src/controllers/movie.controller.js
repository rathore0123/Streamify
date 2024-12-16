import { json, response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import axios from "axios";

let index;

const randomMovieIndex = (movies) => {
    console.log(movies)
    index = Math.floor(Math.random() * movies?.length);
    console.log(index);
}

const options = {
    headers: {
        mathod: 'GET',
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzA1MTRjODcwNDA3N2I0NWEyOTdiNjk5YzE3YTY0ZSIsIm5iZiI6MTczMTY1NDI4My40MzMxNDQsInN1YiI6IjY3MzZlZmE4YmEyOWEwNTFiM2NjODg0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJ0nTg5-gcbAbFHTtYg9DOP5qH62cMgDDdmeU-V3P0g'
    }
};

const getNowPlayingMovies = AsyncHandler(async (req, res) => {
    let data;
    try {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options);
        data = await response.data;
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { data, index }, "Now Playing Movies Fetched Successfully")
        )
});

const getPopularMovies = AsyncHandler(async (req, res) => {
    let data;
    try {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, options);
        data = response.data;
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { data }, "Popular Movies Fetched Successfully")
        )
});

const getTopRatedMovies = AsyncHandler(async (req, res) => {
    let data;
    try {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, options);
        data = response.data;
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { data }, "Top Rated Movies Fetched Successfully")
        )
});

const getUpcomingMovies = AsyncHandler(async (req, res) => {
    let data;
    try {
        let response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming`, options);
        data = response.data;
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, { data }, "Upcoming Movies Fetched Successfully")
        )
});


const getMovieTrailer = AsyncHandler(async (req, res) => {
    let data;
    let response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options);
    randomMovieIndex(response.data.results)
    let id = response.data.results[index].id;

    let resData = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
    data = await resData.data.results.filter((movie) => movie.type === "Trailer");

    return res
        .status(200)
        .json(
            new ApiResponse(200, { data, index }, "Movie Trailer Fetched Successfully")
        )
});


const getSearchedMovie = AsyncHandler(async (req, res) => {
    const { searchMovie } = req.query;
    console.log(searchMovie)
    let data;
    let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchMovie)}&include_adult=false&language=en-US&page=1`, options);
    data = response.data.results;

    return res
        .status(200)
        .json(
            new ApiResponse(200, { data }, "Searched Movie Fetched Successfully")
        )
});

const videoPlayInfo = AsyncHandler(async (req, res) => {
    const { id } = req.query;
    console.log(id)
    let data;
    let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
    data = await response.data.results

    return res
        .status(200)
        .json(
            new ApiResponse(200, { data }, "Searched Movie Fetched Successfully")
        )
});



export { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getMovieTrailer, getSearchedMovie, videoPlayInfo };