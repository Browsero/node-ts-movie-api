import WebError from "../handlers/Error";

interface MovieOptionalFields {
  actors?: string;
  plot?: string;
  posterURL?: string;
}

interface MovieValidateTemplate {
  name: string;
  year: number;
  runtime: number;
  director: string;
  actors?: string;
  plot?: string;
  posterURL?: string;
  genres: string[];
}

export default class MovieTemplate {
  id: string;
  name: string;
  year: number;
  runtime: number;
  director: string;
  actors?: string;
  plot?: string;
  posterURL?: string;
  genres: string[];

  constructor(
    id: string,
    name: string,
    year: number,
    runtime: number,
    director: string,
    { actors, plot, posterURL }: MovieOptionalFields,
    genres: string[]
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.runtime = runtime;
    this.director = director;
    this.actors = actors;
    this.plot = plot;
    this.posterURL = posterURL;
    this.genres = genres;
  }
}

export const validateMovie = (requestObject: any, genresArray: string[]) => {
  if (!(typeof requestObject !== "object") && !Array.isArray(genresArray))
    throw new WebError("Invalid Genres or request data type.", 400);

  validateField(requestObject, "name", "string");
  validateField(requestObject, "year", "number");
  validateField(requestObject, "runtime", "number");
  validateField(requestObject, "director", "string");
  validateField(requestObject, "actors", "string", false);
  validateField(requestObject, "plot", "string", false);
  validateField(requestObject, "posterURL", "string", false);
  validateGenreField(requestObject, genresArray);

  return requestObject as MovieValidateTemplate;
};

const validateField = (
  requestObject: any,
  fieldName: string,
  fieldType: string,
  required = true
) => {
  if (!required) {
    if (fieldName in requestObject) return;
  }
  if (!(fieldName in requestObject))
    throw new WebError(`Required field ${fieldName} not provided.`, 400);
  if (typeof requestObject[fieldName] !== fieldType) {
    throw new WebError(
      `Provided field ${fieldName} value is not valid a valid type. Expected ${fieldType}, got ${typeof requestObject[
        fieldName
      ]}}.`,
      400
    );
  }
};

const validateGenreField = (
  requestObject: any,
  genresArray: string[],
  required = true
) => {
  validateField(requestObject, "genres", "object", required);
  if (!Array.isArray(requestObject["genres"]))
    throw new WebError("Provided genres field value is not array.");
  for (const genre of genresArray) {
    if (typeof genre !== "string") {
      throw new WebError(
        "Provided genres array is not an array of strings!",
        400
      );
    }
  }
};
