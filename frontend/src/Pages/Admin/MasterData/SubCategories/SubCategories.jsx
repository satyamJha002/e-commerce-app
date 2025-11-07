import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidePanel from "../../../../component/AdminSidePanel";
import { toast } from "react-toastify";
import { Edit, Plus, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import AddSubCategories from "./AddSubCategories";
import {
  useGetAllSubCategoryQuery,
  useDeleteSubCategoryMutation,
} from "../../../../slices/subCategoryApiSlice";
import { useGetCategoriesQuery } from "../../../../slices/categoryApiSlice";
import {
  setSelectedSubCategory,
  setFilters,
  clearSelectedSubCategory,
} from "../../../../slices/subCategorySlice";

const SubCategories = () => {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddSubCategory, setIsAddSubCategory] = useState(false);
  const [selectedSubCategory, setLocalSelectedSubCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Redux state
  const { filters, selectedSubCategory: reduxSelectedSubCategory } =
    useSelector((state) => state.subCategories);

  // API calls
  const {
    data: subCategoriesData,
    isLoading,
    error,
    refetch,
  } = useGetAllSubCategoryQuery({
    page: 1,
    limit: 100,
    search: filters.search,
    categoryId: filters.categoryId,
    status: filters.status,
  });

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const categories = categoriesData?.categories || [];
  const subCategories = subCategoriesData?.data || [];

  // Create a mapping of category IDs to names
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((category) => {
      // Use the correct property name - check if it's 'name' or 'categoryName'
      map[category._id] = category.name || category.categoryName;
    });
    console.log("Category Map:", map); // Debug: check what's in the map
    return map;
  }, [categories]);

  const columnHelper = createColumnHelper();

  const handleEdit = (subCategory) => {
    console.log("Editing sub-category:", subCategory); // Debug log
    console.log("Sub-category ID:", subCategory._id); // Debug log
    setLocalSelectedSubCategory(subCategory);
    dispatch(setSelectedSubCategory(subCategory));
    setIsEditMode(true);
    setIsAddSubCategory(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this sub-category?")) {
      return;
    }

    try {
      await deleteSubCategory(id).unwrap();
      toast.success("Sub-category deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete sub-category");
    }
  };

  const handleAddNew = () => {
    setLocalSelectedSubCategory(null);
    dispatch(clearSelectedSubCategory());
    setIsEditMode(false);
    setIsAddSubCategory(true);
  };

  const handleCloseModal = () => {
    setIsAddSubCategory(false);
    setLocalSelectedSubCategory(null);
    dispatch(clearSelectedSubCategory());
    setIsEditMode(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setFilters({ search: globalFilter }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [globalFilter, dispatch]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Sub Category Name",
        cell: (info) => (
          <div className="font-medium text-foreground">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("categoryId", {
        header: "Parent Category",
        cell: (info) => {
          const categoryIdObj = info.getValue();

          const categoryId = categoryIdObj?._id || categoryIdObj;

          const categoryName = categoryMap[categoryId];

          if (categoryName) {
            return (
              <div className="text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {categoryName}
                </span>
              </div>
            );
          }

          // If category name not found
          return (
            <div className="text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300">
                Not Available
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <div className="text-sm text-muted-foreground max-w-xs truncate">
            {info.getValue() || "No description"}
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              info.getValue() === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
        cell: (info) => (
          <div className="text-gray-600 dark:text-gray-400">
            {new Date(info.getValue()).toLocaleDateString()}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(info.row.original)}
              className="text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(info.row.original._id)}
              className="text-red-600 dark:text-red-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ],
    [categoryMap] // ✅ ADD THIS - This is the key fix!
  );

  const table = useReactTable({
    data: subCategories,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab="subCategories" />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Sub Categories
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage product sub-categories and their parent categories
            </p>
          </div>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleAddNew}
          >
            <Plus size={20} />
            Add New SubCategory
          </button>
        </div>

        <input
          type="text"
          placeholder="Search subcategories..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered w-full mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        {/* Loading State */}
        {(isLoading || isLoadingCategories) && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading sub-categories
          </div>
        )}

        {/* Table */}
        {!isLoading && !isLoadingCategories && !error && (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <table className="table w-full bg-white dark:bg-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-2 whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
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
        )}

        <AddSubCategories
          isOpen={isAddSubCategory}
          onClose={handleCloseModal}
          existingSubCategory={selectedSubCategory || reduxSelectedSubCategory}
          isEditMode={isEditMode}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default SubCategories;
