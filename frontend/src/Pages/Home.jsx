import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../component/Header.jsx";
import AboutUs from "./AboutUs.jsx";

const Home = () => {
    const categories = [
        {
            id: 1,
            src: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
            title: 'Electronics',
            path: '/categories/electronics'
        },
        {
            id: 2,
            src: 'https://images.pexels.com/photos/32955012/pexels-photo-32955012.jpeg',
            title: 'Fashion',
            path: '/categories/fashions'
        },
        {
            id: 3,
            src: 'https://images.pexels.com/photos/4050387/pexels-photo-4050387.jpeg',
            title: 'Home & Garden',
            path: '/categories/home-and-appliances'
        },
        {
            id: 4,
            src: 'https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg',
            title: 'Sports',
            path: '/categories/sports'
        },
    ];

    const products = [
        {
            id: 1,
            cardTitle: 'Shoes',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
            cardDescription: 'A stylish pair of sneakers perfect for daily wear.',
            path: "/products/shoes"
        },
        {
            id: 2,
            cardTitle: 'Smartwatch',
            cardImage: 'https://images.pexels.com/photos/110471/pexels-photo-110471.jpeg',
            cardDescription: 'Track your fitness and stay connected with this elegant smartwatch.',
            path: "/products/smartwatches"
        },
        {
            id: 3,
            cardTitle: 'Backpack',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
            cardDescription: 'Spacious and durable backpack for school or travel.',
            path: "/products/backpacks"
        },
        {
            id: 4,
            cardTitle: 'Headphones',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
            cardDescription: 'Enjoy immersive sound quality with noise-cancelling headphones.',
            path: "/products/headphones"
        },
    ];

    const carouselImages = [
        'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg',
        'https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg',
        'https://images.pexels.com/photos/5554303/pexels-photo-5554303.jpeg',
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [carouselImages.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div>
            <Navbar/>
            <div className="pt-20 px-4 md:px-8 lg:px-16 container mx-auto">
                {/* Hero Section with Carousel */}
                <div
                    className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="z-10 max-w-lg space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Welcome to EliteShop</h1>
                        <h2 className="text-2xl md:text-3xl font-semibold">Up to 70% Off This Season!</h2>
                        <p className="text-lg md:text-xl opacity-90">
                            Explore premium products at unbeatable prices. Shop now and elevate your style with
                            EliteShop!
                        </p>
                        <Link to="/all-products">
                            <button
                                className="mt-4 bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-indigo-100 hover:scale-105 transition-transform duration-300">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                    <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
                        <div className="relative w-full h-64 md:h-96">
                            {carouselImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`EliteShop products ${index + 1}`}
                                    className={`w-full h-full object-cover rounded-lg shadow-lg absolute top-0 left-0 transition-opacity duration-500 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    loading="lazy"
                                />
                            ))}
                            <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-100 focus:outline-none"
                                aria-label="Previous slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 p-2 rounded-full hover:bg-indigo-100 focus:outline-none"
                                aria-label="Next slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                            {/* Carousel Dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {carouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full ${
                                            index === currentSlide ? 'bg-white' : 'bg-gray-400'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="my-8 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Search products"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="my-16 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Shop by Category</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map(category => (
                            <Link key={category.id} to={category.path}>
                                <div
                                    className="group flex flex-col items-center text-center space-y-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                    <picture>
                                        <source srcSet={`${category.src}?format=webp`} type="image/webp"/>
                                        <img
                                            src={category.src}
                                            alt={category.title}
                                            className="w-full h-40 object-cover rounded-md group-hover:scale-102 transition-transform duration-200"
                                            loading="lazy"
                                            width="300"
                                            height="160"
                                            style={{willChange: 'transform'}}
                                        />
                                    </picture>
                                    <h3 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">{category.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Promotional Banner */}
                <div className="my-16 bg-indigo-100 rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">New Arrivals!</h2>
                    <p className="text-lg text-gray-600 mt-2">Discover the latest trends in fashion and tech.</p>
                    <Link to="/new-arrivals">
                        <button
                            className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700">Explore
                            Now
                        </button>
                    </Link>
                </div>

                {/* About Us Section */}
                <div className="my-16 px-4">
                    <AboutUs/>
                </div>

                {/* Featured Products Section */}
                <div className="my-16 px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold ">Featured Products</h1>
                        <Link to="/all-products">
                            <button
                                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300">
                                View All
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link key={product.id} to={product.path}>
                                <div
                                    className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <figure>
                                        <img
                                            src={product.cardImage}
                                            alt={product.cardTitle}
                                            className="h-48 w-full object-cover transform hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </figure>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-gray-800">{product.cardTitle}</h2>
                                        <p className="text-gray-600 mt-2">{product.cardDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="my-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600">"EliteShop has the best selection and fast shipping!"</p>
                            <p className="mt-4 font-semibold text-indigo-600">- Jane D.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600">"Amazing quality and customer service!"</p>
                            <p className="mt-4 font-semibold text-indigo-600">- Mark S.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600">"My go-to store for all my needs!"</p>
                            <p className="mt-4 font-semibold text-indigo-600">- Sarah L.</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="my-16 bg-indigo-50 p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Join Our Newsletter</h2>
                    <p className="text-gray-600 mt-2">Get exclusive deals and updates!</p>
                    <form className="mt-4 flex justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded-l-full border text-gray-800 border-gray-300 focus:outline-none"
                            aria-label="Email for newsletter"
                        />
                        <button
                            className="bg-indigo-600 text-white py-3 px-6 rounded-r-full hover:bg-indigo-700">Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
