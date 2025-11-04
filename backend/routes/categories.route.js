import express from "express";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  updateAllCategoriesProductCount,
} from "../controllers/categories.controller.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create-category",
  protectAuthMiddleware,
  admin,
  uploadSingle("categoryImage"),
  createCategory
);

router.get(
  "/get-list-of-categories",
  protectAuthMiddleware,
  admin,
  getCategories
);

router.delete(
  "/delete-category/:id",
  protectAuthMiddleware,
  admin,
  deleteCategory
);

router.patch(
  "/update-category",
  protectAuthMiddleware,
  admin,
  uploadSingle("categoryImage"),
  updateCategory
);

// Optionals

router.post(
  "/update-product-counts",
  protectAuthMiddleware,
  admin,
  updateAllCategoriesProductCount
);

export default router;
