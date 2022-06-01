import { Request, Response } from "express";
import MovieTemplate, { validateMovie } from "../types/movie";
import { v4 as uuidv4 } from "uuid";
import Movie from "../handlers/Post";

const addMovie = (req: Request, res: Response) => {
  const { name, year, runtime, director, actors, plot, posterURL, genres } =
    req.body;
  const generatedId = uuidv4();
  const newMovie = new MovieTemplate(
    generatedId,
    name,
    Number(year),
    Number(runtime),
    director,
    { actors, plot, posterURL },
    genres
  );
  const ValidatedMovies = validateMovie(newMovie, newMovie.genres);
  const movie = new Movie({
    id: generatedId,
    name: ValidatedMovies.name,
  });
  movie.save();
  res.send("Success");
};
export default addMovie;
