// OrderManagement.jsx
import { useState } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import {
  useGetAllOrdersQuery,
  useUpdateOrderToDeliveredMutation,
} from "../../slices/orderApiSlice";
import { toast } from "react-toastify";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Loader2,
  ShoppingBag,
} from "lucide-react";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deliveringOrderId, setDeliveringOrderId] = useState(null);

  const { data: orders, isLoading, error, refetch } = useGetAllOrdersQuery();
  const [updateDelivered, { isLoading: isUpdatingDelivered }] =
    useUpdateOrderToDeliveredMutation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (isPaid, isDelivered) => {
    if (isDelivered)
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (isPaid) return <Truck className="w-5 h-5 text-blue-500" />;
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  const getStatusText = (isPaid, isDelivered) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Shipped";
    return "Processing";
  };

  const getStatusColor = (isPaid, isDelivered) => {
    if (isDelivered)
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (isPaid)
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCustomerName = (order) => {
    if (!order.user) return "—";
    const u = order.user;
    if (u.firstName || u.lastName)
      return [u.firstName, u.lastName].filter(Boolean).join(" ");
    return u.email || "—";
  };

  const handleMarkDelivered = async (orderId) => {
    setDeliveringOrderId(orderId);
    try {
      await updateDelivered(orderId).unwrap();
      toast.success("Order marked as delivered");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update order");
    } finally {
      setDeliveringOrderId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">
              {error?.data?.message || "Failed to load orders"}
            </p>
            <button onClick={refetch} className="btn btn-primary">
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
      <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Order Management
          </h1>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Orders from customers will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div
                  className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleOrder(order._id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.isPaid, order.isDelivered)}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Order ID
                        </p>
                        <p className="font-mono text-sm font-medium text-gray-800 dark:text-white">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div className="hidden sm:block border-l border-gray-200 dark:border-gray-600 pl-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Customer
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {getCustomerName(order)}
                        </p>
                        {order.user?.email && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {order.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400">
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
                      {!order.isDelivered && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkDelivered(order._id);
                          }}
                          disabled={deliveringOrderId === order._id}
                          className="btn btn-sm btn-primary"
                        >
                          {deliveringOrderId === order._id
                            ? "..."
                            : "Mark delivered"}
                        </button>
                      )}
                      {expandedOrder === order._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {order.orderItems?.slice(0, 4).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    ))}
                    {order.orderItems?.length > 4 && (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                        +{order.orderItems.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/30">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white mb-1">
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
                              {order.shippingAddress?.country} •{" "}
                              {order.shippingAddress?.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white mb-1">
                              Payment
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.paymentMethod} •{" "}
                              <span
                                className={
                                  order.isPaid
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }
                              >
                                {order.isPaid ? "Paid" : "Pending"}
                              </span>
                            </p>
                            {order.paidAt && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Paid: {formatDate(order.paidAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                        Items ({order.orderItems?.length || 0})
                      </h3>
                      <div className="space-y-3">
                        {order.orderItems?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 dark:text-white truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Qty: {item.quantity} × ₹
                                {item.price?.toLocaleString()}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-white shrink-0">
                              ₹
                              {(item.price * item.quantity)?.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderManagement;
