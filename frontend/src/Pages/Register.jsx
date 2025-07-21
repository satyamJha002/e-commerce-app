import React from "react";

const Register = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 animate-gradient">
            <section className="flex flex-1 justify-center items-center p-4 lg:p-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8 transform transition-all duration-500 hover:scale-105">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                        Create Your Account
                    </h1>
                    <form className="space-y-6" action="#">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Your Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="example123"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
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
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
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
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 transform hover:scale-105"
                        >
                            Sign Up
                        </button>
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
                        style={{ willChange: 'transform' }}
                    />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </section>
        </div>
    );
};

export default React.memo(Register);
