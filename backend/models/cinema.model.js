import mongoose from "mongoose";

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
   
    schedule: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie", 
        },
        showtimes: [
          {
            day: {
              type: String,
            },
            times: [
              {
                type: String,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Cinema = mongoose.model("Cinema", cinemaSchema);
