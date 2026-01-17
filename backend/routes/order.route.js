import express from "express";
import {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/order.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protectAuthMiddleware, createOrder);
router.post("/verify-payment", protectAuthMiddleware, verifyPayment);
router.get("/myorders", protectAuthMiddleware, getMyOrders);
router.get("/:id", protectAuthMiddleware, getOrderById);

// Admin routes
router.get("/", protectAuthMiddleware, admin, getAllOrders);
router.put("/:id/deliver", protectAuthMiddleware, admin, updateOrderToDelivered);

export default router;
