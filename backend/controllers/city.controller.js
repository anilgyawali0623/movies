import { City } from "../models/city.model.js";
import { Cinema } from "../models/cinema.model.js";
 import mongoose from "mongoose";
export const createCity = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ message: "City already exists" });
    }

    const city = new City({ name });
    await city.save();

    res.status(201).json({ message: "City created successfully", city });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the city",
      error: error.message,
    });
  }
};



export const addCinemasToCity = async (req, res) => {
  try {
    const { cityId } = req.params; // Get city ID from params
    const { cinemas } = req.body; // Get cinemas array from request body
 console.log(cinemas)
    // Validate city ID format
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: "Invalid city ID format" });
    }

    // Check if city exists
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: `City with ID ${cityId} not found` });
    }
    // Validate cinemas array
    if (!cinemas || !Array.isArray(cinemas) || cinemas.length === 0) {
      return res.status(400).json({ message: "Cinemas array is required and should not be empty" });
    }

    // Filter invalid cinema IDs
     console.log(mongoose.Types.ObjectId.isValid("6776c5f0ce11dde0c0c13158"))
     const invalidCinemaIds = cinemas.filter((cinema) => !mongoose.Types.ObjectId.isValid(cinema._id));
      console.log(`invalid cinema id ${invalidCinemaIds}`)
    if (invalidCinemaIds.length > 0) {
      return res.status(400).json({
        message: "Some cinema IDs are invalid",
        invalidCinemaIds,
      });
    }

    // Check if the cinemas exist in the Cinema model
    const validCinemas = await Cinema.find({ _id: { $in: cinemas } });
    if (validCinemas.length !== cinemas.length) {
      const missingCinemas = cinemas.filter(
        (cinemaId) => !validCinemas.some((cinema) => cinema._id.equals(cinemaId))
      );
      return res.status(400).json({
        message: "Some cinemas do not exist in the database",
        missingCinemas,
      });
    }

    // Add cinemas to the city's cinemas array (avoid duplicates)
    city.cinemas = [...new Set([...city.cinemas, ...cinemas])];

    // Save the updated city document
    await city.save();

    res.status(200).json({
      message: "Cinemas added to city successfully",
      city,
    });
  } catch (error) {
    console.error("Error adding cinemas to city:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};



export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    console.log(cities);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching cities",
      error: error.message,
    });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findByIdAndDelete(id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the city",
      error: error.message,
    });
  }
};
