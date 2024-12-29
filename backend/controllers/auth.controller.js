import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  console.log("dasfasf");

  const { firstname, lastname, email, password, dob } = req.body;
  if (!firstname || !lastname || !email || !password || !dob) {
    next(errorHandler(400, "All fields are required"));
  }
  console.log(firstname, lastname, email, password, dob);
  const hashedPassword = bcrypt.hashSync(password, 10);
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
