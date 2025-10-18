import React, { useMemo, useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import { toast } from "react-toastify";
import { Edit, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import AddProduct from "./ProductManagement/AddProduct";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
} from "../../slices/productApiSlice";

/* const initialProductData = [
  {
    id: 1,
    name: "Ultraboost 22",
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

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

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
      setProducts((prev) => prev.filter((product) => product.id !== productId));
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
              src={row.original.imageUrl}
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
        header: "SKU",
        accessorKey: "sku",
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
              row.original.stock === 0 ? "text-red-600 font-medium" : ""
            }
          >
            {row.original.stock}
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
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading products...</div>
          </div>
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
                      className="text-left text-cyan-600 px-4 py-2"
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
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
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
          <div className="text-center py-8 text-gray-500">
            No products found. Add your first product!
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
