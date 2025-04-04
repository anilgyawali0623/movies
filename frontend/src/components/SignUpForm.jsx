import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignUpForm({ handleSubmit, handleChange, handleDateChange, formData, loading }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstname"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your first name"
            value={formData.firstname || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your last name"
            value={formData.lastname || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your password"
            value={formData.password || ""}
            onChange={handleChange}
          />
        </div>

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

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Create Account"}
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
