import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice.js";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  MapPin,
  CreditCard,
  Calendar,
  Loader2,
  Copy,
  Check,
  Search,
  AlertCircle,
  Receipt,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

// Sub-component for Order status tracking stepper
const OrderStepper = ({ isPaid, isDelivered, paidAt, createdAt }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  const steps = [
    {
      label: "Order Placed",
      sub: createdAt ? formatDate(createdAt) : "Done",
      completed: true,
      icon: ShoppingBag,
    },
    {
      label: "Payment Verified",
      sub: isPaid ? (paidAt ? formatDate(paidAt) : "Verified") : "Pending",
      completed: isPaid,
      icon: CreditCard,
    },
    {
      label: "Dispatched",
      sub: isPaid ? "On transit" : "Awaiting payment",
      completed: isPaid,
      icon: Truck,
    },
    {
      label: "Delivered",
      sub: isDelivered ? "Delivered" : "Pending delivery",
      completed: isDelivered,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="w-full py-6 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800/80 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-[27px] left-[8%] right-[8%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 transition-all duration-500"
            style={{
              width: isDelivered ? "100%" : isPaid ? "66%" : "0%",
            }}
          />
        </div>

        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 md:text-center flex-1 z-10 w-full md:w-auto">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step.completed
                  ? "bg-white dark:bg-slate-950 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600"
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex flex-col md:items-center">
                <span className={`text-sm font-semibold ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                  {step.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {step.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Orders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusText = (isPaid, isDelivered) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Shipped";
    return "Processing";
  };

  const getStatusColorClass = (isPaid, isDelivered) => {
    if (isDelivered) {
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    }
    if (isPaid) {
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
    }
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate Metrics
  const stats = useMemo(() => {
    if (!orders || orders.length === 0) return { total: 0, spent: 0, completed: 0, pending: 0 };
    const total = orders.length;
    const spent = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
    const completed = orders.filter((order) => order.isDelivered).length;
    const pending = orders.filter((order) => !order.isDelivered).length;
    return { total, spent, completed, pending };
  }, [orders]);

  // Filter Orders
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order) => {
      // Tab filter
      let matchesTab = true;
      if (activeTab === "delivered") {
        matchesTab = order.isDelivered;
      } else if (activeTab === "shipped") {
        matchesTab = order.isPaid && !order.isDelivered;
      } else if (activeTab === "processing") {
        matchesTab = !order.isPaid && !order.isDelivered;
      }

      // Search filter
      let matchesSearch = true;
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        const idMatches = order._id.toLowerCase().includes(searchLower);
        const itemMatches = order.orderItems.some((item) =>
          item.name.toLowerCase().includes(searchLower)
        );
        matchesSearch = idMatches || itemMatches;
      }

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchTerm]);

  if (isLoading) {
    return (
      <div className="mt-20 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500/10 border-t-indigo-600 animate-spin"></div>
          <Loader2 className="w-6 h-6 text-indigo-600 absolute animate-pulse" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-full mb-4">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Failed to load orders
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm">
          {error?.data?.message || "Something went wrong. Let's try getting your history again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 transform active:scale-95 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20">
                <Package className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                My Orders
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              Manage your purchases, track shipments, and download receipts.
            </p>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        {orders && orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl p-5 shadow-sm dark:shadow-none hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Orders</span>
                <div className="p-2 bg-indigo-500/15 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">{stats.total}</h3>
              <p className="text-xs text-slate-400 mt-1">Placed all-time</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl p-5 shadow-sm dark:shadow-none hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Spent</span>
                <div className="p-2 bg-indigo-500/15 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white truncate">
                ₹{stats.spent.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Net expenditure</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl p-5 shadow-sm dark:shadow-none hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Delivered</span>
                <div className="p-2 bg-emerald-500/15 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">{stats.completed}</h3>
              <p className="text-xs text-slate-400 mt-1">Successfully received</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl p-5 shadow-sm dark:shadow-none hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Processing</span>
                <div className="p-2 bg-amber-500/15 rounded-xl text-amber-600 dark:text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">{stats.pending}</h3>
              <p className="text-xs text-slate-400 mt-1">Active shipments</p>
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-2xl p-4 mb-6 shadow-sm dark:shadow-none flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {["all", "processing", "shipped", "delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15"
                    : "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center text-slate-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 rounded-3xl p-12 text-center shadow-sm dark:shadow-none flex flex-col items-center justify-center">
            <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-500 mb-4 animate-bounce">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No matching orders</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
              We couldn't find any orders matching your selection. Try changing the filters or shopping for new products!
            </p>
            <Link
              to="/all-products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order._id;
              return (
                <div
                  key={order._id}
                  className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900/60 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-300 overflow-hidden ${
                    isExpanded ? "ring-2 ring-indigo-500/20 dark:ring-indigo-500/20 border-slate-200 dark:border-slate-800" : ""
                  }`}
                >
                  {/* Order Card Header */}
                  <div
                    className={`p-5 md:p-6 cursor-pointer transition-colors ${
                      isExpanded ? "bg-slate-50/50 dark:bg-slate-800/10" : "hover:bg-slate-50/30 dark:hover:bg-slate-800/10"
                    }`}
                    onClick={() => toggleOrder(order._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: Status Dot & ID / Date */}
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                              order.isDelivered ? "bg-emerald-400" : order.isPaid ? "bg-blue-400" : "bg-amber-400"
                            }`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${
                              order.isDelivered ? "bg-emerald-500" : order.isPaid ? "bg-blue-500" : "bg-amber-500"
                            }`}></span>
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Order ID</span>
                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 px-2 py-0.5 rounded-lg">
                              <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                #{order._id.slice(-8).toUpperCase()}
                              </code>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(order._id);
                                }}
                                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                title="Copy full Order ID"
                              >
                                {copiedId === order._id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Ordered on {formatDate(order.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Items Preview */}
                      <div className="flex-1 md:px-8">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-2">
                            {order.orderItems.slice(0, 4).map((item, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 group-hover:scale-105"
                                />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-950 dark:bg-slate-900 border border-slate-800 text-[10px] text-white py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                  {item.name}
                                </div>
                              </div>
                            ))}
                            {order.orderItems.length > 4 && (
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 shadow-sm">
                                +{order.orderItems.length - 4}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Total Price, Status Pill, Accordion trigger */}
                      <div className="flex items-center justify-between md:justify-end gap-5 border-t border-slate-100 dark:border-slate-800/30 pt-3 md:pt-0 md:border-t-0">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total</span>
                          <p className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">
                            ₹{order.totalPrice?.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColorClass(
                            order.isPaid,
                            order.isDelivered
                          )}`}>
                            {getStatusText(order.isPaid, order.isDelivered)}
                          </span>

                          <div className={`p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 text-slate-400 transition-all duration-300 ${
                            isExpanded ? "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400" : ""
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Panel */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900">
                      
                      {/* Stepper Tracking Flow */}
                      <div className="p-5 md:p-6 pb-2">
                        <OrderStepper
                          isPaid={order.isPaid}
                          isDelivered={order.isDelivered}
                          paidAt={order.paidAt}
                          createdAt={order.createdAt}
                        />
                      </div>

                      {/* Shipping and Payment Grid */}
                      <div className="px-5 md:px-6 pb-6">
                        <div className="grid md:grid-cols-2 gap-5">
                          {/* Shipping Details */}
                          <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm">Shipping Address</h4>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
                              <p className="font-bold text-slate-800 dark:text-white text-sm">{order.shippingAddress?.address}</p>
                              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                              <p>{order.shippingAddress?.country}</p>
                              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/60 mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                                <span className="font-semibold">Phone:</span>
                                <span className="text-slate-800 dark:text-slate-300">{order.shippingAddress?.phone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Payment Details */}
                          <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-indigo-500/15 rounded-xl text-indigo-600 dark:text-indigo-400">
                                <CreditCard className="w-4 h-4" />
                              </div>
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm">Payment Information</h4>
                            </div>
                            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pl-1">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Method</span>
                                <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">
                                  {order.paymentMethod}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Status</span>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                                  order.isPaid
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                                  {order.isPaid ? "Paid" : "Pending"}
                                </span>
                              </div>
                              {order.paidAt && (
                                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/60 mt-2 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
                                  <span>Paid On</span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-300">{formatDate(order.paidAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="px-5 md:px-6 pb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                            Items Ordered ({order.orderItems.length})
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {order.orderItems.map((item, index) => (
                            <div
                              key={index}
                              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 bg-slate-50/30 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-slate-200 dark:hover:border-slate-700/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-3.5">
                                <div className="relative overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 w-14 h-14 flex-shrink-0 bg-white dark:bg-slate-950">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <Link
                                    to={`/product/${item.productId}`}
                                    className="font-bold text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 text-sm"
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                                    <span>Unit Price:</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">₹{item.price?.toLocaleString()}</span>
                                    <span className="text-slate-300 dark:text-slate-700">•</span>
                                    <span>Quantity:</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{item.quantity}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-slate-100 dark:border-slate-800/30 pt-3 sm:pt-0 sm:border-t-0">
                                <div className="text-left sm:text-right">
                                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Subtotal</span>
                                  <p className="font-extrabold text-slate-800 dark:text-white text-sm">
                                    ₹{(item.price * item.quantity)?.toLocaleString()}
                                  </p>
                                </div>

                                <Link
                                  to={`/product/${item.productId}`}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white rounded-xl transition-all duration-200 shadow-sm"
                                >
                                  <span>View Item</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Receipt Breakdown */}
                      <div className="p-5 md:p-6 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                          <Receipt className="w-4 h-4" />
                          <span>Includes all taxes and shipping fees.</span>
                        </div>
                        <div className="w-full sm:w-72 space-y-2 text-xs">
                          <div className="flex justify-between text-slate-500 dark:text-slate-400">
                            <span>Items Subtotal</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">₹{order.itemPrice?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-slate-500 dark:text-slate-400">
                            <span>Shipping</span>
                            <span>
                              {order.shippingPrice === 0 ? (
                                <span className="text-emerald-500 font-bold">FREE</span>
                              ) : (
                                <span className="font-semibold text-slate-700 dark:text-slate-300">₹{order.shippingPrice}</span>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-500 dark:text-slate-400">
                            <span>Tax</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">₹{order.taxPrice?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-black pt-2.5 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-slate-800 dark:text-white">Order Total</span>
                            <span className="text-base text-indigo-600 dark:text-indigo-400">
                              ₹{order.totalPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
