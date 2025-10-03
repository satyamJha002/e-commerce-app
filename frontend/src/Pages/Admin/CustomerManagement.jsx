import React, { useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";

const CustomerManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8">
        <h1>Customer Management</h1>
      </main>
    </div>
  );
};

export default CustomerManagement;
