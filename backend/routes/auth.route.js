import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  login,
  logout,
  signup,
  checkAuth,
  forgotPassword,
  resetPassword,
  verifyEmail
} from "../controllers/auth.controllers.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
