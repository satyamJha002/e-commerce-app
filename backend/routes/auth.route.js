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

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", protectAuthMiddleware, getMe);
router.get("/users", protectAuthMiddleware, admin, getAllUsers);
router.get("/users/:id", protectAuthMiddleware, admin, getUserById);
router.post("/logout", protectAuthMiddleware, logout);
router.post("/refresh-token", refreshToken);

export default router;
