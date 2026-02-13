import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidePanel from "../../component/AdminSidePanel";
import { useGetMeQuery } from "../../slices/authApiSlice";
import {
  Settings,
  User,
  Mail,
  Shield,
  UserCircle,
  Loader2,
  Info,
  ChevronRight,
  AlertCircle,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const { data: me, isLoading, error } = useGetMeQuery();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "A";
    return name
      .trim()
      .split(/\s+/)
      .map((s) => s[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-white dark:bg-gray-800 p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 animate-pulse" />
              <Loader2 className="absolute inset-0 m-auto w-7 h-7 text-indigo-600 animate-spin" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Loading settings...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {error?.data?.message || "Failed to load account info"}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary btn-sm"
            >
              Try again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-6 sm:p-8 bg-gray-50 dark:bg-gray-900">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage your admin account and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-5xl">
          {/* Left: Account card — spans 7 cols on lg */}
          <section className="lg:col-span-7 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-md h-fit">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                    <UserCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white">
                      Account
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Your admin account details
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  Read only
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white font-semibold text-lg shadow-md shrink-0">
                  {getInitials(me?.username)}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                    Username
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white truncate mt-0.5">
                    {me?.username || "—"}
                  </p>
                </div>
              </div>
              <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700">
                <div className="flex items-center gap-4 py-3 first:pt-0">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white truncate mt-0.5">
                      {me?.email || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 shrink-0">
                    <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white mt-0.5">
                      {me?.isAdmin || me?.role === "admin" ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right column: Profile, About, Quick links — 5 cols on lg */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Profile link card */}
            <Link
              to="/profile"
              className="group block rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800"
            >
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Profile
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Name, phone, address & avatar
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Open</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* About card */}
            <section className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 min-h-0">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white">
                      About
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Admin panel overview
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Use this panel to manage products, orders, customers, and
                  master data. Account changes (e.g. email or password) may require
                  support depending on your setup.
                </p>
              </div>
            </section>

            {/* Quick links */}
            <section className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Quick links
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Jump to admin sections
                </p>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    Dashboard
                  </span>
                </Link>
                <Link
                  to="/admin-product-management"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    Products
                  </span>
                </Link>
                <Link
                  to="/admin-order-management"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    Orders
                  </span>
                </Link>
                <Link
                  to="/admin-customer-management"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    Customers
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Setting;
