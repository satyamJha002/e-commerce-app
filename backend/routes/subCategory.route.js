import express from "express";
import { admin, protectAuthMiddleware } from "../middleware/authMiddleware.js";
import {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategories.controller.js";

const router = express.Router();

router.post(
  "/create-sub-categories",
  protectAuthMiddleware,
  admin,
  createSubCategory
);

router.get(
  "/get-all-sub-categories",
  protectAuthMiddleware,
  admin,
  getAllSubCategory
);

router.put(
  "/update-sub-categories/:id",
  protectAuthMiddleware,
  admin,
  updateSubCategory
);

router.delete(
  "/delete-sub-categories/:id",
  protectAuthMiddleware,
  admin,
  deleteSubCategory
);

export default router;
