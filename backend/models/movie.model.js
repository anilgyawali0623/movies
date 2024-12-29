import mongoose, { Schema } from "mongoose";
const movie = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    runningTime: {
      type: String,
      required: true,
    },
    ageRating: {
      type: String,
      required: true,
      enum: ["PG", "Adult"],
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movie);
