import { Movie } from "../models/movie.model.js";
import { errorHandler } from "../utils/error.js";

export const addMovie = async (req, res, next) => {
  try {
    const {
      name,
      image,
      runningTime,
      ageRating,
      language,
      genre,
      cast,
      director,
      description,
    } = req.body;

    // Check if required fields are provided
    if (!name || !runningTime || !language || !genre) {
      return next(errorHandler(400, "Missing required fields"));
    }

    // Create the new movie instance
    const newMovie = new Movie({
      name,
      image,
      runningTime,
      ageRating,
      language,
      genre,
      cast,
      director,
      description,
    });

    await newMovie.save();

    return res.status(201).json({
      success: true,
      message: "Movie saved successfully",
      movie: newMovie,
    });
  } catch (error) {
    next(errorHandler(500, "Internal server error"));
  }
};
