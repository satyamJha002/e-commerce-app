import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    categoryName: { type: String, required: true },
    categoryDescp: { type: String },
    productCount: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    categoryImage: { type: String },
    // store Cloudinary public_id (including folder path) when available for reliable deletes
    categoryImagePublicId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
