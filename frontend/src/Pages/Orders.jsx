import React, { useState } from "react";
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
} from "lucide-react";

const Orders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (isPaid, isDelivered) => {
    if (isDelivered) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (isPaid) {
      return <Truck className="w-5 h-5 text-blue-500" />;
    } else {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (isPaid, isDelivered) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Shipped";
    return "Processing";
  };

  const getStatusColor = (isPaid, isDelivered) => {
    if (isDelivered) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (isPaid) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Failed to load orders
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No orders yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Looks like you haven't placed any orders.
        </p>
        <Link
          to="/all-products"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleOrder(order._id)}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.isPaid, order.isDelivered)}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order ID
                      </p>
                      <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">
                        ₹{order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.isPaid,
                        order.isDelivered
                      )}`}
                    >
                      {getStatusText(order.isPaid, order.isDelivered)}
                    </span>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {order.orderItems.slice(0, 4).map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  ))}
                  {order.orderItems.length > 4 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                      +{order.orderItems.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {/* Shipping Address */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.shippingAddress?.address}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.postalCode}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.shippingAddress?.country}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Phone: {order.shippingAddress?.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-indigo-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Payment Info
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Method: {order.paymentMethod}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Status:{" "}
                            <span
                              className={
                                order.isPaid ? "text-green-600" : "text-yellow-600"
                              }
                            >
                              {order.isPaid ? "Paid" : "Pending"}
                            </span>
                          </p>
                          {order.paidAt && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Paid on: {formatDate(order.paidAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Order Items ({order.orderItems.length})
                    </h3>
                    <div className="space-y-4">
                      {order.orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            ₹{(item.price * item.quantity)?.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
                    <div className="max-w-xs ml-auto space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₹{order.itemPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shipping
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {order.shippingPrice === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${order.shippingPrice}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tax
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ₹{order.taxPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-indigo-600 dark:text-indigo-400">
                          ₹{order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
