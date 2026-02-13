# E-Commerce App (MERN Stack)

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It includes a customer-facing store with cart, checkout, and orders, plus an admin panel for managing products, orders, customers, and master data.

---

## Project Overview

- **Customer side:** Browse products by category/subcategory, add to cart, checkout with Stripe or COD, view orders, and manage profile (name, phone, address, avatar).
- **Admin side:** Dashboard stats, product CRUD, order management (mark delivered), customer list with user details, categories & subcategories (master data), and settings. Admin login is separate; logout redirects to admin login.

**Key features:**
- User authentication (register, login, Google OAuth, JWT + refresh token, httpOnly cookies)
- Product catalog with categories and subcategories
- Shopping cart (Redux, persisted)
- Checkout: Stripe payment or Cash on Delivery (COD)
- Order history and order success flow
- Admin dashboard, product/order/customer management, settings
- Profile with avatar upload (Cloudinary)
- Responsive UI with Tailwind CSS and DaisyUI

---

## Tech Stack

| Layer      | Technology |
|-----------|------------|
| **Frontend** | React 19, Vite 7, React Router 7, Redux Toolkit (RTK Query), Tailwind CSS 4, DaisyUI, Lucide React, React Toastify |
| **Backend**  | Node.js, Express 5, Mongoose |
| **Database** | MongoDB |
| **Auth**     | JWT, bcryptjs, Google OAuth 2, httpOnly cookies |
| **Payments** | Stripe |
| **File storage** | Cloudinary (e.g. product images, avatars) |

---

## File Structure

```
e-commerce-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Register, login, Google, getMe, getAllUsers, getUserById
│   │   ├── order.controller.js   # Create order, verify payment, get orders, deliver (admin)
│   │   ├── product.controller.js
│   │   ├── categories.controller.js
│   │   ├── subCategories.controller.js
│   │   ├── userDetails.controller.js  # Profile (avatar, name, phone, address)
│   │   └── dashboard.controller.js   # Admin stats
│   ├── middleware/
│   │   ├── authMiddleware.js     # protectAuthMiddleware, admin
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── auth.model.js
│   │   ├── userDetails.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   ├── categories.model.js
│   │   └── subCategories.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── order.route.js
│   │   ├── product.route.js
│   │   ├── categories.route.js
│   │   ├── subCategory.route.js
│   │   ├── userDetails.route.js
│   │   └── dashboard.route.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── cloudinary.js
│   │   └── cloudinaryConfig.js
│   └── index.js                  # Express app entry
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── component/            # Header, Footer, Modal, AdminSidePanel, etc.
│   │   ├── Pages/                 # Home, Cart, CheckOut, Orders, Profile, Admin/*, etc.
│   │   ├── slices/                # Redux: authSlice, cartSlice, apiSlice, *ApiSlice
│   │   ├── constants.js           # BASE_URL, API paths
│   │   ├── store.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .env                          # Backend env (create from .env.example)
├── package.json                  # Root scripts + backend deps
└── README.md
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Stripe** account (for payments)
- **Cloudinary** account (for images)
- **Google Cloud** (optional, for Google login)

---

## How to Run the Project

### Step 1: Clone the repository

```bash
git clone https://github.com/satyamJha002/e-commerce-app.git
cd e-commerce-app
```

### Step 2: Install dependencies

From the project root (backend deps are in root `package.json`):

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

### Step 3: Environment variables

**Backend** – create a `.env` file in the **project root** (same folder as `package.json`):

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/your-db-name
# Or MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/dbname

# JWT & cookies
JWT_SECRET=your-super-secret-jwt-key
REFRESH_SCRET=your-refresh-token-secret
COOKIE_SECRET=your-cookie-secret

# Stripe (payments)
STRIPE_SECRET_KEY=sk_test_...

# Frontend URL (for Stripe redirects)
FRONTEND_URL=http://localhost:5173

# Cloudinary (images)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

**Frontend** – create `.env` in the **frontend** folder (optional; defaults may exist in code):

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Step 4: Start MongoDB

- **Local:** start MongoDB service so it’s listening (e.g. on `localhost:27017`).
- **Atlas:** ensure `MONGO_URI` in `.env` is correct and IP is allowed.

### Step 5: Run backend and frontend

**Option A – Run both from root (recommended):**

```bash
npm run dev
```

This runs the backend (nodemon) and frontend (Vite) together via `concurrently`.

**Option B – Run separately:**

Terminal 1 (backend):

```bash
npm run server
```

Terminal 2 (frontend):

```bash
npm run client
```

### Step 6: Open the app

- **Store (customer):** [http://localhost:5173](http://localhost:5173)
- **Admin panel:** [http://localhost:5173/admin-login](http://localhost:5173/admin-login)  
  Log in with an admin account; use **Settings** or **Logout** in the sidebar.

### Step 7: Create an admin user (if needed)

Admins are created via the **register** API with `role: "admin"` or `isAdmin: true` in the request body. You can:

- Use an existing auth/register endpoint (e.g. Postman) and send `role: "admin"`, or  
- Temporarily allow admin registration in your app and register once, then restrict again.

---

## Available Scripts (root)

| Command           | Description |
|-------------------|-------------|
| `npm start`       | Run backend only (production: `node backend/index.js`) |
| `npm run server` | Run backend with nodemon |
| `npm run client` | Run frontend (Vite) |
| `npm run dev`    | Run backend + frontend concurrently |

---

## API Overview

| Base path           | Purpose |
|---------------------|--------|
| `/api/auth`         | Register, login, Google, getMe, logout; admin: getAllUsers, getUserById |
| `/api/profile`     | Get/update profile, upload avatar |
| `/api/product`     | Products CRUD |
| `/api/category`    | Categories |
| `/api/subCategory` | Subcategories |
| `/api/orders`      | Create order, verify payment, my orders, by id; admin: all orders, mark delivered |
| `/api/dashboard`   | Admin dashboard stats |

---

## License

MIT · Author: Satyam Jha
