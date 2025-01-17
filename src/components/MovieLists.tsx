"use client";

interface MovieListsProps {
  title: string;
  movieList: any[];
}

const MoviesLists: React.FC<MovieListsProps> = () => {
  return (
    <div>
      <h1>Movies Lists</h1>
    </div>
  );
};

export default MoviesLists;
