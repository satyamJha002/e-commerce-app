import React from "react";
import { Link } from "react-router-dom";

const AdminSidePanel = ({ activeTab, handleTabClick }) => {
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      path: "/admin-dashboard",
    },
    {
      key: "products",
      label: "Products",
      icon: "inventory_2",
      path: "/admin-product-management",
    },
    {
      key: "orders",
      label: "Orders",
      icon: "shopping_cart",
      path: "/admin-order-management",
    },
    {
      key: "customers",
      label: "Customers",
      icon: "group",
      path: "/admin-customer-management",
    },
    {
      key: "settings",
      label: "Settings",
      icon: "settings",
      path: "/admin-setting",
    },
  ];

  return (
    <aside className="w-64 bg-gray-700 dark:bg-background-dark flex flex-col border-r border-background-light dark:border-background-dark/20">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            onClick={() => handleTabClick(item.key)}
            className={`flex items-center gap-3 px-4 py-2 mt-2 rounded-lg transition-colors duration-200 ${
              activeTab === item.key
                ? "bg-primary/10  text-primary dark:bg-primary/20 dark:text-primary"
                : "text-gray-700 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10"
            }`}
          >
            <span className="material-icons">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidePanel;
