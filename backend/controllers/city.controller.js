import { City } from "../models/city.model.js";

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
    res.status(500).json({ message: "An error occurred while creating the city", error: error.message });
  }
};

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 }); 
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching cities", error: error.message });
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
    res.status(500).json({ message: "An error occurred while deleting the city", error: error.message });
  }
};
