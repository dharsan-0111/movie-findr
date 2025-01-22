import MovieList from "@/components/movie-list";
import { MovieProvider } from "@/components/movie-provider";
import { MovieToolbar } from "@/components/movie-toolbar";
import MovieWheel from "@/components/SpinningWheel";
import { ThemeProvider } from "@/components/theme-provider";
import { Movie } from "@/interfaces/movie-data_interface";
import { generateRandomMovies } from "@/lib/utils";

export default async function Page() {

  let movieResponse: Movie[] | undefined = undefined;

  try {
    movieResponse = await generateRandomMovies();
  } catch (error) {
    console.log(error);
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-background to-muted transition-colors duration-300">
        <MovieProvider initialMovies={movieResponse || []}>
          <div className="relative w-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Content */}
            <div className="relative w-full px-4 py-8 md:py-16">
              <div className="mx-auto max-w-7xl space-y-8">
                <div className="text-center">
                  <h1 className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-6xl">
                    Movie Roulette
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    Spin the wheel to discover your next movie adventure!
                  </p>
                </div>

                <MovieToolbar />

                <div className="mt-8">
                  <MovieList />
                </div>

                <div className="mt-16">
                  <MovieWheel />
                </div>

                <footer className="mt-16 text-center text-sm text-muted-foreground">
                  <p>Click the button to spin the wheel and get a random movie suggestion.</p>
                </footer>
              </div>
            </div>
          </div>
        </MovieProvider>
      </div>
    </ThemeProvider>
  )
}

