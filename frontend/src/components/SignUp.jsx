import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSignUp } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "./OAuth";
 import SignInForm from "./SignInForm";
  import SignUpForm from "./SIgnUpForm";
function AuthPage() {
  const isSignUpVisible = useSelector((state) => state.user.isSignUpVisible);
  const [isSignUp, setIsSignUp] = useState(true); // Initially show SignUp form
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isSignUpVisible) return null; // Hide modal if not visible

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        setSuccessMessage(isSignUp ? "Account created successfully!" : "Login successful!");
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transition-all duration-300 relative">
        {/* Conditionally render the SignUp or SignIn form based on isSignUp */}
        <div className={isSignUp ? "form-container active" : "form-container"}>
          <SignUpForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            formData={formData}
            loading={loading}
          />
        </div>
        <div className={!isSignUp ? "form-container active" : "form-container"}>
          <SignInForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} loading={loading} />
        </div>

        {errorMessage && <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2 text-sm">{successMessage}</p>}

        <OAuth />

        <p className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button className="text-blue-500 font-semibold" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button className="text-blue-500 font-semibold" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </>
          )}
        </p>

        <button
          onClick={() => dispatch(hideSignUp())}
          className="mt-4 w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
