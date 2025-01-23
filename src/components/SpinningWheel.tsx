// "use client";

// import { useState, useRef } from "react";
// import { Motion, spring } from "react-motion";
// import { Button } from "@/components/ui/button";
// import { Film, Loader2, Clock, Star, Users } from "lucide-react";
// import Image from "next/image";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Movie } from "@/interfaces/movie-data_interface";
// import moment from "moment";
// import { useMovieContext } from "./movie-provider";

// const MovieWheel: React.FC = (): React.JSX.Element => {
//   const { movies } = useMovieContext();

//   const [rotation, setRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const wheelRef = useRef<HTMLDivElement>(null);

//   const posterUrl = `https://image.tmdb.org/t/p/w500`;

//   const spinWheel = () => {
//     if (isSpinning) return;

//     if (movies) {
//       setIsSpinning(true);
//       setSelectedMovie(null);
//       setShowDetails(false);

//       const spinRotation =
//         360 * (Math.floor(Math.random() * 3) + 3) + Math.random() * 360;
//       setRotation(rotation + spinRotation);

//       setTimeout(async () => {
//         const normalizedRotation = (rotation + spinRotation) % 360;
//         const segment = Math.floor((normalizedRotation / 360) * movies.length);
//         const selected = movies[movies.length - 1 - segment];

//         try {
//           const response = await fetch(
//             `/api/getMovieDetails?movieId=${selected.id}`
//           );
//           const selectedMovieDetails = await response.json();

//           if (selectedMovieDetails) {
//             setSelectedMovie(selectedMovieDetails);
//           }
//         } catch (error) {
//           console.error("Failed to fetch movie details:", error);
//         }

//         setIsSpinning(false);
//         setShowDetails(true);
//       }, 3000);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center gap-4 md:gap-8 h-full w-full">
//         <div className="relative w-full max-w-[280px] md:max-w-none">
//           <div
//             ref={wheelRef}
//             className="relative flex items-center justify-center mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl md:h-96 md:w-96"
//           >
//             <Motion
//               style={{
//                 rotation: spring(rotation, { stiffness: 10, damping: 10 }),
//               }}
//             >
//               {(interpolated) => (
//                 <div
//                   className="absolute inset-0"
//                   style={{
//                     transform: `rotate(${interpolated.rotation}deg)`,
//                   }}
//                 >
//                   {movies &&
//                     movies?.length > 0 &&
//                     movies.map((movie, index) => {
//                       return (
//                         <div
//                           key={movie.id}
//                           className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-32 sm:w-32 md:h-48 md:w-48"
//                           style={{
//                             // transform: `rotate(${(360 / movies.length) * index}deg) translateY(-90px) md:translateY(-120px)`,
//                             transform: `rotate(${
//                               (360 / movies.length) * index
//                             }deg)`,
//                             clipPath: `polygon(50% 0%, 100% 100%, 0% 100%)`,
//                           }}
//                         >
//                           <div className="relative h-full w-full overflow-hidden rounded-lg">
//                             <Image
//                               src={
//                                 `${posterUrl}${movie?.poster_path}` ||
//                                 "/placeholder.svg"
//                               }
//                               alt={movie.title}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               )}
//             </Motion>
//             <div className="absolute left-1/2 top-0 h-8 w-4 -translate-x-1/2 transform">
//               <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-white" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center gap-4">
//           <Button
//             size="lg"
//             onClick={spinWheel}
//             disabled={isSpinning}
//             className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 text-white transition-all hover:scale-105 hover:from-teal-600 hover:to-cyan-600"
//           >
//             {isSpinning ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Spinning...
//               </>
//             ) : (
//               <>
//                 <Film className="mr-2 h-4 w-4" />
//                 Spin the Wheel
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//       <Dialog open={showDetails} onOpenChange={setShowDetails}>
//         <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto p-4 md:p-6 sm:max-w-2xl">
//           {selectedMovie && (
//             <div className="grid gap-4 md:gap-6 md:grid-cols-2">
//               <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-lg md:max-w-none">
//                 <Image
//                   src={
//                     `${posterUrl}${selectedMovie?.poster_path}` ||
//                     "/placeholder.svg"
//                   }
//                   alt={selectedMovie.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex flex-col gap-3 md:gap-4">
//                 <div>
//                   <h2 className="text-xl font-bold md:text-2xl">
//                     {selectedMovie.title}
//                   </h2>
//                   <p className="text-xs md:text-sm text-muted-foreground">
//                     {moment(selectedMovie?.release_date).format("YYYY")}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3 md:gap-4">
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-3 w-3 md:h-4 md:w-4" />
//                     <span className="text-xs md:text-sm">
//                       {selectedMovie.runtime}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-500 text-yellow-500" />
//                     <span className="text-xs md:text-sm">
//                       {selectedMovie.vote_average}/10
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm md:text-base font-semibold">Plot</h3>
//                   <p className="text-xs md:text-sm text-muted-foreground">
//                     {selectedMovie.overview}
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-sm md:text-base font-semibold">
//                     Director
//                   </h3>
//                   <p className="text-xs md:text-sm text-muted-foreground">
//                     {
//                       selectedMovie.credits?.crew.filter(
//                         ({ job }) => job === "Director"
//                       )[0]?.name
//                     }
//                   </p>
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Users className="h-3 w-3 md:h-4 md:w-4" />
//                     <h3 className="text-sm md:text-base font-semibold">Cast</h3>
//                   </div>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {selectedMovie?.credits &&
//                       selectedMovie.credits.cast.map((actor) => (
//                         <span
//                           key={actor.id}
//                           className="rounded-full bg-muted px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs text-muted-foreground"
//                         >
//                           {actor.name}
//                         </span>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default MovieWheel;

