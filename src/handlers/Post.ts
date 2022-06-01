import { Schema, model } from "mongoose";

interface IMovie {
  id: string;
  name: string;
}

const movieSchema = new Schema<IMovie>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const Movie = model("Movie", movieSchema);

export default Movie;
