import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignInForm({ handleSubmit, handleChange, formData, loading }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Sign In"}
        </button>
      </form>
    </>
  );
}

export default SignInForm;
