import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../../../slices/subCategoryApiSlice";
import { clearSelectedSubCategory } from "../../../../slices/subCategorySlice";
import { useGetCategoriesQuery } from "../../../../slices/categoryApiSlice";

const AddSubCategories = ({
  isOpen,
  onClose,
  existingSubCategory,
  isEditMode = false,
  refetch,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    categoryId: "",
  });

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError,
    error,
  } = useGetCategoriesQuery();

  const [updateSubCategory, { isLoading: isUpdating }] =
    useUpdateSubCategoryMutation();

  const categories = categoriesData?.categories || [];

  // RTK Query mutations
  const [createSubCategory, { isLoading: isCreating }] =
    useCreateSubCategoryMutation();

  const isLoading = isCreating || isUpdating;
  useEffect(() => {
    if (isEditMode && existingSubCategory) {
      setFormData({
        name: existingSubCategory.name || "",
        description: existingSubCategory.description || "",
        categoryId:
          existingSubCategory.categoryId?._id ||
          existingSubCategory.categoryId ||
          "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        categoryId: "",
      });
    }
    setErrors({ name: "", categoryId: "" });
  }, [isEditMode, existingSubCategory, isOpen]);

  const validateForm = () => {
    const newErrors = { name: "", categoryId: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Sub-category name is required";
      isValid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a parent category";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (isEditMode && existingSubCategory) {
        const subCategoryId = existingSubCategory._id || existingSubCategory.id;

        if (!subCategoryId) {
          toast.error("Sub-category ID is missing");
          return;
        }

        await updateSubCategory({
          id: subCategoryId,
          ...formData,
        }).unwrap();
        toast.success("Sub-category updated successfully");
      } else {
        await createSubCategory(formData).unwrap();
        toast.success("Sub-category created successfully");
      }

      if (refetch) {
        refetch();
      }

      handleClose();
    } catch (error) {
      console.error("Error saving sub-category:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", categoryId: "" });
    setErrors({ name: "", categoryId: "" });
    dispatch(clearSelectedSubCategory());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 animate-in fade-in zoom-in-95 duration-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isEditMode ? "Edit Sub Category" : "Add New Sub Category"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {isEditMode
              ? "Update Sub-Category information"
              : "Create a new sub-category under a parent category"}
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Sub Category Name *
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter sub-category name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Parent Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              disabled={isLoadingCategories}
            >
              <option
                value=""
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {isLoadingCategories
                  ? "Loading categories..."
                  : isError
                  ? "Failed to load categories"
                  : "Select a parent category"}
              </option>
              {categories.map((category) => (
                <option
                  key={category._id || category.id}
                  value={category._id || category.id}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 py-2"
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {errors.categoryId}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              placeholder="Enter sub-category description (optional)"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/30">
          <button
            className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClose}
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
              "Update Sub Category"
            ) : (
              "Save Sub Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategories;
