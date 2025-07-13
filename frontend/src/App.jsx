import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Products from "./Pages/Products/Products.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
          <Route path="/all-products" element={<Products />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
