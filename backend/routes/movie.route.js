import express from "express";
import { addMovie } from "../controllers/movie.controller.js";
const router = express.Router();
router.post("/addmovie", addMovie);
export default router;
