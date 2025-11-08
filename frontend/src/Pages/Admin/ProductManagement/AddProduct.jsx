// AddProduct.jsx
import React, { useState, useEffect } from "react";
import { LucideX } from "lucide-react";
import { useGetCategoriesQuery } from "../../../slices/categoryApiSlice";
import { useGetAllSubCategoryQuery } from "../../../slices/subCategoryApiSlice";

const AddProduct = ({
  isOpen,
  onClose,
  onAddProduct,
  onEditProduct,
  isLoading = false,
  existingProduct = null,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    reviewCount: "",
    badge: "",
    category: "",
    subCategory: "",
    countInStock: "",
    keyFeatures: [""],
    description: [""],
  });

  const [productImages, setProductImages] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const { data: subCategoriesData, isLoading: isLoadingSubCategories } =
    useGetAllSubCategoryQuery();

  const categories = categoriesData?.categories || [];
  const subCategories = subCategoriesData?.data || [];

  // console.log("Sub Categories data in Add Product: ", subCategories);

  // useEffect(() => {
  //   console.log("All Sub Categories:", subCategories);
  //   console.log("Selected Category:", formData.category);
  // }, [subCategories, formData.category]);

  useEffect(() => {
    if (formData.category && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (subCategory) => subCategory.categoryId._id === formData.category
      );
      setFilteredSubCategories(filtered);

      if (formData.subCategory) {
        const currentSubCategoryExists = filtered.some(
          (subCat) => subCat._id === formData.subCategory
        );
        if (!currentSubCategoryExists) {
          setFormData((prev) => ({ ...prev, subCategory: "" }));
        }
      }
    } else {
      setFilteredSubCategories([]);
      if (formData.subCategory) {
        setFormData((prev) => ({ ...prev, subCategory: "" }));
      }
    }
  }, [formData.category, subCategories, formData.subCategory]);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && existingProduct) {
        setFormData({
          name: existingProduct.name || "",
          brand: existingProduct.brand || "",
          price: existingProduct.price || "",
          originalPrice: existingProduct.originalPrice || "",
          discount: existingProduct.discount || "",
          rating: existingProduct.rating || "",
          reviewCount: existingProduct.numReviews || "",
          badge: existingProduct.badge || "",
          category: existingProduct.category || "",
          subCategory: existingProduct.subCategory || "",
          countInStock: existingProduct.countInStock || "",
          keyFeatures: existingProduct.keyFeatures || [""],
          description: existingProduct.description || [""],
        });
        setProductImages(existingProduct.images || []);
      }
    } else {
      setFormData({
        name: "",
        brand: "",
        price: "",
        originalPrice: "",
        discount: "",
        rating: "",
        reviewCount: "",
        badge: "",
        category: "",
        subCategory: "",
        countInStock: "",
        keyFeatures: [""],
        description: [""],
      });
      setProductImages([]);
    }
  }, [isOpen, isEditMode, existingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate files
    const validFiles = files.filter((file) => {
      const isValidType = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

      if (!isValidType) {
        alert(`File ${file.name} is not a supported image type`);
        return false;
      }
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    setProductImages((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleArrayFieldChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productImages.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    const formDataToSend = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (item.trim() !== "") {
            // Only append non-empty values
            formDataToSend.append(`${key}[${index}]`, item);
          }
        });
      } else if (formData[key] !== "") {
        // Only append non-empty values
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append images - field name must match what multer expects
    productImages.forEach((file) => {
      if (file instanceof File) formDataToSend.append("images", file);
    });

    if (isEditMode && existingProduct) {
      const productId = String(existingProduct._id);
      onEditProduct(productId, formDataToSend);
    } else {
      onAddProduct(formDataToSend);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isEditMode
            ? "Update product information"
            : "Manage product information, including images, pricing, and details."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name, Brand, Original Price */}
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Product Name..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Enter Product Brand..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Original Price *
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="Enter Original Price..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Price */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter Price..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Enter Discount..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Enter Rating..."
                step="0.1"
                min="0"
                max="5"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Review Count */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Review Count
              </label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleInputChange}
                placeholder="Enter Reviews Count..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Badge
              </label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="">Select Badge</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Hot Deal">Hot Deal</option>
                <option value="Top Rated">Top Rated</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Popular Choice">Popular Choice</option>
                <option value="Editor's Choice">Editor's Choice</option>
                <option value="Limited Edition">Limited Edition</option>
                <option value="Eco Friendly">Eco Friendly</option>
                <option value="Sale">Sale</option>
                <option value="Trending">Trending</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {isLoadingCategories && (
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Loading categories...
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                Sub-Category *
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading || !formData.category}
              >
                <option value="">Select a Sub-Category</option>
                {filteredSubCategories.length > 0 ? (
                  filteredSubCategories.map((subCategory) => (
                    <option value={subCategory._id} key={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {formData.category
                      ? "No sub-categories available"
                      : "Select a category first"}
                  </option>
                )}
              </select>
              {!formData.category && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Please select a category first
                </p>
              )}
              {formData.category &&
                filteredSubCategories.length === 0 &&
                !isLoadingSubCategories && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                    No sub-categories found for this category
                  </p>
                )}
            </div>
            <div>
              <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                In Stock *
              </label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleInputChange}
                placeholder="Enter In Stock..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Key Features *
            </label>
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleArrayFieldChange(index, e.target.value, "keyFeatures")
                  }
                  placeholder="Enter Key Features of Product..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                {formData.keyFeatures.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(index, "keyFeatures")}
                    className="px-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("keyFeatures")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              disabled={isLoading}
            >
              + Add Feature
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Description *
            </label>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) =>
                    handleArrayFieldChange(index, e.target.value, "description")
                  }
                  placeholder="Enter a description point..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                {formData.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField(index, "description")}
                    className="px-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("description")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              disabled={isLoading}
            >
              + Add Description Point
            </button>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <span className="flex justify-between items-center mb-2">
              <label className="block text-gray-800 dark:text-gray-200 font-medium">
                Product Images *
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supported file formats:{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  JPG, JPEG, PNG, WEBP
                </span>{" "}
                Max file size:{" "}
                <span className="text-blue-600 dark:text-blue-400">5 MB</span>
              </p>
            </span>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-8 px-6 text-center bg-gray-50 dark:bg-gray-700">
              <label
                htmlFor="product-image-upload"
                className="cursor-pointer block"
              >
                {productImages.length > 0 ? (
                  <div className="space-y-2">
                    {productImages.map((file, index) => (
                      <div
                        key={index}
                        className="text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded text-sm flex justify-between items-center"
                      >
                        <span className="truncate w-3/4 text-left">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-500 hover:text-red-600"
                          disabled={isLoading}
                        >
                          <LucideX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600 dark:text-gray-400">
                    <p className="text-lg font-medium">
                      Drag & Drop Your product images here
                    </p>
                    <p className="text-sm">Or Click to Browse</p>
                  </div>
                )}
              </label>
              <input
                id="product-image-upload"
                name="images"
                type="file"
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </div>
            {productImages.length === 0 && (
              <p className="text-red-500 text-sm mt-1">
                At least one product image is required
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end mt-8 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
