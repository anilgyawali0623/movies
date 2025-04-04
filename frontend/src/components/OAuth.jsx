import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log("Google User:", resultsFromGoogle.user);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
       console.log("google", data);
      if (res.ok) {
         console.log("google is working")
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("Google Auth Error:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 mt-2"
    >
      <AiFillGoogleCircle className="text-xl" />
      Continue with Google
    </button>
  );
}
