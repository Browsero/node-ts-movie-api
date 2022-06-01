import { Schema, model } from "mongoose";

interface IMovie {
  id: string;
  name: string;
  year: number;
  runtime: number;
  director: string;
  actors?: string;
  plot?: string;
  posterURL?: string;
  genres: string[];
}

const movieSchema = new Schema<IMovie>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  runtime: { type: Number, required: true },
  director: { type: String, required: true },
  actors: { type: String },
  plot: { type: String },
  posterURL: { type: String },
  genres: [{ type: String, required: true }],
});

const Movie = model("Movie", movieSchema);

export default Movie;
