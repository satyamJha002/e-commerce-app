import React, { useEffect, useMemo, useState } from "react";
import AdminSidePanel from "../../../../component/AdminSidePanel";
import { toast } from "react-toastify";
import { ChevronsLeft, ChevronsRight, Edit, Trash, Plus } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import AddCategories from "./AddCategories";
import LoadingSpinner from "../../../../component/Loader/LoadingSpinner";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../slices/categoryApiSlice";
import {
  setCategories,
  setError,
  setLoading,
  clearError,
} from "../../../../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [activeTab, setActiveTab] = useState("categories");
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // RTK Query hooks
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch,
  } = useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  // Transform API data to match table structure
  useEffect(() => {
    if (categoriesData) {
      const transformedCategories = categoriesData?.categories.map(
        (category) => ({
          id: category._id,
          name: category.categoryName,
          description: category.categoryDescp,
          image: category.categoryImage || "https://via.placeholder.com/50",
          productCount: category.productCount || 0,
          status: category.status || "Active",
          createdAt: category.createdAt
            ? new Date(category.createdAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          // Keep original data for reference
          originalData: category,
        })
      );
      dispatch(setCategories(transformedCategories));
    }
  }, [categoriesData, dispatch]);

  useEffect(() => {
    if (categoriesError) {
      dispatch(
        setError(categoriesError?.data?.message || "Failed to fetch categories")
      );
    }
  }, [categoriesError, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddCategory = async (categoryData) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();

      formData.append("categoryName", categoryData.name);
      formData.append("categoryDescp", categoryData.description);

      if (categoryData.image && typeof categoryData.image !== "string") {
        formData.append("categoryImage", categoryData.image);
      }

      const res = await createCategory(formData).unwrap();
      toast.success(res.message || "Category created successfully");
      setIsAddCategoryOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add category");
      dispatch(setError(error?.data?.message || "Failed to add category"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsAddCategoryOpen(true);
  };

  const handleUpdateCategory = async (categoryData) => {
    dispatch(setLoading(true));
    try {
      if (!selectedCategory?.id) {
        throw new Error("No category selected for update");
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("id", selectedCategory.id);
      formData.append("categoryName", categoryData.name);
      formData.append("categoryDescp", categoryData.description);

      // Append file if it's a new file (not a string URL)
      if (categoryData.image && typeof categoryData.image !== "string") {
        formData.append("categoryImage", categoryData.image);
      }

      const res = await updateCategory(formData).unwrap();
      toast.success(res.message || "Category updated successfully");
      setIsAddCategoryOpen(false);
      setSelectedCategory(null);
      setIsEditMode(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update category");
      dispatch(setError(error?.data?.message || "Failed to update category"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId).unwrap();
        toast.success("Category deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete category");
        dispatch(setError(error?.data?.message || "Failed to delete category"));
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Category",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {/* <img
              src={row.original.image}
              alt={row.original.name}
              className="w-10 h-10 object-cover rounded"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/50";
              }}
            /> */}
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {row.original.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.original.description}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Products",
        accessorKey: "productCount",
        cell: ({ row }) => (
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {row.original.productCount}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              row.original.status === "Active"
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Created Date",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span className="text-gray-600 dark:text-gray-400">
            {row.original.createdAt}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleEditCategory(row.original)}
              className="text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-1 hover:underline"
              disabled={isEditMode}
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => handleDeleteCategory(row.original.id)}
              className="text-red-600 dark:text-red-400 cursor-pointer flex items-center gap-1 hover:underline"
              disabled={isDeleting}
            >
              <Trash size={16} />
              Delete
            </button>
          </div>
        ),
      },
    ],
    [isDeleting]
  );

  const table = useReactTable({
    data: categories || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  if (isLoadingCategories) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            {error}
            <button
              onClick={() => dispatch(clearError())}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Categories List
          </h1>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => {
              setSelectedCategory(null);
              setIsEditMode(false);
              setIsAddCategoryOpen(true);
            }}
          >
            <Plus size={20} />
            Add New Category
          </button>
        </div>

        <input
          type="text"
          placeholder="Search categories..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered w-full mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        {/* Table of Categories List */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="table w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-2 whitespace-nowrap"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 whitespace-nowrap text-gray-800 dark:text-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories?.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-lg mb-2">No categories found</p>
            <p className="text-sm">Add your first category to get started!</p>
          </div>
        )}

        {categories?.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            {/* Pagination controls remain the same */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Page</span>
              <strong className="text-gray-800 dark:text-white">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={16} />
              </button>

              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={16} />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from(
                  { length: Math.min(5, table.getPageCount()) },
                  (_, i) => {
                    const pageIndex = i;
                    return (
                      <button
                        key={pageIndex}
                        className={`btn btn-sm ${
                          table.getState().pagination.pageIndex === pageIndex
                            ? "btn-primary"
                            : "btn-ghost text-gray-800 dark:text-white"
                        }`}
                        onClick={() => table.setPageIndex(pageIndex)}
                      >
                        {pageIndex + 1}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={16} />
              </button>

              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Show:
              </span>
              <select
                className="select select-bordered select-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                per page
              </span>
            </div>
          </div>
        )}

        <AddCategories
          isOpen={isAddCategoryOpen}
          onClose={() => {
            setIsAddCategoryOpen(false);
            setSelectedCategory(null);
            setIsEditMode(false);
            dispatch(clearError());
          }}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          existingCategory={selectedCategory}
          isEditMode={isEditMode}
          isLoading={loading || isCreating || isUpdating}
        />
      </main>
    </div>
  );
};

export default Categories;
