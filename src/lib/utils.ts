import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { Movie } from "@/interfaces/movie-data_interface";
import { getPopularMovies } from "./server/scripts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Axios helper function to make API calls.
 * @param {string} endpoint - The endpoint of the API (relative to BASE_URL).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [payload] - Request body for POST/PUT requests (optional).
 * @param {Object} [params] - Query parameters for the request (optional).
 * @returns {Promise<Object>} - Response data from the API.
 */
export const triggerApi = async (
  endpoint: string,
  method: string = "GET",
  payload: object = {},
  params: object = {}
): Promise<any> => {

  // Get the TMDB Bearer Token from environment variables
  const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
  try {
    const response = await axios({
      url: `${endpoint}`,
      method,
      headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json",
      },
      ...(method === "POST" || method === "PUT" ? { data: payload } : {}),
      params, // Query parameters for GET/DELETE requests
    });

    return response.data; // Return the API response data
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
};

/**
 * Generates a random page number between 1 and the specified maximum number of pages.
 *
 * @param {number} [maxPages=500] - The maximum number of pages.
 * @returns {number} A random page number between 1 and maxPages.
 */
export const getRandomPageNumber = (maxPages: number = 500): number => {
  return Math.floor(Math.random() * maxPages) + 1;   // Random page between 1 and maxPages
};

// Shuffle an array using the Fisher-Yates algorithm
/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
 *
 * @param array - The array of Movie objects to be shuffled.
 * @returns The shuffled array.
 */
export const shuffleArray = (array: Movie[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

/**
 * Generates a list of random movies by fetching popular movies from a random page,
 * shuffling them, and then limiting the number of movies to a specified amount (e.g., top 10).
 *
 * @returns {Promise<Array>} A promise that resolves to an array of shuffled movies, limited to the top 10.
 * If an error occurs during the process, an empty array is returned.
 *
 * @throws {Error} If there is an issue with fetching or processing the movies.
 */
export const generateRandomMovies = async (): Promise<Array<Movie>> => {
  try {
    // Step 1: Get a random page number
    const randomPage = getRandomPageNumber();

    // Step 2: Fetch movies from the random page
    const movies = await getPopularMovies(randomPage);

    // Step 3: Shuffle the movies
    const shuffledMovies = shuffleArray(movies?.results);

    return shuffledMovies?.slice(0, 10);
    // Step 4: Limit the number of movies (e.g., top 10)
  } catch (error) {
    console.error("Error fetching and randomizing movies:", error);
    return [];
  }
};