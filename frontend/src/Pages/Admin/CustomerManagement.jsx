// CustomerManagement.jsx
import React, { useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";

const CustomerManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Customer Management
        </h1>
      </main>
    </div>
  );
};

export default CustomerManagement;
