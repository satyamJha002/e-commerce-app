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
} from "../../slices/productApiSlice";
import LoadingSpinner from "../../component/Loader/LoadingSpinner";

/* const initialProductData = [
  {
    id: 1,
    name: "Ultraboost 22",`
    brand: "Adidas",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    rating: 4.5,
    reviewCount: 1247,
    badge: "Best Seller",
    imageUrl:
      "https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/456b93731cdb44e68452ae92012fe986_9366/GX9158_09_standard.jpg",
    keyFeatures: ["Boost Technology", "Primeknit Upper", "Continental Rubber"],
    description: [
      "Boost midsole for high energy return",
      "Primeknit+ upper for adaptive support",
      "Continental™ Rubber outsole for grip",
      "Made with recycled materials",
    ],
    stock: 150,
    sku: "SKU12345",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    brand: "Nike",
    price: 2550,
    originalPrice: 3000,
    discount: 15,
    rating: 4.2,
    reviewCount: 89,
    badge: "New Arrival",
    imageUrl: "https://example.com/tshirt.jpg",
    keyFeatures: ["Organic Cotton", "Breathable Fabric"],
    description: [
      "Made from 100% organic cotton",
      "Comfortable and breathable",
    ],
    stock: 200,
    sku: "SKU67890",
  },
];
 */

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  // console.log("Product data: ", productsData); // product data showing undefined

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

  const handleEditProduct = (productId) => {
    // Implement edit functionality
    console.log("Edit product:", productId);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product:", productId);
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
              <div className="font-medium">{row.original.name}</div>
              <div className="text-sm text-gray-500">{row.original.brand}</div>
            </div>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">
              ₹{row.original.price.toLocaleString()}
            </div>
            {row.original.originalPrice > row.original.price && (
              <div className="text-sm text-gray-500 line-through">
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
            <span>{row.original.rating}</span>
            <span className="text-gray-500">({row.original.reviewCount})</span>
          </div>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: ({ row }) => (
          <span
            className={
              row.original.countInStock === 0 ? "text-red-600 font-medium" : ""
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
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {row.original.category}
          </span>
        ),
      },
      {
        header: "Badge",
        accessorKey: "badge",
        cell: ({ row }) =>
          row.original.badge ? (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {row.original.badge}
            </span>
          ) : null,
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <button
              onClick={() => handleEditProduct(row.original.id)}
              className="text-blue-600 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(row.original.id)}
              className="text-red-600 cursor-pointer flex items-center gap-1 hover:underline"
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
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8">
          <LoadingSpinner size="xl" text="Loading Products..." type="bars" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8">
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
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
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
          className="input input-bordered w-full mb-4"
        />

        {/* Table of Product List */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left text-cyan-600 px-4 py-2 whitespace-nowrap"
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
                <tr key={row.id} className="hover:bg-gray-800">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
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
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm">Add your first product to get started!</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page</span>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Previous Page */}
              <button
                className="btn btn-sm btn-ghost"
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
                            : "btn-ghost"
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
                className="btn btn-sm btn-ghost"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={16} />
              </button>

              {/* Last Page */}
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                className="select select-bordered select-sm"
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
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>
        )}

        <AddProduct
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddProduct}
          isLoading={isCreating}
        />
      </main>
    </div>
  );
};

export default ProductManagement;
