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
    const { movieId, showtimes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid cinema ID format" });
    }

    const cinema = await Cinema.findById(id);
    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }


    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      {
        $push: {
          schedule: {
            movie: movieId,
            showtimes: showtimes,
          },
        },
      },
      { new: true }
    );

    if (!updatedCinema) {
      return res.status(500).json({ message: "Failed to update cinema" });
    }

    res.status(200).json({
      message: "Movie added to cinema successfully",
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
      .populate("city", "name")
      .populate("schedule.movie", "name");
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
    const cinema = await Cinema.findById(id)
      .populate("city", "name")
      .populate("schedule.movie", "name");

    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    res.status(200).json(cinema);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the cinema",
      error: error.message,
    });
  }
};
