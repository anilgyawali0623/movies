import mongoose from "mongoose";
import { Movie } from "./movie.model.js";
import { City } from "./city.model.js";
const cinema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    schedule: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true,
        },
        showtimes: [
          {
            day: {
              type: String,
              required: true,
            },
            times: [
              {
                type: String,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export  const Cinema = mongoose.model("Cinema", cinema);
