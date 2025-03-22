import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { hideSignUp } from "../redux/user/userSlice";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "./OAuth";

function SignUpPage() {
  const isSignUpVisible = useSelector((state) => state.user.isSignUpVisible);
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  if (!isSignUpVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstname ||
      !formData.lastname
    ) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        navigate("/");
        dispatch(signInSuccess(data));
        console.log(" this is the sign up");
        setSuccessMessage("account created successfully.");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Date of Birth</label>
            <div className="relative w-full">
              <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full px-6 py-2 border rounded-lg pr-10"
                placeholderText="Select your date of birth"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-red-500 mt-2 text-sm">{successMessage}</p>
        )}

        <button
          onClick={() => dispatch(hideSignUp())}
          className="mt-4 w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
        <OAuth />
      </div>
    </div>
  );
}

export default SignUpPage;
