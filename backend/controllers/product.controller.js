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

const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
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
    filter.category = { $regex: category, $options: "i" };
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
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { keyFeatures: { $in: [new RegExp(search, "i")] } },
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
