import express from "express";
import {
  createCinema,
  addMovieToCinema,
  getAllCinemas,
  getCinemaById,
} from "../controllers/cinema.controller.js";

const router = express.Router();

router.post("/", createCinema); 
router.put("/:id/add-movie", addMovieToCinema); 
router.get("/allcinema", getAllCinemas); 
router.get("/:id", getCinemaById); 

export default router;
