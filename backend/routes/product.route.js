import express from "express";
import {
  creatProducts,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProductsByCategory,
  getProductsByCategoryName,
  searchProducts,
} from "../controllers/product.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";
import { uploadMultiple } from "../middleware/uploadMiddleware.js";
import { cacheMiddleware } from "../middleware/cache.js";

const router = express.Router();

router.post(
  "/create",
  protectAuthMiddleware,
  admin,
  uploadMultiple("images"),
  creatProducts,
);
router.get("/allproducts", cacheMiddleware(60), getProducts);
router.get("/getproductdetails/:id", cacheMiddleware(120), getProductById);
router.delete(
  "/deleteproduct/:id",
  protectAuthMiddleware,
  admin,
  deleteProductById,
);
router.patch(
  "/updateproduct/:id",
  protectAuthMiddleware,
  admin,
  uploadMultiple("images"),
  updateProductById,
);
router.get(
  "/products-by-category",
  cacheMiddleware(60),
  getProductsByCategory,
);

// Public endpoint - get products by category name
router.get(
  "/by-category-name/:categoryName",
  cacheMiddleware(60),
  getProductsByCategoryName,
);

// Public endpoint - search products
router.get("/search", searchProducts);

export default router;
