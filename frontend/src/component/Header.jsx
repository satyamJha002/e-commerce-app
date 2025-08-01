import {FaShoppingCart, FaUser, FaBars, FaTimes} from "react-icons/fa";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../slices/authApiSlice.js";
import {useNavigate} from "react-router-dom";
import {logout as logoutAction} from "../slices/authSlice.js";
import {toast} from "react-toastify";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {userInfo} = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            // Clear local state immediately for better UX
            dispatch(logoutAction());

            // Make API call to logout
            await logoutApiCall().unwrap();

            // Close mobile menu if open
            setIsMenuOpen(false);

            // Show success message
            toast.success('Logged out successfully');

            // Navigate to home
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error(error?.data?.message || error.error || 'Logout failed');
        }
    };


    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm flex justify-between items-center px-4 sm:px-8 py-4">
            {/* Logo */}
            <a className="btn btn-ghost text-xl flex items-center gap-2" href="/">
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-current"
                >
                    <path
                        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
                EliteMart
            </a>

            {/* Hamburger Button for Mobile */}
            <button
                className="md:hidden focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
            </button>

            {/* Sidebar for Mobile, Navbar for Desktop */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } md:static md:translate-x-0 md:w-auto md:h-auto md:bg-transparent md:shadow-none md:flex md:items-center md:gap-4`}
            >
                {/* Close Button in Sidebar (Mobile Only) */}
                <button
                    className="md:hidden flex justify-end p-4"
                    onClick={toggleMenu}
                    aria-label="Close Menu"
                >
                    <FaTimes size={20}/>
                </button>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-0">
                    {/* Cart */}
                    <a
                        href="/cart"
                        className="btn btn-ghost flex items-center gap-2 w-full md:w-auto justify-start md:justify-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaShoppingCart/>
                        Cart
                    </a>

                    {/* Orders - Only show if logged in */}
                    {userInfo && (
                        <a
                            href="/orders-summary"
                            className="btn btn-ghost flex items-center gap-2 w-full md:w-auto justify-start md:justify-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Orders
                        </a>
                    )}

                    {/* Account Dropdown */}
                    <details className="dropdown dropdown-hover w-full md:w-auto">
                        <summary
                            className="btn btn-ghost flex items-center gap-2 w-full md:w-auto justify-start md:justify-center">
                            <FaUser/>
                            {userInfo ? (
                                `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() ||
                                userInfo.username
                            ) : "Account"}
                        </summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-full md:w-40 p-2 shadow-lg md:absolute right-0">
                            {userInfo ? (
                                <>
                                    <li>
                                        <a href="/profile" onClick={() => setIsMenuOpen(false)}>
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className='text-red-500'>
                                            Logout
                                        </button>
                                    </li>
                                    {userInfo.isAdmin && (
                                        <li>
                                            <a href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                                                Admin
                                            </a>
                                        </li>
                                    )}
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a href="/login" onClick={() => setIsMenuOpen(false)}>
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/register" onClick={() => setIsMenuOpen(false)}>
                                            Register
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </details>
                </div>
            </div>

            {/* Overlay for Mobile Sidebar */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#000000ad] bg-opacity-50 z-40 md:hidden"
                    onClick={toggleMenu}
                    aria-hidden="true"
                ></div>
            )}
        </nav>
    );
};

export default Header;
