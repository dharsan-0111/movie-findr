"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/interfaces/movie-data_interface";
import { discoverMovies } from "@/lib/server/scripts";

interface MovieFilters {
    genres: string | number[];
    languages: string;
    ratings: number[];
}

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  filters: MovieFilters;
  setFilters: React.Dispatch<React.SetStateAction<MovieFilters>>;
  randomizeSelection: () => Promise<void>;
}


const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{
  initialMovies: Movie[];
  children: React.ReactNode;
}> = ({ initialMovies, children }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filters, setFilters] = useState<MovieFilters>({
    genres: [], // Array of selected genre IDs
    languages: '', // Array of selected languages
    ratings: [], // Array of selected ratings
  });

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  const removeMovie = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const randomizeSelection = async () => { 
    fetchMovies();
  };

  const fetchMovies = async () => {
    // Fetch movies based on filters
    const { genres, languages } = filters;
    try {
        const genresString = Array.isArray(genres) ? genres.join(',') : genres;
        const movies = await discoverMovies(genresString, languages as string);
        if(movies) {
            setMovies(movies?.results?.slice(0, 10));
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    if(filters.genres.length > 0 || filters.languages.length > 0)
    {
        fetchMovies();
    }
  }, [filters]);

  return (
    <MovieContext.Provider
      value={{ movies, addMovie, removeMovie, filters, setFilters, randomizeSelection }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
