import MovieDetails from "@/components/MovieDetails";
import { Movie } from "@/interfaces/movie-data_interface";
import { getMovieById } from "@/lib/server/scripts";

const MovieDetailsPage = async (props: { params: Promise<{ id: string }> }): Promise<React.JSX.Element> =>
{
    const { id } = await props?.params;
    let movieData: Movie | null = null;

    try {
        movieData = await getMovieById(parseInt(id));
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            {movieData ? <MovieDetails movie={movieData} /> : <p>Movie not found</p>}
        </div>
    )
};

export default MovieDetailsPage;