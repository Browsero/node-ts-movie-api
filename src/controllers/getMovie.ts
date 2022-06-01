import { Request, Response } from "express";

const getMovie = (req: Request, res:Response) => {res.send("Hello World")}
export default getMovie;