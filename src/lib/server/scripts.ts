import {
  GenreResponse,
  Movie,
  MovieCategorizedResponse,
  MoviesResponse,
} from "@/interfaces/movie-data_interface";
import { triggerApi } from "../utils";

export const getAllGenres = async (): Promise<GenreResponse> => {
  const API_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  return triggerApi(API_URL, "GET");
};

export const discoverMoviesByGenre = async (
  genreId: number
): Promise<MoviesResponse[]> => {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
  return triggerApi(API_URL, "GET");
};

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieCategorizedResponse> => {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + page;
  return triggerApi(API_URL, "GET");
};

export const getMovieById = async (movieId: number): Promise<Movie> => {
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`;
  return triggerApi(API_URL, "GET");
};
