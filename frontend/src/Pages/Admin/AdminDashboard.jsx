import React, { useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-white">
          Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
          <div className="p-6 bg-white rounded-lg dark:bg-background-dark">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-800">
              Total Sales
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-700 dark:text-gray-800">
              $120,500
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg dark:bg-background-dark">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-800">
              New Orders
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-700 dark:text-gray-800">
              350
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg dark:bg-background-dark">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-800">
              Product Inventory
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-700 dark:text-gray-800">
              1,200
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 dark:text-white">
            Recent Activity
          </h3>
          <div className="mt-4 bg-white rounded-lg dark:bg-background-dark">
            <ul className="divide-y divide-background-light dark:divide-background-dark/20">
              <li className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="material-icons text-primary">
                    shopping_bag
                  </span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700 dark:text-gray-800">
                    New Order Received
                  </p>
                  <p className="text-sm text-gray-600 font-semibold dark:text-gray-600">
                    Order #12345
                  </p>
                </div>
              </li>
              <li className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="material-icons text-primary">warning</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700 dark:text-gray-800">
                    Low Stock Alert
                  </p>
                  <p className="text-sm text-gray-600 font-semibold dark:text-gray-600">
                    Product: Smart Watch
                  </p>
                </div>
              </li>
              <li className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="material-icons text-primary">
                    person_add
                  </span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-700 dark:text-gray-800">
                    New Customer Registered
                  </p>
                  <p className="text-sm text-gray-600 font-semibold dark:text-gray-600">
                    Customer: Sarah Miller
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
