import React, { useMemo, useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import { toast } from "react-toastify";
import { ChevronsLeft, ChevronsRight, Edit, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import AddProduct from "./ProductManagement/AddProduct";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductByIdMutation,
} from "../../slices/productApiSlice";
import LoadingSpinner from "../../component/Loader/LoadingSpinner";

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const [updateProductById, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddProduct = async (productData) => {
    try {
      const result = await createProduct(productData).unwrap();
      toast.success("Product created successfully");
      console.log("Created success", result);

      refetch();
    } catch (error) {
      console.error("Failed to create product", error);
      toast.error("Failed to create product");
    }
  };

  const handleEditProduct = (product) => {
    console.log("Product ID:", product._id);
    console.log("Product ID type:", typeof product._id);

    setSelectedProduct(product);

    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    console.log("handle update function: ", id);
    console.log("handle update function: ", typeof id);

    if (!id || typeof id !== "string") {
      toast.error("Invalid product id");
      return;
    }

    try {
      await updateProductById({ id, data: updatedData }).unwrap();
      toast.success("Product updated successfully");
      refetch();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update product", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!productId) {
      toast.error("Invalid product ID");
      return;
    }
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product delete successfully");
      refetch();
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to delete product ---->>", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.images[0]}
              alt={row.original.name}
              className="w-10 h-10 object-cover rounded"
            />
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {row.original.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {row.original.brand}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              ₹{row.original.price.toLocaleString()}
            </div>
            {row.original.originalPrice > row.original.price && (
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ₹{row.original.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        ),
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-800 dark:text-gray-200">
              {row.original.rating}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              ({row.original.reviewCount})
            </span>
          </div>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: ({ row }) => (
          <span
            className={
              row.original.countInStock === 0
                ? "text-red-600 font-medium"
                : "text-gray-800 dark:text-gray-200"
            }
          >
            {row.original.countInStock}
          </span>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: ({ row }) => (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
            {row.original.category?.categoryName || "N/A"}
          </span>
        ),
      },
      {
        header: "Badge",
        accessorKey: "badge",
        cell: ({ row }) =>
          row.original.badge ? (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              {row.original.badge}
            </span>
          ) : null,
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleEditProduct(row.original)}
              className="text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(row.original._id)}
              className="text-red-600 dark:text-red-400 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Trash size={16} />
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const products = productsData?.products || productsData || [];

  const table = useReactTable({
    data: products,
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <LoadingSpinner size="xl" text="Loading Products..." type="bars" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <div className="alert alert-error">
            <div>
              Error loading products: {error.data?.message || error.message}
            </div>
            <button onClick={refetch} className="btn btn-sm btn-outline">
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Products
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddProductOpen(true)}
            disabled={isCreating}
          >
            {isCreating ? "Adding..." : "Add New Product"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Product"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered w-full mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        {/* Table of Product List */}
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

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm">Add your first product to get started!</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Page</span>
              <strong className="text-gray-800 dark:text-white">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Previous Page */}
              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Page Numbers */}
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

              {/* Next Page */}
              <button
                className="btn btn-sm btn-ghost text-gray-800 dark:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={16} />
              </button>

              {/* Last Page */}
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

        <AddProduct
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddProduct}
          isLoading={isCreating}
        />

        <AddProduct
          isOpen={isEditProductOpen}
          onClose={() => setIsEditProductOpen(false)}
          onEditProduct={handleUpdateProduct}
          existingProduct={selectedProduct}
          isEditMode={true}
          isLoading={isUpdating}
        />
      </main>
    </div>
  );
};

export default ProductManagement;
