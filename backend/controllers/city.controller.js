import { City } from "../models/city.model.js";
import { Cinema } from "../models/cinema.model.js";
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
    res
      .status(500)
      .json({
        message: "An error occurred while creating the city",
        error: error.message,
      });
  }
};

export const addCinemasToCity = async (req, res) => {
  try {
    const { cityId } = req.params; 
    const { cinemas } = req.body; 

    
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    
    const validCinemas = await Cinema.find({ _id: { $in: cinemas } });
    const validCinemaIds = validCinemas.map((cinema) => cinema._id.toString());

    if (validCinemaIds.length !== cinemas.length) {
      return res.status(400).json({
        message: "Some cinemas are invalid or do not exist",
        invalidCinemas: cinemas.filter(
          (cinemaId) => !validCinemaIds.includes(cinemaId)
        ),
      });
    }

    
    city.cinemas = [...new Set([...city.cinemas, ...cinemas])];
    await city.save();

    res.status(200).json({
      message: "Cinemas added to city successfully",
      city,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};



export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
     console.log(cities)
    res.status(200).json(cities);
  } catch (error) {
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the city",
        error: error.message,
      });
  }
};
