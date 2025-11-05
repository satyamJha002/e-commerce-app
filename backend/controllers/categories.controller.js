import asyncHandler from "../middleware/asyncHandler.js";
import Categories from "../models/categories.model.js";
import Product from "../models/product.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Helper: extract Cloudinary public_id from a full URL
const getPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return null;
  try {
    const url = new URL(imageUrl);
    // pathname like: /v1234/folder/subfolder/filename.ext or /folder/filename.ext
    const parts = url.pathname.split("/").filter(Boolean);

    // remove version segment like 'v1234' if present
    if (parts.length > 0 && /^v\d+$/.test(parts[0])) parts.shift();

    if (parts.length === 0) return null;

    // remove extension from last segment
    const last = parts.pop();
    const lastNoExt = last.replace(/\.[^/.]+$/, "");
    parts.push(lastNoExt);

    return parts.join("/");
  } catch (err) {
    // fallback: try to parse path-ish string
    try {
      const parts = imageUrl.split("/").filter(Boolean);
      if (parts.length === 0) return null;
      const last = parts.pop();
      const lastNoExt = last.replace(/\.[^/.]+$/, "");
      // remove leading 'v1234' style part
      if (parts.length > 0 && /^v\d+$/.test(parts[0])) parts.shift();
      parts.push(lastNoExt);
      return parts.join("/");
    } catch (e) {
      return null;
    }
  }
};

