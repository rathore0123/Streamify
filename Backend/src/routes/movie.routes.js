import { Router } from "express";
import { getMovieTrailer, getNowPlayingMovies, getPopularMovies, getSearchedMovie, getTopRatedMovies, getUpcomingMovies, videoPlayInfo } from "../controllers/movie.controller.js";

const router = Router();

router.route("/now_playing").get(getNowPlayingMovies);
router.route("/popular_movies").get(getPopularMovies);
router.route("/top_rated_movies").get(getTopRatedMovies);
router.route("/upcoming_movies").get(getUpcomingMovies);
router.route("/movie_trailer").get(getMovieTrailer);
router.route("/search_movie").get(getSearchedMovie);
router.route("/play_movie").get(videoPlayInfo);

export default router;