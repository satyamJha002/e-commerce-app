import {Route, Routes, useLocation} from "react-router-dom";
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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const location = useLocation();

    const hideHeaderAndFooter = location.pathname === '/login' || location.pathname === '/register'
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
            {!hideHeaderAndFooter && <Header/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<CheckOut/>}/>
                    <Route path='/orders-summary' element={<Orders/>}/>
                    <Route path="/all-products" element={<Products/>}/>
                    <Route path='/product/view' element={<ProductView/>}/>
                </Route>

                {/* Categories Routes*/}
                <Route path="/categories/electronics" element={<Electronics/>}/>
                <Route path="/categories/fashions" element={<Fashions/>}/>
                <Route path="/categories/home-and-appliances" element={<HomeAndGarden/>}/>
                <Route path="/categories/sports" element={<Sports/>}/>

                {/* Products */}
                <Route path="/products/shoes" element={<Shoes/>}/>
                <Route path="/products/backpacks" element={<BackPacks/>}/>
                <Route path="/products/headphones" element={<HeadPhones/>}/>
                <Route path="/products/smartwatches" element={<SmartWatches/>}/>

            </Routes>
            {!hideHeaderAndFooter && <Footer/>}
        </>
    );
};

export default App;
