import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
     console.log("dasfasf")

  const {firstname, lastname, email, password, dob } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !dob
  ) {
    return res.status(400).json({ message: 'All fields are required' });
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
    return res.status(500).json({ message: "someproblem occured" });
  }
};
