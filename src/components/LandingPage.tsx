"use client";

import { generateRandomMovies } from "@/lib/utils";
import { useEffect, useState } from "react";
import SpinningWheel from "./SpinningWheel";
import { Movie } from "@/interfaces/movie-data_interface";

const LandingPage: React.FC = (): React.JSX.Element => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [spinWheelData, setSpineWheelData] = useState<any[]>([]);

  const fetchRandomMovies = async (): Promise<void> =>
  {
    try 
    {
      const movies = await generateRandomMovies();
      if(movies)
      {
        setMovies(movies);
        const data = movies.map((movie) => {
          return { 
            label: movie.title, 
            value: movie.id,
            poster_path: movie.poster_path
          };
        });
        setSpineWheelData(data);
      }
    } 
    catch (error) 
    {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center w-full p-8">
        <SpinningWheel data={spinWheelData} />
      </div>
    </div>
  );
};

export default LandingPage;


