import SubCategory from "../models/subCategories.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

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
};
