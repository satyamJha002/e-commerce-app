import React, {useState} from "react";
import {useRegisterMutation} from "../slices/authApiSlice.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCredentials} from "../slices/authSlice.js";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
    })

    const [register, {isLoading}] = useRegisterMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => (
            {...prev, [name]: value}
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData).unwrap();
            dispatch(setCredentials(res));
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            className="flex flex-col lg:flex-row min-h-screen dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 animate-gradient">
            <section className="flex flex-1 justify-center items-center p-4 lg:p-8">
                <div
                    className="w-full max-w-[630px] bg-white rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8 transform transition-all duration-500 hover:scale-105">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                        Create Your Account
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="John"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="Doe"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="example123"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="+1 (555) 123-4567"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>

                        {/* Sign in link */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>
            </section>
            <section className="flex-1 hidden lg:block relative overflow-hidden">
                <picture>
                    <source
                        srcSet="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
                        media="(max-width: 1200px)"
                        type="image/webp"
                    />
                    <source
                        srcSet="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        type="image/webp"
                    />
                    <img
                        src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Modern shopping illustration"
                        className="w-full h-screen object-cover object-center"
                        loading="lazy"
                        width="1200"
                        height="800"
                        style={{willChange: "transform"}}
                    />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </section>
        </div>
    );
};

export default React.memo(Register);
