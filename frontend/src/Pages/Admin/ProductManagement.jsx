import React, { useMemo, useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import { Edit, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const productData = [
  {
    name: "Eco-Friendly Water Bottle",
    sku: "SKU12345",
    price: "$15.99",
    stock: 150,
  },
  {
    name: "Organic Cotton T-Shirt",
    sku: "SKU67890",
    price: "$25.50",
    stock: 200,
  },
  {
    name: "Reusable Shopping Bag",
    sku: "SKU11223",
    price: "$8.75",
    stock: 300,
  },
  { name: "Bamboo Toothbrush", sku: "SKU44556", price: "$4.20", stock: 100 },
  {
    name: "Recycled Paper Notebook",
    sku: "SKU77889",
    price: "$6.50",
    stock: 250,
  },
];

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [globalFilter, setGlobalFilter] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const columns = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Actions",
        cell: () => (
          <div className="flex gap-3">
            <button className="text-blue-600 cursor-pointer flex items-center gap-1 hover:underline">
              <Edit size={16} />
            </button>
            <button className="text-red-600 cursor-pointer flex items-center gap-1 hover:underline">
              <Trash size={16} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: productData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="btn btn-primary">Add New Product</button>
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
                      className="text-left text-cyan-600  px-4 py-2"
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
                <tr key={row.id} className="hover:bg-gray-500">
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
      </main>
    </div>
  );
};

export default ProductManagement;
