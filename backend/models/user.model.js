import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const user = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
       default:"",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    dob: {
      type: Date,
  

      
    },
    refreshToken: {
      type: String,
    },
     profilePicture:{
       type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
     }
  },
  { timestamps: true }
);

// we generate the access token and the refresh token

user.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    },
    process.env.ACCESS.TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
  

user.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", user);
