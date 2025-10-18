import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";

const creatProducts = asyncHandler(async (req, res) => {
  const user = req.user; //undefined

  console.log("Reason not creating product", user);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to creat this product");
  }

  const {
    name,
    description,
    keyFeatures,
    price,
    image,
    brand,
    category,
    countInStock,
    originalPrice,
    discount,
    badge,
  } = req.body;

  const requiredFields = {
    name,
    description,
    keyFeatures,
    price,
    image,
    brand,
    category,
    countInStock,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([__, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const transformedKeyFeatures = Array.isArray(keyFeatures)
    ? keyFeatures
    : typeof keyFeatures === "string"
    ? keyFeatures
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s)
    : [];

  const transformedImages = Array.isArray(image)
    ? image
    : [image].filter(Boolean);

  const calculatedDiscount =
    discount ??
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const product = new Product({
    user: user._id,
    name: name.trim(),
    description: description.trim(),
    keyFeatures: transformedKeyFeatures,
    price: Number(price),
    originalPrice: Number(originalPrice || price),
    discount: calculatedDiscount,
    image: transformedImages,
    brand: brand.trim(),
    badge: (badge || "").trim(),
    category: category.trim(),
    rating: 0,
    reviews: [],
    numReviews: 0,
    countInStock: Math.max(0, Number(countInStock) || 0),
  });

  const createdProduct = await product.save();

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: createdProduct,
  });
});

const getProducts = asyncHandler(async (req, res) => {});

const getProductById = asyncHandler(async (req, res) => {});

const deleteProductById = asyncHandler(async (req, res) => {});

const updateProductById = asyncHandler(async (req, res) => {});

export {
  creatProducts,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
