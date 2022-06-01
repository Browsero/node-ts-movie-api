import { Request, Response } from "express";
import MovieTemplate, { validateMovie } from "../types/movie";
import { v4 as uuidv4 } from "uuid";
import Movie from "../handlers/Post";

/**
 * It takes a request and a response, and then it takes the body of the request and creates a
 * new movie object. Then it validates the movie object and saves it to the movie
 * database.
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response
 */
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
  const ValidatedMovie = validateMovie(newMovie, newMovie.genres);
  const movie = new Movie(ValidatedMovie);
  movie
    .save()
    .then((response) => {
      res.send(`The object was successfully added to the database. Movie ID: ${generatedId}`);
    })
    .catch((err) => console.error(err));
};
export default addMovie;
