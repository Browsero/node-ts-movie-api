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

/**
 * It takes a request object and an array of genres and validates the request object against the genres
 * array
 * @param {any} requestObject - The object that is being validated.
 * @param {string[]} genresArray - An array of strings that are the genres that are allowed to be added
 * to the database.
 * @returns The return type is MovieValidateTemplate.
 */
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

/**
 * It takes a request object, field name, field type, and a boolean value. It validates field based on provided arguments.
 * @param {any} requestObject - The object that is being validated.
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} fieldType - string,
 * @param [required=true] - boolean - whether or not the field is required
 * @returns Nothing.
 */
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

/**
 * It validates that the "genres" field in the request object is an array of strings.
 * @param {any} requestObject - The object that contains the field to be validated.
 * @param {string[]} genresArray - string[] - this is the array of genres that the user is trying to
 * add to the database.
 * @param [required=true] - boolean - if the field is required or not
 */
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
