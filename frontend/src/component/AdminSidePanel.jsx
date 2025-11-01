import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidePanel = ({ activeTab, handleTabClick }) => {
  const [hoverDropDown, setHoverDropDown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
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
      key: "masterData",
      label: "Master Data",
      icon: "home_repair_service",
      path: "",
      dropdown: [
        {
          key: "categories",
          label: "Categories",
          path: "/admin-categories",
        },
        {
          key: "subCategories",
          label: "Sub Categories",
          path: "/admin-sub-categories",
        },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      icon: "settings",
      path: "/admin-setting",
    },
  ];

  const handleMouseEnter = (key) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setHoverDropDown(key);
  };

  const handleMouseLeave = () => {
    const timeOut = setTimeout(() => {
      setHoverDropDown(null);
    }, 200);

    setCloseTimeout(timeOut);
  };

  const handleDropDownItemClick = (itemKey) => {
    handleTabClick(itemKey);
    setHoverDropDown(null);
  };

  return (
    <aside className="w-64 bg-gray-700 dark:bg-background-dark flex flex-col border-r border-background-light dark:border-background-dark/20">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => item.dropdown && handleMouseEnter(item.key)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.path}
              onClick={(e) => {
                if (item.dropdown) {
                  e.preventDefault();
                } else {
                  handleTabClick(item.key);
                }
              }}
              className={`flex items-center gap-3 px-4 py-2 mt-2 rounded-lg transition-colors duration-200 ${
                activeTab === item.key
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10"
              } ${item.dropdown ? "justify-between" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="material-icons">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.dropdown && (
                <span className="material-icons text-sm">
                  keyboard_arrow_down
                </span>
              )}
            </Link>

            {item.dropdown && hoverDropDown === item.key && (
              <div className="absolute left-full top-0 ml-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.key}
                    to={dropdownItem.path}
                    onClick={() => handleDropDownItemClick(dropdownItem.key)}
                    className={`block px-4 py-3 text-sm transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      activeTab === dropdownItem.key
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10"
                    }`}
                  >
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidePanel;
