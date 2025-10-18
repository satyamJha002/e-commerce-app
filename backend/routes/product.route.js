import express from "express";
import {
  creatProducts,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/product.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectAuthMiddleware, admin, creatProducts);
router.get("/allproducts", getProducts);
router.get("/:productId", getProductById);
router.delete("/:productId", protectAuthMiddleware, admin, deleteProductById);
router.patch("/product/:id", protectAuthMiddleware, admin, updateProductById);

export default router;