"use client";

import { useState, useRef } from "react";
import { Motion, spring } from "react-motion";
import { Button } from "@/components/ui/button";
import { Film, Loader2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Movie } from "@/interfaces/movie-data_interface";
import { useMovieContext } from "./movie-provider";
import { DialogTitle } from "@radix-ui/react-dialog";

const MovieWheel: React.FC = (): React.JSX.Element => {

  const { movies } = useMovieContext();

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const posterUrl = `https://image.tmdb.org/t/p/w500`;

  const spinWheel = () => {
    if (isSpinning || !movies || movies.length === 0) return;

    setIsSpinning(true);
    setSelectedMovie(null);
    setShowDetails(false);

    const spinRotation =
      360 * (Math.floor(Math.random() * 3) + 3) + Math.random() * 360;
    setRotation(rotation + spinRotation);

    setTimeout(() => {
      const finalRotation = (rotation + spinRotation) % 360;
      // Calculate the angle of the pointer
      const pointerAngle = finalRotation % 360;

      // Map the pointer angle to the correct movie
      const segmentIndex = Math.floor((pointerAngle / 360) * movies.length);

      // Adjust the index if necessary (since we're spinning clockwise)
      const selected = movies[segmentIndex % movies.length];

      setSelectedMovie(selected);
      setIsSpinning(false);
      setShowDetails(true);
    }, 5000);
  };

  const sliceAngle = movies && movies.length > 0 ? 360 / movies.length : 0;

  return (
    <>
      <div className="flex flex-col items-center gap-4 md:gap-8 h-full w-full">
        {/* Wheel */}
        <div className="relative w-full max-w-[280px] md:max-w-none">
          <div
            ref={wheelRef}
            className="relative flex items-center justify-center mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl md:h-96 md:w-96"
          >
            <Motion
              style={{
                rotation: spring(rotation, { stiffness: 10, damping: 10 }),
              }}
            >
              {(interpolated) => (
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${interpolated.rotation}deg)`,
                  }}
                >
                  {movies?.map((movie, index) => {
                    const startAngle = sliceAngle * index;
                    const endAngle = startAngle + sliceAngle;

                    return (
                      <div
                        key={index}
                        className="absolute top-0 left-0 h-full w-full origin-center"
                        style={{
                          clipPath: `polygon(50% 50%, ${50 +
                            50 * Math.cos((Math.PI * startAngle) / 180)}% ${50 +
                            50 * Math.sin((Math.PI * startAngle) / 180)}%, ${50 +
                            50 * Math.cos((Math.PI * endAngle) / 180)}% ${50 +
                            50 * Math.sin((Math.PI * endAngle) / 180)}%)`,
                        }}
                      >
                        <div
                          className="relative h-full w-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          style={{
                            transform: `rotate(${startAngle + sliceAngle / 2}deg)`,
                          }}
                        >
                          <Image
                            src={
                              `${posterUrl}${movie.poster_path}` ||
                              "/placeholder.svg"
                            }
                            alt={movie.title}
                            fill
                            className="absolute top-0 left-0 w-full h-full object-cover clip-triangle"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Motion>
            {/* <div className="absolute left-1/2 top-0 h-8 w-4 -translate-x-1/2 transform">
              <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-white" />
            </div> */}
          </div>
        </div>

        {/* Spin Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={spinWheel}
            disabled={isSpinning}
            className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 text-white transition-all hover:scale-105 hover:from-teal-600 hover:to-cyan-600"
          >
            {isSpinning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Spinning...
              </>
            ) : (
              <>
                <Film className="mr-2 h-4 w-4" />
                Spin the Wheel
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto p-4 md:p-6 sm:max-w-2xl">
          <DialogTitle>
            Movie Details
          </DialogTitle>
          {selectedMovie && (
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-lg md:max-w-none">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div>
                  <h2 className="text-xl font-bold md:text-2xl">{selectedMovie.title}</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">{selectedMovie.release_date}</p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xs md:text-sm">Rating: {Math.round(selectedMovie.vote_average)}/10</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Overview</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{selectedMovie.overview}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieWheel;
