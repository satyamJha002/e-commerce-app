import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";
import {
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const creatProducts = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to creat this product");
  }

  const {
    name,
    description,
    keyFeatures,
    price,
    brand,
    category,
    subCategory,
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
    brand,
    category,
    subCategory,
    countInStock,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([__, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    try {
      console.log(`Uploading ${req.files.length} files to Cloudinary...`);

      const uploadResults = await uploadMultipleToCloudinary(req.files, {
        folder: "ecommerce-products",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
      });

      imageUrls = uploadResults.map((result) => result.secure_url);
      console.log("Successfully uploaded images to cloudinary:", imageUrls);
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      res.status(500);
      throw new Error("Failed to upload images");
    }
  }

  if (imageUrls.length === 0) {
    res.status(400);
    throw new Error("At least one product image is required");
  }

  const transformedCategory = mongoose.Types.ObjectId.isValid(category)
    ? category
    : null;

  const transformedSubCategory = mongoose.Types.ObjectId.isValid(subCategory)
    ? subCategory
    : null;

  const transformedKeyFeatures = Array.isArray(keyFeatures)
    ? keyFeatures
    : typeof keyFeatures === "string"
      ? keyFeatures
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s)
      : [];

  const transformedDescription = Array.isArray(description)
    ? description
    : typeof description === "string"
      ? description
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s)
      : [];

  const calculatedDiscount =
    discount ??
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const product = new Product({
    user: user._id,
    name: name.trim(),
    description: transformedDescription,
    keyFeatures: transformedKeyFeatures,
    price: Number(price),
    originalPrice: Number(originalPrice || price),
    discount: calculatedDiscount,
    images: imageUrls,
    brand: brand.trim(),
    badge: (badge || "").trim(),
    category: transformedCategory,
    subCategory: transformedSubCategory,
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

const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    subCategory,
    brand,
    minPrice,
    maxPrice,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10,
    badge,
    inStock,
  } = req.query;

  const filter = {};

  if (category) {
    if (mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    } else {
      filter.category = { $regex: category, $options: "i" };
    }
  }

  if (subCategory) {
    if (mongoose.Types.ObjectId.isValid(subCategory)) {
      filter.subCategory = subCategory;
    } else {
      filter.subCategory = { $regex: subCategory, $options: "i" };
    }
  }

  if (brand) {
    filter.brand = { $regex: brand, $options: "i" };
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    const searchRegex = new RegExp(search, "i");
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { keyFeatures: { $in: [searchRegex] } },
      { brand: searchRegex },
    ];
  }

  if (badge) {
    filter.badge = { $regex: badge, $options: "i" };
  }

  if (inStock === "true") {
    filter.countInStock = { $gt: 0 };
  } else if (inStock === "false") {
    filter.countInStock = 0;
  }

  const sortOptions = {};
  const validSortFields = [
    "name",
    "price",
    "createdAt",
    "rating",
    "rating",
    "discount",
  ];

  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(parseInt(limit), 50));
  const skip = (pageNum - 1) * limitNum;

  try {
    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("user", "name email")
      .populate("category", "categoryName")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .select("-reviews"); // Populate usr info if needed

    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNextPage,
        hasPrevPage,
        productsPerPage: limitNum,
      },
      filters: {
        category,
        brand,
        minPrice,
        maxPrice,
        search,
        sortBy: sortField,
        sortOrder,
      },
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500);
    throw new Error("Server error while fetching products");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("user", "name email")
      .populate("category", "categoryName")
      .populate("reviews.user", "name email");

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Product retrieved failed", error);
    res.status(500);
    throw new Error("Server Error", error);
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  console.log("Product id", product); // null

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.images && product.images.length > 0) {
    try {
      const deletePromises = product.images.map(async (imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        return await deleteFromCloudinary(publicId);
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }
  }

  await Product.findByIdAndDelete({ $eq: req.params.id });

  res.json({ success: true, message: "Product deleted successfully" });
});

