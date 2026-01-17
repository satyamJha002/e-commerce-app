import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/dashboard/stats - Get dashboard statistics (Admin only)
router.get("/stats", protectAuthMiddleware, admin, getDashboardStats);

export default router;