const createCategory = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to create category");
  }

  const { categoryName, categoryDescp, status } = req.body;

  const requiredFields = {
    categoryName,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([__, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required field: ${missingFields.join(", ")}`);
  }

  // Use collation for case-insensitive exact match to avoid building regex from user input
  const existingCategory = await Categories.findOne({
    categoryName: categoryName,
  }).collation({ locale: "en", strength: 2 });

  if (existingCategory) {
    res.status(400);
    throw new Error("Category with this name already exists");
  }

  let imageUrl = "";
  let imagePublicId;
  if (req.files && req.files.length > 0)
    try {
      console.log(`Uploading ${req.files.length} files to Cloudinary..`);

      const uploadResult = await uploadToCloudinary(req.files, {
        folder: "ecommerce-categories",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
      });

      // uploadResult may be an object (single upload) or an array (multiple)
      if (Array.isArray(uploadResult)) {
        // pick first result for category image
        const first = uploadResult[0];
        imageUrl = first?.secure_url || first?.url || "";
        imagePublicId = first?.public_id;
      } else if (uploadResult && typeof uploadResult === "object") {
        imageUrl = uploadResult?.secure_url || uploadResult?.url || "";
        imagePublicId = uploadResult?.public_id;
      } else if (typeof uploadResult === "string") {
        // legacy: if a string was returned
        imageUrl = uploadResult;
        imagePublicId = getPublicIdFromUrl(imageUrl);
      }

      console.log(
        `Successfully uploaded image to cloudinary`,
        imageUrl,
        imagePublicId
      );
    } catch (error) {
      console.error("Error uploading images to Cloudinary");
      res.status(500);
      throw new Error("Failed to upload images");
    }

  const safeDescp =
    typeof categoryDescp === "string" ? categoryDescp.trim() : undefined;

  const category = new Categories({
    user: user._id,
    categoryName: categoryName.trim(),
    categoryDescp: safeDescp,
    categoryImage: imageUrl,
    categoryImagePublicId: imagePublicId,
    status: status || "Active",
    productCount: 0,
  });

  const createCategory = await category.save();

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    category: createCategory,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  try {
    // Pagination
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const rawLimit = parseInt(req.query.limit || "20", 10);
    const MAX_LIMIT = 100;
    const limit = Math.min(isNaN(rawLimit) ? 20 : rawLimit, MAX_LIMIT);
    const skip = (page - 1) * limit;

    const filter = {}; // extendable: apply filters from query in future

    // Efficient aggregation for paginated categories with productCount and populated user
    const total = await Categories.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;

    const categoriesAgg = await Categories.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      // Join user info
      {
        $lookup: {
          from: "auths",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },
      // Join products for count
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "productsForCount",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$productsForCount" },
          user: {
            _id: "$userInfo._id",
            name: "$userInfo.name",
            email: "$userInfo.email",
          },
        },
      },
      { $project: { productsForCount: 0, userInfo: 0 } },
    ]);

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      categories: categoriesAgg,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500);
    throw new Error("Server Error while fetching categories");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const { id } = req.params;

  const category = await Categories.findById(id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  // Check if any products are using this category
  const productsCount = await Product.countDocuments({ category: id });

  if (productsCount > 0) {
    res.status(400);
    throw new Error(
      `Cannot delete category. ${productsCount} product(s) are using this category.`
    );
  }

  if (category.categoryImage) {
    try {
      const publicId =
        category.categoryImagePublicId ||
        getPublicIdFromUrl(category.categoryImage);
      if (publicId) await deleteFromCloudinary(publicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  await Categories.findByIdAndDelete({ $eq: id });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized to update category");
  }

  const { id, categoryName, categoryDescp, status } = req.body;

  if (!id) {
    res.status(404);
    throw new Error("Category Id is required to update");
  }

  const category = await Categories.findById(id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (categoryName && categoryName !== category.categoryName) {
    // Use collation to do case-insensitive exact match without building regex from user input
    const existingCategory = await Categories.findOne({
      categoryName: { $eq: categoryName },
      _id: { $ne: id },
    }).collation({ locale: "en", strength: 2 });

    if (existingCategory) {
      res.status(400);
      throw new Error("Category with this name already exists");
    }
  }

  let imageUrl = "";
  let imagePublicId;

  if (req.files && req.files.length > 0) {
    try {
      // Delete old image from Cloudinary if exists
      if (category.categoryImage) {
        const oldPublicId =
          category.categoryImagePublicId ||
          getPublicIdFromUrl(category.categoryImage);
        if (oldPublicId) await deleteFromCloudinary(oldPublicId);
      }

      console.log(`Uploading new image to Cloudinary..`);
      const uploadResult = await uploadToCloudinary(req.files, {
        folder: "ecommerce-categories",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
      });

      if (Array.isArray(uploadResult)) {
        const first = uploadResult[0];
        imageUrl = first?.secure_url || first?.url || "";
        imagePublicId = first?.public_id;
      } else if (uploadResult && typeof uploadResult === "object") {
        imageUrl = uploadResult?.secure_url || uploadResult?.url || "";
        imagePublicId = uploadResult?.public_id;
      } else if (typeof uploadResult === "string") {
        imageUrl = uploadResult;
        imagePublicId = getPublicIdFromUrl(imageUrl);
      }
      console.log(
        `Successfully uploaded new image to cloudinary`,
        imageUrl,
        imagePublicId
      );
    } catch (error) {
      console.error("Error uploading new image to Cloudinary");
      res.status(500);
      throw new Error("Failed to upload new image");
    }
  }
  if (categoryName) updateFields.categoryName = categoryName.trim();
  if (categoryDescp !== undefined && categoryDescp !== null) {
    if (typeof categoryDescp === "string")
      updateFields.categoryDescp = categoryDescp.trim();
  }
  if (status) updateFields.status = status;
  if (req.files && req.files.length > 0) updateFields.categoryImage = imageUrl;
  if (imagePublicId) updateFields.categoryImagePublicId = imagePublicId;

  // Recalculate product count
  const productCount = await Product.countDocuments({ category: id });
  updateFields.productCount = productCount;

  const updatedCategory = await Categories.findByIdAndUpdate({ $eq: id }, updateFields, {
    new: true,
    runValidators: true,
  }).populate("user", "name email");

  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category: updatedCategory,
  });
});

const updateAllCategoriesProductCount = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  try {
    // Efficient aggregation: get product counts for all categories in one query
    const counts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

    // Fetch all categories' IDs
    const allCategories = await Categories.find({}, { _id: 1 });

    // Build bulk update ops
    const bulkOps = allCategories.map((cat) => ({
      updateOne: {
        filter: { _id: cat._id },
        update: { $set: { productCount: countMap.get(String(cat._id)) || 0 } },
      },
    }));
    if (bulkOps.length > 0) await Categories.bulkWrite(bulkOps);

    // Return updated categories
    const updatedCategories = await Categories.find({});
    return res.status(200).json({
      success: true,
      message: "Product counts updated for all categories",
      categories: updatedCategories,
    });
  } catch (error) {
    console.error("Error updating product counts", error);
    res.status(500);
    throw new Error("Server Error while updating product counts");
  }
});

export {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  updateAllCategoriesProductCount,
};
