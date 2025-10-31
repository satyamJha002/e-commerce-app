// AddProduct.jsx
import React, { useState, useEffect } from "react";
import ModalComponent from "../../../component/ModalComponent";
import { LucideX } from "lucide-react";

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
    countInStock: "",
    keyFeatures: [""],
    description: [""],
  });

  const [productImages, setProductImages] = useState([]);

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

  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
      size="xl"
      className="max-w-5xl w-full modal-scrollable"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[70vh] overflow-y-auto px-2"
      >
        {/* Product Name */}
        <div className="grid grid-cols-3 gap-5">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Product Name *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name..."
              className="input input-bordered w-full"
              required
              disabled={isLoading}
            />
          </div>

          {/* Brand */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Brand *</span>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Enter Product Brand..."
              className="input input-bordered w-full"
              required
              disabled={isLoading}
            />
          </div>

          {/* Original Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Original Price *</span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="Enter Original Price..."
              className="input input-bordered w-full"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price *</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price..."
              className="input input-bordered"
              required
              disabled={isLoading}
            />
          </div>

          {/* Discount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Discount (%)</span>
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="Enter Discount..."
              className="input input-bordered"
              disabled={isLoading}
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Rating</span>
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
              className="input input-bordered"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Review Count */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Review Count</span>
            </label>
            <input
              type="number"
              name="reviewCount"
              value={formData.reviewCount}
              onChange={handleInputChange}
              placeholder="Enter Reviews Count..."
              className="input input-bordered"
              disabled={isLoading}
            />
          </div>

          {/* Badge */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Badge</span>
            </label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleInputChange}
              className="select select-bordered"
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

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category *</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="select select-bordered"
              required
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sport</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">In Stock *</span>
            </label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleInputChange}
              placeholder="Enter In Stock..."
              className="input input-bordered"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Key Features *</span>
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
                className="input input-bordered flex-1"
                disabled={isLoading}
              />
              {formData.keyFeatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "keyFeatures")}
                  className="btn btn-error btn-sm"
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
            className="btn btn-outline btn-sm mt-2"
            disabled={isLoading}
          >
            + Add Feature
          </button>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description *</span>
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
                className="input input-bordered flex-1"
                disabled={isLoading}
              />
              {formData.description.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "description")}
                  className="btn btn-error btn-sm"
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
            className="btn btn-outline btn-sm mt-2"
            disabled={isLoading}
          >
            + Add Description Point
          </button>
        </div>

        {/* Image Upload */}
        <div className="form-control mt-4">
          <span className="flex justify-between">
            <label
              htmlFor="product-image-upload"
              className="label-text font-semibold"
            >
              Product Images *
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Supported file formats:{" "}
              <span className="text-orange-600">JPG, JPEG, PNG, WEBP</span> Max
              file size: <span className="text-orange-600">5 MB</span>
            </p>
          </span>
          <label
            htmlFor="product-image-upload"
            className="block border-2 border-dashed border-gray-400 p-6 text-center text-blue-700 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
          >
            {productImages.length > 0 ? (
              <div className="space-y-2">
                {productImages.map((file, index) => (
                  <div
                    key={index}
                    className="text-gray-800 bg-gray-100 px-3 py-2 rounded text-sm flex justify-between items-center"
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
              <div className="text-gray-600">
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
          {productImages.length === 0 && (
            <p className="text-red-500 text-sm mt-1">
              At least one product image is required
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="modal-action sticky bottom-0 bg-base-100 pt-4 pb-2 -mx-2 px-2 border-t border-base-300">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Save Changes"
              : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default AddProduct;
