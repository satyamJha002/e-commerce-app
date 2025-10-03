import asyncHandler from "../middleware/asyncHandler.js";
import Auth from "../models/auth.model.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const field = [email, password, username];

  if (field.some((f) => !f)) {
    res.status(400);
    throw new Error("Please fill out the required field");
  }

  const authExist = await Auth.findOne({ $or: [{ email }, { username }] });

  if (authExist) {
    res.status(400);
    throw new Error("User is already registered with this email and username");
  }

  // Coerce incoming admin indicators safely
  const requestedRole = (req.body.role || "user").toLowerCase();
  const requestedIsAdmin =
    typeof req.body.isAdmin === "string"
      ? req.body.isAdmin.toLowerCase() === "true"
      : Boolean(req.body.isAdmin);

  const makeAdmin = requestedRole === "admin" || requestedIsAdmin === true;

  const auth = await Auth.create({
    email,
    password,
    username,
    role: makeAdmin ? "admin" : "user",
    isAdmin: makeAdmin,
  });

  if (auth) {
    const token = generateToken(auth._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Standard practice
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/",
    });

    res.status(201).json({
      _id: auth._id,
      email: auth.email,
      username: auth.username,
      role: auth.role,
      isAdmin: auth.isAdmin,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill out the required field");
  }

  const auth = await Auth.findOne({ email });

  if (auth && (await auth.matchPassword(password))) {
    const token = generateToken(auth._id);
    const refreshToken = generateRefreshToken(auth._id);

    auth.refreshToken = refreshToken;
    await auth.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Standard practice
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 30 days
      path: "/",
    });

    const refreshTokenMaxAge = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: refreshTokenMaxAge,
      path: "/",
    });

    res.status(200).json({
      _id: auth._id,
      email: auth.email,
      username: auth.username,
      role: auth.role,
      isAdmin: auth.isAdmin,
      token,
      rememberMe,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email and password");
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh Token is required");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SCRET);

  const auth = Auth.findOne({
    _id: decoded.userId,
    refreshToken: refreshToken,
  });

  if (!auth) {
    res.status(401);
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateToken(auth._id);

  res.cookie("token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  });

  res.status(200).json({
    _id: auth._id,
    email: auth.email,
    username: auth.username,
    role: auth.role,
    isAdmin: auth.isAdmin,
    token: newAccessToken,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const auth = await Auth.findById(req.user._id).select("-password"); // Fixed typo

  if (!auth) {
    return res.status(404).json({ message: "Auth not found" });
  }

  res.status(200).json({
    _id: auth._id,
    email: auth.email,
    username: auth.username,
    role: auth.role,
    isAdmin: auth.isAdmin,
  });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await Auth.findOneAndUpdate(
      { refreshToken: refreshToken },
      { $unset: { refreshToken: 1 } }
    );
  }

  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});
export { register, login, getMe, logout, refreshToken };
