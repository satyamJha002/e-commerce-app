import express from "express";
import {
  creatProducts,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/product.controller.js";
import { protectAuthMiddleware, admin } from "../middleware/authMiddleware.js";
import { uploadMultiple } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protectAuthMiddleware,
  admin,
  uploadMultiple("images"),
  creatProducts
);
router.get("/allproducts", getProducts);
router.get("/getproductdetails/:id", getProductById);
router.delete(
  "/deleteproduct/:id",
  protectAuthMiddleware,
  admin,
  deleteProductById
);
router.patch(
  "/updateproduct/:id",
  protectAuthMiddleware,
  admin,
  uploadMultiple("images"),
  updateProductById
);

export default router;
