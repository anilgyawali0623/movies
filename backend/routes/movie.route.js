import express from "express";
import { addMovie, getAllMovies } from "../controllers/movie.controller.js";
const router = express.Router();
router.post("/addmovie", addMovie);
router.get("/getallmovies", getAllMovies);
export default router;
