import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    role: { type: String, enum: ["user", "admin"] },
    isAdmin: { type: Boolean, default: false, required: true },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true },
);

authSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $type: "string" } } },
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
