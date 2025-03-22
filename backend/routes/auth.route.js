import express from "express";
import {
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
  signup,
  google,
} from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/forgot-password/send-otp", sendForgotPasswordOTP);
router.post("/verify-password", verifyForgotPasswordOTP);
router.post("/reset-password", resetPassword);
router.post("/google", google);
export default router;
