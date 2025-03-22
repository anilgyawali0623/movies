// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREVASE_API_KEY,
  authDomain: "qfx-cinema.firebaseapp.com",
  projectId: "qfx-cinema",
  storageBucket: "qfx-cinema.firebasestorage.app",
  messagingSenderId: "702993012625",
  appId: "1:702993012625:web:fd5604c525ec24c9236c30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
