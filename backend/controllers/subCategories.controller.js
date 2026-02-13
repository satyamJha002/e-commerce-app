import SubCategory from "../models/subCategories.model.js";
import Categories from "../models/categories.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Public endpoint - Get products by category and subcategory name (no auth required)
const getProductsBySubCategory = asyncHandler(async (req, res) => {
  const { categoryName, subCategoryName } = req.params;
  const { page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" } = req.query;

  if (!categoryName || !subCategoryName) {
    res.status(400);
    throw new Error("Category name and subcategory name are required");
  }

  // Format subcategory name from URL format (e.g., "kitchen-appliances" -> "kitchen appliances")
  const formattedSubCategoryName = subCategoryName.replace(/-/g, " ");

  // Find the category by name (case-insensitive, exact match first then partial)
  let category = await Categories.findOne({
    categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
    status: "Active",
  });

  // If exact match fails, try partial match
  if (!category) {
    category = await Categories.findOne({
      categoryName: { $regex: new RegExp(categoryName, "i") },
      status: "Active",
    });
  }

  if (!category) {
    const availableCategories = await Categories.find({ status: "Active" })
      .select("categoryName")
      .lean();
    console.log(
      `SubCategory products: Category "${categoryName}" not found. Available:`,
      availableCategories.map((c) => c.categoryName)
    );

    return res.status(200).json({
      success: true,
      products: [],
      pagination: { totalProducts: 0, totalPages: 0, currentPage: 1 },
      message: `Category "${categoryName}" not found`,
      availableCategories: availableCategories.map((c) => c.categoryName),
    });
  }

  // Find the subcategory by name within this category (case-insensitive, partial match)
  let subCategory = await SubCategory.findOne({
    categoryId: category._id,
    name: { $regex: new RegExp(`^${formattedSubCategoryName}$`, "i") },
    status: "Active",
  });

  // If exact match fails, try partial match
  if (!subCategory) {
    subCategory = await SubCategory.findOne({
      categoryId: category._id,
      name: { $regex: new RegExp(formattedSubCategoryName, "i") },
      status: "Active",
    });
  }

  if (!subCategory) {
    // Get available subcategories for debugging
    const availableSubCategories = await SubCategory.find({
      categoryId: category._id,
      status: "Active",
    })
      .select("name")
      .lean();
    console.log(
      `SubCategory "${formattedSubCategoryName}" not found in "${category.categoryName}". Available:`,
      availableSubCategories.map((s) => s.name)
    );

    return res.status(200).json({
      success: true,
      products: [],
      pagination: { totalProducts: 0, totalPages: 0, currentPage: 1 },
      category: { _id: category._id, name: category.categoryName },
      subCategory: null,
      message: `Subcategory "${formattedSubCategoryName}" not found in "${category.categoryName}"`,
      availableSubCategories: availableSubCategories.map((s) => s.name),
    });
  }

  // Parse pagination
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(parseInt(limit), 50));
  const skip = (pageNum - 1) * limitNum;

  // Build sort options
  const validSortFields = ["name", "price", "createdAt", "rating", "discount"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  // Find products with this category and subcategory
  const filter = {
    category: category._id,
    subCategory: subCategory._id,
  };

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

  res.status(200).json({
    success: true,
    products,
    category: {
      _id: category._id,
      name: category.categoryName,
      image: category.categoryImage,
    },
    subCategory: {
      _id: subCategory._id,
      name: subCategory.name,
      description: subCategory.description,
    },
    pagination: {
      totalProducts,
      totalPages,
      currentPage: pageNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  });
});

// Public endpoint - Get subcategories by category name (no auth required)
const getSubCategoriesByCategoryName = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  if (!categoryName) {
    res.status(400);
    throw new Error("Category name is required");
  }

  // Find the category by name (case-insensitive exact match first)
  let category = await Categories.findOne({
    categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
    status: "Active",
  });

  // If exact match fails, try partial match
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
      `Subcategory lookup: Category "${categoryName}" not found. Available categories:`,
      availableCategories.map((c) => c.categoryName)
    );

    // Return empty array instead of error if category not found
    return res.status(200).json({
      success: true,
      data: [],
      message: `Category not found. Please create a category matching "${categoryName}" in the admin panel.`,
      availableCategories: availableCategories.map((c) => c.categoryName),
    });
  }

  // Find all active subcategories for this category
  const subCategories = await SubCategory.find({
    categoryId: category._id,
    status: "Active",
  })
    .select("name description")
    .lean();

  res.status(200).json({
    success: true,
    data: subCategories,
    category: {
      _id: category._id,
      name: category.categoryName,
    },
  });
});

const createSubCategory = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to create sub category");
  }

  const { name, categoryId, description, status } = req.body;

  if (!name || !categoryId) {
    res.status(400);
    throw new Error("Name and Category Id is required");
  }

  const subCategoryExist = await SubCategory.findOne({
    name: name.trim(),
    categoryId,
  });

  if (subCategoryExist) {
    res.status(400);
    throw new Error("This Sub-category already exists");
  }

  const subCategory = await SubCategory.create({
    name: name.trim(),
    categoryId,
    description: description?.trim(),
    status: status || "Active",
    createdBy: user._id,
  });

  await subCategory.populate("categoryId", "name");

  res.status(200).json({
    success: true,
    message: "SubCategory created successfully",
    data: subCategory,
  });
});

const getAllSubCategory = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    categoryId = "",
    status = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  if (status) {
    filter.status = status;
  }

  // Parse pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (isNaN(pageNum) || pageNum < 1) {
    res.status(400);
    throw new Error("Invalid page number");
  }

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    res.status(400);
    throw new Error("Invalid limit value");
  }
  const skip = (pageNum - 1) * limitNum;

  const allowedSortFields = ["createdAt", "name", "status", "updatedAt"];
  const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  const sort = {};
  sort[validSortBy] = sortOrder === "desc" ? -1 : 1;

  const [subCategories, totalCount] = await Promise.all([
    SubCategory.find(filter)
      .populate("categoryId", "name")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    SubCategory.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalCount / limitNum);

  res.status(200).json({
    success: true,
    data: subCategories,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalCount,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    },
  });
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized, need token");
  }

  const { name, categoryId, description, status } = req.body;

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    res.status(404);
    throw new Error("Sub Category is not found");
  }

  if (name && name !== subCategory.name) {
    const existingSubCategory = await SubCategory.findOne({
      name: name.trim(),
      categoryId: categoryId || subCategory.categoryId,
      _id: { $ne: id },
    });

    if (existingSubCategory) {
      res.status(400);
      throw new Error("Sub-category already exists in this category");
    }
  }

  if (name) subCategory.name = name.trim();
  if (categoryId) subCategory.categoryId = categoryId;
  if (description !== undefined) subCategory.description = description?.trim();
  if (status) subCategory.status = status;

  const updatedSubCategory = await subCategory.save();
  await updatedSubCategory.populate("categoryId", "name");

  res.status(201).json({
    success: true,
    message: "Sub-category updated successfully",
    data: updatedSubCategory,
  });
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const user = req.user;

  const { id } = req.params;

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized to delete the sub category");
  }

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    res.status(404);
    throw new Error("Sub-category is not present");
  }

  await SubCategory.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Sub-category deleted successfully",
  });
});

export {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategoryName,
  getProductsBySubCategory,
};
