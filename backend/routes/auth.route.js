import express from "express";
import {
  login,
  register,
  getMe,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protectAuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectAuthMiddleware, getMe);
router.post("/logout", protectAuthMiddleware, logout);
router.post("/refresh-token", refreshToken);

export default router;
