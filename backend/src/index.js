import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "../routes/auth.route.js";
import movieRoutes from "../routes/movie.route.js";
import cityRoutes from "../routes/city.route.js";
import cinemaRoutes from "../routes/cinema.route.js";

const app = express();
dotenv.config();
 
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
app.use('/cinema', cinemaRoutes);

app.use(cors());


import crypto from "crypto";
import nodemailer from "nodemailer";
console.log(process.env.EMAIL_USER);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (recipientEmail) => {
  try {
    const otp = generateOTP();

    // Step 4: Email options
    const mailOptions = {
      from: "ANIL GYAWALI", // Sender
      to: recipientEmail,
      subject: "Your OTP Code",
      html: `<h3>Your OTP Code</h3><p>${otp}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};



  