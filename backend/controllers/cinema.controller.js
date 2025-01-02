import { Cinema } from "../models/cinema.model.js";

import { City } from "../models/city.model.js";
 
export const createCinema = async (req, res) => {
  try {
    const { name } = req.body;

    
    const cinema = new Cinema({ name });
    await cinema.save();

    res.status(201).json({ message: "Cinema created successfully", cinema });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the cinema", error: error.message });
  }
};


export const addMovieToCinema = async (req, res) => {
  try {
    const { cinemaId } = req.params; 
    const { movieId, schedule } = req.body; 
    // Validate the request
    if (!movieId || !schedule) {
      return res.status(400).json({ message: "Movie ID and schedule are required" });
    }

    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaId,
      {
        $push: {
          schedule: {
            movie: movieId,
            showtimes: schedule,
          },
        },
      },
    ).populate("schedule.movie"); 

    if (!updatedCinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    res.status(200).json({
      message: "Movie added to cinema schedule successfully",
      cinema: updatedCinema,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

export const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find()
      .populate("city", "name")
      .populate("schedule.movie", "name");
    res.status(200).json(cinemas);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching cinemas", error: error.message });
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
    res.status(500).json({ message: "An error occurred while fetching the cinema", error: error.message });
  }
};
