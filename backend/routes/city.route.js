import express from "express";
import {
  createCity,
  getAllCities,
  deleteCity,
} from "../controllers/city.controller.js";

const router = express.Router();

router.post("/create", createCity); 
router.get("/allcity", getAllCities); 
router.delete("/:id", deleteCity); // Delete a city

export default router;