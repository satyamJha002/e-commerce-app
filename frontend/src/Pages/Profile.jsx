import { Link } from "react-router-dom";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Package,
  Calendar,
  DollarSign,
  Eye,
  CheckCircle,
  Truck,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../slices/profileApiSlice.js";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice.js";
import { useState } from "react";
import Modal from "../component/Modal.jsx";
import { useUpdateAvatarMutation } from "../slices/profileApiSlice.js";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: profileData, isLoading, error } = useGetProfileQuery();

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadAvatar, { isLoading: isUploading }] = useUpdateAvatarMutation();
  const { data: orders = [], isLoading: ordersLoading } = useGetMyOrdersQuery();

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await uploadAvatar(formData).unwrap();
      console.log("Avatar response: ", response);

      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update avatar");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>Error loading profile. Please try again.</span>
        </div>
      </div>
    );
  }

  const user = {
    name: `${profileData?.profile?.firstName} ${profileData?.profile?.lastName}`,
    email: userInfo?.email,
    address: profileData?.profile?.address,
    phone: profileData?.profile?.phoneNumber,
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/30/10/40/key-1013662_1280.jpg",
    joinDate: new Date(userInfo?.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    // totalOrders: computed from orders array (safe fallback to 0)
    totalOrders: orders?.length || 0,
    /*
      totalSpent: use order.totalPrice if present, otherwise fall back to order.total.
      Ensure missing values default to 0 so the UI doesn't show "undefined".
    */
    totalSpent:
      orders?.reduce(
        (sum, order) => sum + ((order?.totalPrice ?? order?.total) || 0),
        0
      ) || 0,
  };

  const getStatusBadge = (isPaid, isDelivered) => {
    if (isDelivered) return "badge-success";
    if (isPaid) return "badge-info";
    return "badge-warning";
  };

  const getStatusText = (isPaid, isDelivered) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Shipped";
    return "Processing";
  };

  return (
    <>
      <div className="min-h-screen bg-base-200">
        {/* Header with gradient background */}
        <div className="text-primary-content">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center gap-8 pt-14 pb-5">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-32 rounded-full relative ring ring-primary-content ring-offset-base-100 ring-offset-2 group">
                  <img
                    src={
                      profileData?.profile?.avatar ||
                      user.avatar ||
                      "/placeholder.svg"
                    }
                    alt={user.name}
                    className="object-cover"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <span className="text-white text-xs font-semibold">
                        Change
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Name + Email */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {user.name}
                </h1>
                <p className="text-xl opacity-90">{user.email}</p>
              </div>
            </div>

            {/* Stats on the far right */}
            <div className="flex gap-4 self-center md:self-start">
              <div className="stat bg-primary-content/20 rounded-lg text-primary-content flex justify-content-between items-center">
                <div className="stat-value text-2xl">{user.totalOrders}</div>
                <div className="stat-title text-2xl font-semibold  text-primary-content/50">
                  Total Orders
                </div>
              </div>

              <div className="stat bg-primary-content/20 rounded-lg text-primary-content flex justify-content-between items-center">
                <div className="stat-value text-2xl">
                  ₹{orders.reduce((sum, order) => sum + (order?.totalPrice || 0), 0).toLocaleString()}
                </div>
                <div className="stat-title text-2xl font-semibold text-primary-content/50">
                  Total Spent
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6">
                    <User className="w-6 h-6" />
                    Profile Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-sm opacity-70">
                          Email
                        </p>
                        <p className="text-base">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-sm opacity-70">
                          Phone
                        </p>
                        <p className="text-base">{user.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold text-sm opacity-70">
                          Address
                        </p>
                        <p className="text-base">{user.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6">
                    <Package className="w-6 h-6" />
                    Order History
                  </h2>

                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th className="text-base">Order ID</th>
                            <th className="text-base">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Date
                              </div>
                            </th>
                            <th className="text-base">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Total
                              </div>
                            </th>
                            <th className="text-base">Status</th>
                            <th className="text-base">Items</th>
                            <th className="text-base">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order._id} className="hover">
                              <td className="font-mono font-semibold">
                                #{order._id.slice(-8).toUpperCase()}
                              </td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="font-semibold">
                                ₹{order.totalPrice?.toLocaleString()}
                              </td>
                              <td>
                                <div
                                  className={`badge ${getStatusBadge(
                                    order.isPaid,
                                    order.isDelivered
                                  )} badge-lg`}
                                >
                                  {getStatusText(order.isPaid, order.isDelivered)}
                                </div>
                              </td>
                              <td>
                                <div className="text-sm">
                                  {order.orderItems?.slice(0, 2).map((item, index) => (
                                    <div key={index} className="opacity-70 truncate max-w-[150px]">
                                      {item.name} (x{item.quantity})
                                    </div>
                                  ))}
                                  {order.orderItems?.length > 2 && (
                                    <div className="opacity-50 text-xs">+{order.orderItems.length - 2} more</div>
                                  )}
                                </div>
                              </td>
                              <td>
                                <Link to="/orders-summary">
                                  <button className="btn btn-ghost btn-sm">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {orders.length > 5 && (
                        <div className="text-center mt-4">
                          <Link to="/orders-summary">
                            <button className="btn btn-outline btn-sm">
                              View All Orders ({orders.length})
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-base-300 mb-4" />
                      <p className="text-lg text-base-content/70">
                        No orders found
                      </p>
                      <p className="text-sm text-base-content/50 mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Link to="/all-products">
                        <button className="btn btn-primary">
                          Start Shopping
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link to="/wishlist">
                    <button className="btn btn-outline btn-block">
                      View Wishlist
                    </button>
                  </Link>
                  <Link to="/addresses">
                    <button className="btn btn-outline btn-block">
                      Manage Addresses
                    </button>
                  </Link>
                  <Link to="/payment-methods">
                    <button className="btn btn-outline btn-block">
                      Payment Methods
                    </button>
                  </Link>
                  <Link to="/support">
                    <button className="btn btn-outline btn-block">
                      Contact Support
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal profileData={profileData} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default Profile;
