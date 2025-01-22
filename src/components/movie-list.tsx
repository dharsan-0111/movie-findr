'use client'

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMovieContext } from "./movie-provider";

const MovieList: React.FC = () => {
  const { movies, addMovie, removeMovie } = useMovieContext();

  return (
    <Card className="glass-morphism">
      <CardContent className="p-4">
        <div className="flex flex-row items-start justify-between mb-4">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-lg font-semibold">{`Movies in Wheel`}</h3>
            <p className="text-muted-foreground text-sm">{`You can also customise the selection`}</p>
          </div>
          <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant="outline"
                            className="glass-morphism"
                            disabled
                            onClick={() => {}}
                        >
                            Add Movies
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Coming Soon
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="glass-morphism">
                <Plus className="mr-2 h-4 w-4" />
                Add Movies
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Movies to Wheel</DialogTitle>
              </DialogHeader>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search movies..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie1">
                    The Shawshank Redemption
                  </SelectItem>
                  <SelectItem value="movie2">The Godfather</SelectItem>
                  <SelectItem value="movie3">The Dark Knight</SelectItem>
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog> */}
        </div>
        <ScrollArea className="h-[120px] w-full rounded-md">
          <div className="grid grid-cols-1 gap-2 pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies &&
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm"
                >
                    <div className="flex flex-row items-center gap-2">
                        <span>{movie.title}</span>
                        <span className="text-muted-foreground">
                            {moment(movie.release_date).format("YYYY")}
                        </span>
                    </div>
                    <Button onClick={() => removeMovie(movie.id)} variant='ghost' size='icon'>
                        <Trash className='h-4 w-4' />
                    </Button>
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MovieList;
