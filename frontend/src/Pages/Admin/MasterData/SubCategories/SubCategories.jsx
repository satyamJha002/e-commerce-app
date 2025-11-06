import React, { useMemo, useState } from "react";
import AdminSidePanel from "../../../../component/AdminSidePanel";
import { toast } from "react-toastify";
import { Edit, Plus, Trash } from "lucide-react";
import LoadingSpinner from "../../../../component/Loader/LoadingSpinner";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import AddSubCategories from "./AddSubCategories";

const mockSubCategories = [
  {
    id: "1",
    name: "Smartphones",
    description: "Mobile phone and accessories",
    categoryName: "Electronics",
    categoryId: "cat1",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "T-Shirts",
    description: "Casual and formal t-shirts",
    categoryName: "Clothing",
    categoryId: "cat2",
    status: "Active",
    createdAt: "2024-01-16",
  },
];

const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Fashion" },
  { id: "cat3", name: "Home & Garden" },
];

// TODO: in future I am going to create sub categories after completing the categories.
const SubCategories = () => {
  const [activeTab, setActiveTab] = useState("subCategories");
  const [subCategories, setSubCategories] = useState(mockSubCategories);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddSubCategory, setIsAddSubCategory] = useState("false");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const columnHelper = createColumnHelper();

  const handleEdit = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsEditMode(true);
    setIsAddSubCategory(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this sub-category ?")) {
      setSubCategories(subCategories.filter((sc) => sc.id !== id));
      toast.success("Sub-category deleted successfully");
    }
  };

  const handleAddNew = () => {
    setSelectedSubCategory(null);
    setIsEditMode(false);
    setIsAddSubCategory(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Sub Category Name",
        cell: (info) => (
          <div className="font-medium text-foreground">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("categoryName", {
        header: "Parent Category",
        cell: (info) => (
          <div className="text-sm">
            <span className="inlin-flex items-center px-2.5 py-0.5 rounded-full text-sx font-medium bg-primary/10 text-primary">
              {info.getValue()}
            </span>
          </div>
        ),
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
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(info.row.original)}
              className="text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(info.row.original.id)}
              className="text-red-600 dark:text-red-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ],
    []
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
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
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
            onClick={handleAddNew} // here add event
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

        {/* Table of Sub categories list */}
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

        <AddSubCategories
          isOpen={isAddSubCategory}
          onClose={() => {
            setIsAddSubCategory(false);
            setSelectedSubCategory(null);
            setIsEditMode(false);
          }}
          categories={mockCategories}
          existingSubCategory={selectedSubCategory}
          isEditMode={isEditMode}
        />
      </main>
    </div>
  );
};

export default SubCategories;
