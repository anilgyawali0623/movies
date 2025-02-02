import mongoose from "mongoose";
import { Cinema } from "../models/cinema.model.js";

import { City } from "../models/city.model.js";
import { Movie } from "../models/movie.model.js";

export const createCinema = async (req, res) => {
  try {
    const { name } = req.body;

    const cinema = new Cinema({ name });
    await cinema.save();

    res.status(201).json({ message: "Cinema created successfully", cinema });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the cinema",
      error: error.message,
    });
  }
};

export const addMovieToCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cinema ID format" });
    }

    const cinema = await Cinema.findById(id);
    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    const newSchedule = await Promise.all(
      schedule.map(async (item) => {
        const { movieId, showtimes } = item;

        const movie = await Movie.findById(movieId);
        if (!movie) {
          throw new Error(`Movie with ID ${movieId} not found`);
        }

        if (!showtimes || !Array.isArray(showtimes) || showtimes.length === 0) {
          throw new Error("Showtimes must be an array of strings.");
        }

        return { movieId, showtimes };
      })
    );

    cinema.schedule.push(...newSchedule);

    const updatedCinema = await cinema.save();

    res.status(200).json({
      message: "Movies added to cinema successfully",
      cinema: updatedCinema,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      message: "An error occurred while adding the movie",
      error: error.message,
    });
  }
};

export const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find()
   
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching cinemas",
      error: error.message,
    });
  }
};

export const getCinemaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate cinema ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cinema ID format" });
    }

    // Find the cinema and populate the movie details
    const cinema = await Cinema.findById(id).populate("schedule.movieId");

    // Check if cinema exists
    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }
    

    // Return the cinema with populated movie details
    res.status(200).json({ cinema });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching the cinema",
      error: error.message,
    });
  }
};
