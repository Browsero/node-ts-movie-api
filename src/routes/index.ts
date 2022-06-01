import { Router } from "express";
import addMovie from "../controllers/addMovie";
import getMovie from "../controllers/getMovie";

const router = Router();

router.get("/", getMovie).post("/", addMovie);

export default router;
