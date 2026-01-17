// AdminDashboard.jsx
import React from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import { useGetDashboardStatsQuery } from "../../slices/dashboardApiSlice";

const AdminDashboard = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab="dashboard" handleTabClick={() => {}} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Dashboard
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error loading dashboard stats</p>
            <p className="text-sm">{error?.data?.message || "Something went wrong"}</p>
          </div>
        )}

        {/* Stats Cards */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Orders",
                  value: data.stats?.totalOrders || 0,
                  icon: "shopping_cart",
                  color: "bg-blue-500",
                },
                {
                  title: "Total Sales",
                  value: formatCurrency(data.stats?.totalSales),
                  icon: "attach_money",
                  color: "bg-green-500",
                },
                {
                  title: "Total Customers",
                  value: data.stats?.totalCustomers || 0,
                  icon: "people",
                  color: "bg-purple-500",
                },
                {
                  title: "Products in Stock",
                  value: data.stats?.productsInStock?.toLocaleString() || 0,
                  icon: "inventory",
                  color: "bg-orange-500",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        {card.title}
                      </h3>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`flex items-center justify-center w-12 h-12 ${card.color} rounded-full`}
                    >
                      <span className="material-icons text-white">
                        {card.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
                {/* Recent Orders */}
                {data.recentActivity?.orders?.map((order) => (
                  <div key={order._id} className="flex items-center p-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <span className="material-icons text-blue-600 dark:text-blue-300">
                        shopping_bag
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        New Order Received
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Order #{order._id.slice(-6).toUpperCase()} - {formatCurrency(order.totalPrice)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                ))}

                {/* Recent Customers */}
                {data.recentActivity?.customers?.map((customer) => (
                  <div key={customer._id} className="flex items-center p-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full">
                      <span className="material-icons text-green-600 dark:text-green-300">
                        person_add
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        New Customer Registered
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {customer.username} ({customer.email})
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(customer.createdAt)}
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {(!data.recentActivity?.orders?.length && !data.recentActivity?.customers?.length) && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No recent activity yet
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
