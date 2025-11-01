// AdminDashboard.jsx
import React, { useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Sales", value: "$120,500" },
            { title: "New Orders", value: "350" },
            { title: "Product Inventory", value: "1,200" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
            {[
              {
                icon: "shopping_bag",
                title: "New Order Received",
                desc: "Order #12345",
              },
              {
                icon: "warning",
                title: "Low Stock Alert",
                desc: "Product: Smart Watch",
              },
              {
                icon: "person_add",
                title: "New Customer Registered",
                desc: "Customer: Sarah Miller",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <span className="material-icons text-blue-600 dark:text-blue-300">
                    {item.icon}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
