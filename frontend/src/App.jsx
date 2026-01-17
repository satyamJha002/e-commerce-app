import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Products from "./Pages/Products/Products.jsx";
import Electronics from "./Pages/Categories/Electronic.jsx";
import Fashions from "./Pages/Categories/Fashion.jsx";
import HomeAndGarden from "./Pages/Categories/HomeAndGarden.jsx";
import Sports from "./Pages/Categories/Sports.jsx";
import Shoes from "./Pages/Products/Shoes/Shoes.jsx";
import BackPacks from "./Pages/Products/BackPacks/BackPacks.jsx";
import HeadPhones from "./Pages/Products/HeadPhones/HeadPhones.jsx";
import SmartWatches from "./Pages/Products/SmartWatches/SmartWatches.jsx";
import ProductView from "./Pages/Products/ProductView.jsx";
import Orders from "./Pages/Orders.jsx";
import CheckOut from "./Pages/CheckOut.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import NotFound from "./component/NotFound.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import AdminProtectedRoute from "./component/AdminProtectedRoute.jsx";
import ProductManagement from "./Pages/Admin/ProductManagement.jsx";
import OrderManagement from "./Pages/Admin/OrderManagement.jsx";
import CustomerManagement from "./Pages/Admin/CustomerManagement.jsx";
import Setting from "./Pages/Admin/Setting.jsx";
import Categories from "./Pages/Admin/MasterData/Catgories/Categories.jsx";
import SubCategories from "./Pages/Admin/MasterData/SubCategories/SubCategories.jsx";

const App = () => {
  const location = useLocation();

  const hideHeaderAndFooter =
    location.pathname === "/login" || location.pathname === "/register";

  const hideHeaderAndFooterAdmin = location.pathname.includes("/admin");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!hideHeaderAndFooter && !hideHeaderAndFooterAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders-summary" element={<Orders />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/product/:id" element={<ProductView />} />
        </Route>

        {/* Categories Routes*/}
        <Route path="/categories/electronics" element={<Electronics />} />
        <Route path="/categories/fashions" element={<Fashions />} />
        <Route
          path="/categories/home-and-appliances"
          element={<HomeAndGarden />}
        />
        <Route path="/categories/sports" element={<Sports />} />

        {/* Products */}
        <Route path="/products/shoes" element={<Shoes />} />
        <Route path="/products/backpacks" element={<BackPacks />} />
        <Route path="/products/headphones" element={<HeadPhones />} />
        <Route path="/products/smartwatches" element={<SmartWatches />} />

        {/* Admin Dashboard */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin-product-management"
            element={<ProductManagement />}
          />
          <Route path="/admin-order-management" element={<OrderManagement />} />
          <Route
            path="/admin-customer-management"
            element={<CustomerManagement />}
          />
          <Route path="/admin-categories" element={<Categories />} />
          <Route path="/admin-sub-categories" element={<SubCategories />} />
          <Route path="/admin-setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideHeaderAndFooter && !hideHeaderAndFooterAdmin && <Footer />}
    </>
  );
};

export default App;
