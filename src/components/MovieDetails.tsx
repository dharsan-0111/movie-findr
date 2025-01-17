import { Movie } from "@/interfaces/movie-data_interface";
import { Star } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const MovieDetails: React.FC<{ movie: Movie }> = ({ movie }) => {

    // const posterPath = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;
    const backdropPath = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;

    return (
        <div className="w-full h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${backdropPath})` }}>
            <div className="flex flex-col w-full p-8 gap-4">
                <div className="flex-shrink-0">
                    <Link href="/" className="text-primary text-2xl font-bold">
                        <button className="bg-primary text-white p-2 rounded-lg">Go back & Try Again</button>
                    </Link>
                </div>
                <div className="flex flex-col lg:w-3/4 xl:w-3/4 md:w-full sm:w-full mt-4 md:mt-0 bg-white bg-opacity-80 p-8 rounded-xl h-full overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-primary">{movie?.title}</h1>
                        <div className="flex flex-row gap-8 items-center justify-start">
                            <p className="text-lg font-semibold text-neutral-light pr-4 border-r-2 border-black">{moment(movie?.release_date).format('YYYY')}</p>
                            <p className="text-lg font-semibold text-neutral-light pr-4 border-r-2 border-black">{movie?.runtime} min</p>
                            <div className="flex flex-row gap-4 items-center">
                                <p className="text-lg font-semibold text-neutral-light">{Math.round(movie?.vote_average)} / 10</p>
                                <Star className="text-yellow-400 fill-current" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <h2 className="text-xl font-semibold text-primary">Overview</h2>
                        <p className="text-lg font-normal text-neutral-light">{movie?.overview}</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <h2 className="text-xl font-semibold text-primary">Genres</h2>
                        <div className="flex flex-row gap-4">
                            {movie?.genres.map((genre, index) => (
                                <p key={index} className="text-lg font-normal text-neutral-light">{genre.name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <h2 className="text-xl font-semibold text-primary">Cast</h2>
                        <div className="flex flex-row flex-wrap gap-4">
                            <p>
                                {movie?.credits?.cast.slice(0, 5).map((cast) => cast.name).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;