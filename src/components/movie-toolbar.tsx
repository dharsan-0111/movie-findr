"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useMovieContext } from "./movie-provider";
import { getAllGenres, getAllLanguageOptions } from "@/lib/server/scripts";
import { Language } from "@/interfaces/movie-data_interface";

export function MovieToolbar() {
  const { theme, setTheme } = useTheme();
  const { setFilters, randomizeSelection } = useMovieContext();

  const [genres, setGenres] = useState<{ value: number; name: string }[]>([]);
  const [languageOptions, setLanguageOptions] = useState<Language[]>([]);

  const handleFilterChange = (key: string, value: string) => { 
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const fetchAllLanguageOptions = async (): Promise<void> =>
  {
    try {
        const languages = await getAllLanguageOptions();
        if(languages) {
            setLanguageOptions(languages);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const fetchAllGenres = async (): Promise<void> =>
  {
    try {
        const genres = await getAllGenres();
        if(genres) {
            genres.genres.forEach((genre) => {
                setGenres((prevGenres) => [...prevGenres, { value: genre.id, name: genre.name }]);
            });
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchAllLanguageOptions();
    fetchAllGenres();
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select onValueChange={(value) => handleFilterChange("genres", value)}>
            <SelectTrigger className="w-[180px] glass-morphism">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre, index) => (
                <SelectItem key={index} value={genre.value.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange("languages", value)}>
            <SelectTrigger className="w-[180px] glass-morphism">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions?.length > 0 && languageOptions?.map((language, index) => (
                <SelectItem key={index} value={language?.iso_639_1}>
                  {language?.english_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="glass-morphism"
            onClick={randomizeSelection}
          >
            Randomize Selection
          </Button>

          {/* <Select>
            <SelectTrigger className="w-[180px] glass-morphism">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating.toLowerCase()}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="glass-morphism"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="glass-morphism"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <button className="ml-1 hover:text-foreground/80">×</button>
            </Badge>
          ))}
        </div>
      )} */}
    </div>
  );
}
