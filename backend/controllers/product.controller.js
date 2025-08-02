import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";

const creatProducts = asyncHandler(async (req, res) => {});

const getProducts = asyncHandler(async (req, res) => {});

const getProductById = asyncHandler(async (req, res) => {});

const deleteProductById = asyncHandler(async (req, res) => {});

export { creatProducts, getProducts, getProductById, deleteProductById };
