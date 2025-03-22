import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendOTP } from "../src/index.js";

import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, dob } = req.body;
  if (!firstname || !lastname || !email || !password || !dob) {
    next(errorHandler(400, "All fields are required"));
  }
  console.log(firstname, lastname, email, password, dob);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    dob,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

const otpStorage = new Map();

export const sendForgotPasswordOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    const otp = await sendOTP(email);

    otpStorage.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    res.status(200).json({
      message: "OTP sent successfully. Please check your email.",
      email,
    });
  } catch (error) {
    console.error("Error in sendForgotPasswordOTP:", error);
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const verifyForgotPasswordOTP = (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // Get OTP data from memory
  const storedData = otpStorage.get(email);

  if (!storedData) {
    return res.status(404).json({ message: "OTP not found or expired" });
  }

  if (storedData.otp !== otp || storedData.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // OTP is valid, delete it from memory
  otpStorage.delete(email);

  res.status(200).json({
    message: "OTP verified successfully. Proceed to reset your password.",
  });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const password = bcryptjs.hashSync(newPassword, 10);
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      message: "Failed to reset password",
      error: error.message,
    });
  }
  s;
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.ACESS_TOKEN_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstname:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.ACESS_TOKEN_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
