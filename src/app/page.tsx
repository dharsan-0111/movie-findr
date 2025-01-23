import MovieList from "@/components/movie-list";
import { MovieProvider } from "@/components/movie-provider";
import { MovieToolbar } from "@/components/movie-toolbar";
import MovieWheel from "@/components/SpinningWheel";
import { ThemeProvider } from "@/components/theme-provider";
import { Movie } from "@/interfaces/movie-data_interface";
import { generateRandomMovies } from "@/lib/utils";
import { Film } from "lucide-react";

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
                  <p>
                    Click the button to spin the wheel and get a random movie
                    suggestion.
                  </p>
                </footer>

                <footer className="mt-16 border-t border-cyan-500/20 py-8">
                  <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex items-center gap-2">
                        <Film className="h-5 w-5 text-cyan-500" />
                        <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-lg font-bold text-transparent">
                          Movie Roulette
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <p>Powered by TMDB API</p>
                        <p>
                          © {new Date().getFullYear()} Movie Roulette. All
                          rights reserved.
                        </p>
                      </div>
                      {/* <div className="flex gap-4 text-xs text-muted-foreground">
                        <a
                          href="#"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          Privacy Policy
                        </a>
                        <a
                          href="#"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          Terms of Service
                        </a>
                        <a
                          href="#"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          Contact
                        </a>
                      </div> */}
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </MovieProvider>
      </div>
    </ThemeProvider>
  );
}
