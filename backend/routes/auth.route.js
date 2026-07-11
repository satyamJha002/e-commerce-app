import express from "express";
import {
  login,
  register,
  getMe,
  logout,
  refreshToken,
  googleLogin,
  getAllUsers,
  getUserById,
} from "../controllers/auth.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/google", googleLogin);
router.get("/me", protectAuthMiddleware, getMe);
router.get("/users", protectAuthMiddleware, admin, getAllUsers);
router.get("/users/:id", protectAuthMiddleware, admin, getUserById);
router.post("/logout", protectAuthMiddleware, logout);
router.post("/refresh-token", authLimiter, refreshToken);

export default router;
