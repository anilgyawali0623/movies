import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import authRoutes from "../routes/auth.route.js";
import movieRoutes from "../routes/movie.route.js";
import cityRoutes from "../routes/city.route.js";
const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB connection failed");
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

app.use("/auth", authRoutes);
app.use("/movie", movieRoutes);
app.use('/city', cityRoutes);
app.use(cors());