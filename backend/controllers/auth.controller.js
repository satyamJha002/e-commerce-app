import asyncHandler from "../middleware/asyncHandler.js";
import Auth from "../models/auth.model.js";
import UserDetails from "../models/userDetails.model.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const field = [email, password, username];

  if (field.some((f) => !f)) {
    res.status(400);
    throw new Error("Please fill out the required field");
  }

  const authExist = await Auth.findOne({ $or: [{ email: { $eq: email } }, { username: { $eq: username } }] });

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
  const token = req.cookies?.token;

  if (!token) {
    res.status(401);
    throw new Error("No token in found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const auth = await Auth.findById(decoded.id).select("-password");

    if (auth) {
      res.status(401);
      throw new Error("User not found");
    }

    const newToken = generateToken(auth._id);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "Token refreshed successfully",
      token: newToken,
    });
  } catch (error) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    res.status(401);
    throw new Error("Token expired, please login again");
  }
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

const googleLogin = asyncHandler(async (req, res) => {
  const { token: googleToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, sub: googleId } = ticket.getPayload();

  let auth = await Auth.findOne({
    $or: [{ email }, { googleId }],
  });

  if (!auth) {
    // Register new user
    auth = await Auth.create({
      username: name,
      email,
      googleId,
      password: "", // Optional or handle as per schema
      role: "user",
      isAdmin: false,
    });
  } else if (!auth.googleId) {
    // Link existing account
    auth.googleId = googleId;
    await auth.save();
  }

  const token = generateToken(auth._id);
  const refreshToken = generateRefreshToken(auth._id);

  auth.refreshToken = refreshToken;
  await auth.save();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({
    _id: auth._id,
    email: auth.email,
    username: auth.username,
    role: auth.role,
    isAdmin: auth.isAdmin,
    token,
  });
});

// @desc    Get all users (Admin)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Auth.find({})
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });
  res.status(200).json(users);
});

// @desc    Get user by ID with profile details (Admin)
// @route   GET /api/auth/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const auth = await Auth.findById(req.params.id).select("-password -refreshToken");
  if (!auth) {
    res.status(404);
    throw new Error("User not found");
  }
  const profile = await UserDetails.findOne({ auth: auth._id });
  res.status(200).json({
    user: {
      _id: auth._id,
      email: auth.email,
      username: auth.username,
      role: auth.role,
      isAdmin: auth.isAdmin,
      createdAt: auth.createdAt,
    },
    profile: profile || null,
  });
});

export { register, login, getMe, logout, refreshToken, googleLogin, getAllUsers, getUserById };
