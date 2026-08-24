import express from "express";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import productRoute from "./routes/product.route.js";
import categoryRoute from "./routes/categories.route.js";
import subCategoryRoute from "./routes/subCategory.route.js";
import authRoute from "./routes/auth.route.js";
import userDetailRoute from "./routes/userDetails.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import orderRoute from "./routes/order.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDb();

const port = process.env.PORT || 5000;
const app = express();
app.use(helmet());

const normalizeOrigin = (origin) => origin.trim().replace(/\/$/, "");
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://e-commerce-app-taupe-three.vercel.app",
  ...(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .filter(Boolean)
    .map(normalizeOrigin),
].map(normalizeOrigin);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
app.use(compression());
app.use("/api", apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/product", productRoute);
app.use("/api/subCategory", subCategoryRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", userDetailRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/orders", orderRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