const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to update this product");
  }

  const {
    name,
    description,
    keyFeatures,
    price,
    originalPrice,
    discount,
    brand,
    badge,
    category,
    subCategory,
    rating,
    countInStock,
  } = req.body;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      res.status(404);
      throw new Error("Product not found");
    }

    let updateImages = existingProduct.images;
    if (req.files && req.files.length > 0) {
      console.log(`Uploading ${req.files.length} files to Cloudinary...`);

      const uploadResults = await uploadMultipleToCloudinary(req.files, {
        folder: "ecommerce-products",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
      });

      console.log("Upload Results");

      const newImageUrls = uploadResults.map((result) => result.secure_url);
      updateImages = [...newImageUrls];
    }

    // Prepare update object
    const updateFields = {};

    if (name) updateFields.name = name.trim();
    if (brand) updateFields.brand = brand.trim();
    if (category) {
      updateFields.category = mongoose.Types.ObjectId.isValid(category)
        ? category
        : null;
    }
    if (subCategory) {
      updateFields.subCategory = mongoose.Types.ObjectId.isValid(subCategory)
        ? subCategory
        : null;
    }
    if (price) updateFields.price = Number(price);
    if (originalPrice) updateFields.originalPrice = Number(originalPrice);
    if (discount !== undefined && discount !== "")
      updateFields.discount = Number(discount);
    if (badge !== undefined) updateFields.badge = badge.trim();
    if (rating !== undefined && rating !== "")
      updateFields.rating = Number(rating);
    if (countInStock !== undefined && countInStock !== "")
      updateFields.countInStock = Number(countInStock);
    if (req.files && req.files.length > 0) updateFields.images = updateImages;

    // Handle array fields
    if (keyFeatures) {
      if (Array.isArray(keyFeatures)) {
        updateFields.keyFeatures = keyFeatures;
      } else if (typeof keyFeatures === "string") {
        try {
          const parsed = JSON.parse(keyFeatures);
          updateFields.keyFeatures = Array.isArray(parsed)
            ? parsed
            : [keyFeatures];
        } catch {
          updateFields.keyFeatures = keyFeatures.includes(",")
            ? keyFeatures
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s)
            : [keyFeatures];
        }
      }
    }

    if (description) {
      if (Array.isArray(description)) {
        updateFields.description = description;
      } else if (typeof description === "string") {
        try {
          const parsed = JSON.parse(description);
          updateFields.description = Array.isArray(parsed)
            ? parsed
            : [description];
        } catch {
          updateFields.description = description.includes("\n")
            ? description
                .split("\n")
                .map((s) => s.trim())
                .filter((s) => s)
            : [description];
        }
      }
    }

    // Recalculate discount if needed
    if ((discount === undefined || discount === "") && originalPrice && price) {
      updateFields.discount = Math.round(
        ((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100,
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { $eq: id },
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Product update failed", error);
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

// Get products grouped by category for homepage display
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { limit = 4 } = req.query;
  const limitNum = Math.max(1, Math.min(parseInt(limit), 10));

  try {
    // Import Categories model
    const Categories = (await import("../models/categories.model.js")).default;

    // Fetch all active categories
    const categories = await Categories.find({ status: "Active" }).sort({
      categoryName: 1,
    });

    if (!categories || categories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No categories found",
        categories: [],
      });
    }

    // Fetch products for each category
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({ category: category._id })
          .populate("category", "categoryName")
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .select("-reviews");

        return {
          categoryId: category._id,
          categoryName: category.categoryName,
          categoryImage: category.categoryImage,
          productCount: products.length,
          products: products,
        };
      }),
    );

    // Filter out categories with no products
    const filteredCategories = categoriesWithProducts.filter(
      (cat) => cat.products.length > 0,
    );

    return res.status(200).json({
      success: true,
      message: "Products by category retrieved successfully",
      categories: filteredCategories,
      totalCategories: filteredCategories.length,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500);
    throw new Error("Server error while fetching products by category");
  }
});

// Public endpoint - Get products by category name (for category pages)
const getProductsByCategoryName = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;
  const {
    page = 1,
    limit = 50,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  if (!categoryName) {
    res.status(400);
    throw new Error("Category name is required");
  }

  try {
    // Import Categories model
    const Categories = (await import("../models/categories.model.js")).default;

    // Find the category by name (case-insensitive, also handle partial matches like "home" for "Home & Garden")
    let category = await Categories.findOne({
      categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
      status: "Active",
    });

    // If exact match fails, try partial match (e.g., "sports" matches "Sports & Outdoors")
    if (!category) {
      category = await Categories.findOne({
        categoryName: { $regex: new RegExp(categoryName, "i") },
        status: "Active",
      });
    }

    if (!category) {
      // Log available categories for debugging
      const availableCategories = await Categories.find({ status: "Active" })
        .select("categoryName")
        .lean();
      console.log(
        `Category "${categoryName}" not found. Available categories:`,
        availableCategories.map((c) => c.categoryName),
      );

      return res.status(200).json({
        success: true,
        products: [],
        category: null,
        pagination: { totalProducts: 0, totalPages: 0, currentPage: 1 },
        message: `Category not found. Please create a category matching "${categoryName}" in the admin panel.`,
        availableCategories: availableCategories.map((c) => c.categoryName),
      });
    }

    // Parse pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(parseInt(limit), 100));
    const skip = (pageNum - 1) * limitNum;

    // Build sort options
    const validSortFields = [
      "name",
      "price",
      "createdAt",
      "rating",
      "discount",
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

    // Find products with this category
    const filter = { category: category._id };

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate("category", "categoryName categoryImage")
        .populate("subCategory", "name description")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .select("-reviews")
        .lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalProducts / limitNum);

    return res.status(200).json({
      success: true,
      products,
      category: {
        _id: category._id,
        name: category.categoryName,
        image: category.categoryImage,
        description: category.categoryDescp,
      },
      pagination: {
        totalProducts,
        totalPages,
        currentPage: pageNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products by category name:", error);
    res.status(500);
    throw new Error("Server error while fetching products by category");
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    res.status(400);
    throw new Error("Search query is required");
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { keyFeatures: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("category", "categoryName")
      .populate("subCategory", "name description");

    return res.status(200).json({
      success: true,
      products,
      message: "Products searched successfully",
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500);
    throw new Error("Server error while searching products");
  }
});

export {
  creatProducts,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProductsByCategory,
  getProductsByCategoryName,
  searchProducts,
};
