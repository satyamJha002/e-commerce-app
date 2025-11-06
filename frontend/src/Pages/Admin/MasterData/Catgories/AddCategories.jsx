// AddCategories.jsx
import React, { useState, useEffect } from "react";

const AddCategories = ({
  isOpen,
  onClose,
  onAddCategory,
  onUpdateCategory,
  existingCategory,
  isEditMode = false,
  isLoading = false,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (isEditMode && existingCategory) {
      setCategoryName(existingCategory.name);
      setCategoryDescription(existingCategory.description);
      setSelectedFile(existingCategory.image);
    } else {
      setCategoryName("");
      setCategoryDescription("");
      setSelectedFile(null);
    }
  }, [isEditMode, existingCategory, isOpen]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    const categoryData = {
      name: categoryName.trim(),
      description: categoryDescription.trim(),
      image: selectedFile, // This will be either a File object or string URL
    };

    if (isEditMode) {
      onUpdateCategory(categoryData);
    } else {
      onAddCategory(categoryData);
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    setCategoryDescription("");
    setSelectedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isEditMode ? "Edit Category" : "Add New Category"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isEditMode
            ? "Update category information"
            : "Manage category information, including image and name."}
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Category Name *
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Category Description
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter category description"
              rows="3"
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-8 px-6 text-center bg-gray-50 dark:bg-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Upload Image
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Drag and drop or click to upload an image.
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <button
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              onClick={() => document.getElementById("file-upload").click()}
              disabled={isLoading}
            >
              Browse
            </button>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Selected:{" "}
                {typeof selectedFile === "string"
                  ? "Current image"
                  : selectedFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button
            className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditMode ? "Updating..." : "Saving..."}
              </>
            ) : isEditMode ? (
              "Update Category"
            ) : (
              "Save Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
