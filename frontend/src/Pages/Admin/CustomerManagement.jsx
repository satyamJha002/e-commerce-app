// CustomerManagement.jsx
import React, { useState, useMemo } from "react";
import AdminSidePanel from "../../component/AdminSidePanel";
import {
  useGetAllUsersQuery,
  useGetAdminUserDetailsQuery,
} from "../../slices/authApiSlice";
import {
  Users,
  Loader2,
  Mail,
  User,
  Shield,
  UserCircle,
  Search,
  Eye,
  X,
  MapPin,
  Phone,
} from "lucide-react";

const CustomerManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // all | user | admin
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const {
    data: userDetailsData,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetAdminUserDetailsQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    let list = [...users];
    if (roleFilter === "user")
      list = list.filter((u) => !u.isAdmin && u.role !== "admin");
    if (roleFilter === "admin")
      list = list.filter((u) => u.isAdmin || u.role === "admin");
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (u) =>
          (u.username && u.username.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [users, search, roleFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
        <AdminSidePanel activeTab={activeTab} handleTabClick={handleTabClick} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading customers...
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
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">
              {error?.data?.message || "Failed to load customers"}
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
          <Users className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Customer Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-bordered bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600"
          >
            <option value="all">All users</option>
            <option value="user">Customers only</option>
            <option value="admin">Admins only</option>
          </select>
        </div>

        {!users || users.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No users yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Registered users will appear here.
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No matches
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No users match your search or filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setRoleFilter("all");
              }}
              className="btn btn-ghost"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <table className="table w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-3">
                    User
                  </th>
                  <th className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-3">
                    Email
                  </th>
                  <th className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-3">
                    Role
                  </th>
                  <th className="text-left text-cyan-600 dark:text-cyan-400 px-4 py-3">
                    Joined
                  </th>
                  <th className="text-right text-cyan-600 dark:text-cyan-400 px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {user.username || "—"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        {user.email || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {user.isAdmin || user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <Shield className="w-3.5 h-3.5" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          <UserCircle className="w-3.5 h-3.5" />
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {user.createdAt ? formatDate(user.createdAt) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedUserId(user._id)}
                        className="btn btn-sm btn-ghost gap-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User details modal */}
        {selectedUserId && (
          <dialog open className="modal modal-open">
            <div className="modal-box max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-indigo-600" />
                  User Details
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedUserId(null)}
                  className="btn btn-sm btn-circle btn-ghost"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isLoadingDetails ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading details...
                  </p>
                </div>
              ) : detailsError ? (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">
                    {detailsError?.data?.message ||
                      "Failed to load user details"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedUserId(null)}
                    className="btn btn-ghost"
                  >
                    Close
                  </button>
                </div>
              ) : userDetailsData ? (
                <div className="space-y-6">
                  {/* Account info */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-indigo-600" />
                      Account
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Username
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {userDetailsData.user?.username || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">
                          Email
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white truncate">
                          {userDetailsData.user?.email || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Role
                        </span>
                        {userDetailsData.user?.isAdmin ||
                        userDetailsData.user?.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            <Shield className="w-3.5 h-3.5" /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                            <UserCircle className="w-3.5 h-3.5" /> Customer
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Joined
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {userDetailsData.user?.createdAt
                            ? formatDate(userDetailsData.user.createdAt)
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile (UserDetails) */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-600" />
                      Profile
                    </h4>
                    {userDetailsData.profile ? (
                      <div className="space-y-3">
                        {userDetailsData.profile.avatar && (
                          <div className="flex justify-center mb-3">
                            <img
                              src={userDetailsData.profile.avatar}
                              alt="Avatar"
                              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                            />
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">
                              First name
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {userDetailsData.profile.firstName || "—"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">
                              Last name
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {userDetailsData.profile.lastName || "—"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">
                              Phone
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {userDetailsData.profile.phoneNumber || "—"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">
                              Address
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">
                              {userDetailsData.profile.address || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Profile not set up yet.
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              <div className="modal-action mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedUserId(null)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/50">
              <button type="button" onClick={() => setSelectedUserId(null)}>
                close
              </button>
            </form>
          </dialog>
        )}

        {users?.length > 0 && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredUsers.length} of {users.length} user
            {users.length !== 1 ? "s" : ""}
          </p>
        )}
      </main>
    </div>
  );
};

export default CustomerManagement;
