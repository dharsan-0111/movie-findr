import {
  GenreResponse,
  Language,
  Movie,
  MovieCategorizedResponse,
  MoviesResponse,
} from "@/interfaces/movie-data_interface";
import { getRandomPageNumber, triggerApi } from "../utils";

export const getAllGenres = async (): Promise<GenreResponse> => {
  const API_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  return triggerApi(API_URL, "GET");
};

export const discoverMovies = async (
  genreId: number | string,
  language: string,
): Promise<MoviesResponse> => {
  const page = getRandomPageNumber(5);
  let API_URL = "https://api.themoviedb.org/3/discover/movie?";
  if (genreId !== undefined) {
    API_URL += `with_genres=${genreId}&`;
  }
  if (language !== undefined && language !== "") {
    API_URL += `with_original_language=${language}&`;
  }
  API_URL += `page=${page}&sort_by=popularity.desc`;
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

export const getAllLanguageOptions = async (): Promise<Language[]> => { 
  const API_URL = "https://api.themoviedb.org/3/configuration/languages";
  return triggerApi(API_URL, "GET");
};
