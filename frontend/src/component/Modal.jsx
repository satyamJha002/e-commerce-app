import React from "react";
import { useUpdateProfileDetailsMutation } from "../slices/profileApiSlice";
import { toast } from "react-toastify";
import { User, Mail, MapPin, Phone } from "lucide-react";

const Modal = ({ profileData, onClose }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileDetailsMutation();

  const [formData, setFormData] = React.useState({
    firstName: profileData?.profile?.firstName || "",
    lastName: profileData?.profile?.lastName || "",
    phoneNumber: profileData?.profile?.phoneNumber || "",
    address: profileData?.profile?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <dialog id="profile_modal" className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
          <User className="w-6 h-6" />
          Update Profile Information
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email (cannot be changed)</span>
                </label>
                <input
                  type="email"
                  value={profileData?.user?.email || ""}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </span>
              </label>
              <div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24 w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-action mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
