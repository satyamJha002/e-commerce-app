import React, { useState } from "react";
import ModalComponent from "../../../component/ModalComponent";

const AddProduct = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    reviewCount: "",
    badge: "",
    imageUrl: "",
    keyFeatures: [""],
    description: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    // Convert string values to appropriate types
    const productData = {
      ...formData,
      price: parseInt(formData.price) || 0,
      originalPrice: parseInt(formData.originalPrice) || 0,
      discount: parseInt(formData.discount) || 0,
      rating: parseFloat(formData.rating) || 0,
      reviewCount: parseInt(formData.reviewCount) || 0,
      keyFeatures: formData.keyFeatures.filter(
        (feature) => feature.trim() !== ""
      ),
      description: formData.description.filter((desc) => desc.trim() !== ""),
    };

    onAddProduct(productData);
    onClose();
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Product"
      size="xl"
      className="max-w-5xl w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="grid grid-cols-3 gap-5">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Brand */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Brand</span>
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Enter Product Brand..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Original Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Original Price</span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="Enter Original Price..."
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price..."
              className="input input-bordered"
              required
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
            >
              <option value="">Select Badge</option>
              <option value="Best Seller">Best Seller</option>
              <option value="New Arrival">New Arrival</option>
              <option value="Limited Edition">Limited Edition</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
        </div>

        {/* Key Features */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Key Features</span>
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
              />
              {formData.keyFeatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "keyFeatures")}
                  className="btn btn-error btn-sm"
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
          >
            + Add Feature
          </button>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
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
              />
              {formData.description.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "description")}
                  className="btn btn-error btn-sm"
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
          >
            + Add Description Point
          </button>
        </div>

        {/* Main Image URL */}
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Main Image URL</span>
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="input input-bordered"
            required
          />
        </div> */}

        {/* Form Actions */}
        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default AddProduct;
