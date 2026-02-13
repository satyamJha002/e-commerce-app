import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../slices/productApiSlice.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Eye,
  Star,
  TrendingUp,
  Truck,
  Shield,
  Headphones,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: productsData, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg",
      title: "Electronics",
      path: "/categories/electronics",
      icon: "📱",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/32955012/pexels-photo-32955012.jpeg",
      title: "Fashion",
      path: "/categories/fashions",
      icon: "👗",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/4050387/pexels-photo-4050387.jpeg",
      title: "Home & Kitchen",
      path: "/categories/home-and-appliances",
      icon: "🏠",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg",
      title: "Sports",
      path: "/categories/sports",
      icon: "⚽",
    },
  ];

  const carouselImages = [
    "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg",
    "https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg",
    "https://images.pexels.com/photos/5554303/pexels-photo-5554303.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
        quantity: 1,
      })
    );
    toast.success("Added to cart!");
  };

  // Get featured products (first 8)
  const featuredProducts = productsData?.products?.slice(0, 8) || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Carousel */}
      <div className="pt-20 px-4 md:px-8 lg:px-16">
        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="z-10 max-w-lg space-y-6">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full w-fit">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New Season Collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Welcome to EliteShop
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Up to 70% Off This Season!
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Explore premium products at unbeatable prices. Shop now and
              elevate your style with EliteShop!
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/all-products">
                <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-indigo-100 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/categories/electronics">
                <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all duration-300">
                  Explore Categories
                </button>
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
            <div className="relative w-full h-64 md:h-96">
              {carouselImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`EliteShop products ${index + 1}`}
                  className={`w-full h-full object-cover rounded-xl shadow-lg absolute top-0 left-0 transition-all duration-500 ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  loading="lazy"
                />
              ))}
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-indigo-600 p-3 rounded-full hover:bg-white shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-indigo-600 p-3 rounded-full hover:bg-white shadow-lg transition-all"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="my-8 px-4 md:px-8 lg:px-16">
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full p-4 pl-12 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all"
              aria-label="Search products"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Trust Badges */}
      <div className="px-4 md:px-8 lg:px-16 my-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders ₹500+" },
            { icon: Shield, title: "Secure Payment", desc: "100% Protected" },
            { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
            { icon: TrendingUp, title: "Best Prices", desc: "Guaranteed" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <badge.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {badge.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="my-16 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse our curated collections
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.path}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src={category.src}
                  alt={category.title}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="my-16 px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Handpicked just for you
            </p>
          </div>
          <Link to="/all-products">
            <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="p-3 bg-white rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  {/* Badge */}
                  {product.countInStock < 5 && product.countInStock > 0 && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
                    {product.category?.name || "Product"}
                  </p>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.ratings || "4.5"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{product.price?.toLocaleString()}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                        View →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="my-16 px-4 md:px-8 lg:px-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              New Arrivals Every Week!
            </h2>
            <p className="text-lg opacity-90 mt-3 max-w-xl mx-auto">
              Be the first to discover the latest trends in fashion and tech.
            </p>
            <Link to="/all-products">
              <button className="mt-6 bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-indigo-50 transition-all transform hover:scale-105">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="my-16 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Trusted by thousands of happy customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya S.",
              text: "EliteShop has the best selection and super fast shipping! Absolutely love it.",
              rating: 5,
            },
            {
              name: "Rahul M.",
              text: "Amazing quality products and excellent customer service. Highly recommended!",
              rating: 5,
            },
            {
              name: "Anita K.",
              text: "My go-to store for all my shopping needs. Great prices and genuine products.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "{testimonial.text}"
              </p>
              <p className="mt-4 font-semibold text-indigo-600 dark:text-indigo-400">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="my-16 px-4 md:px-8 lg:px-16">
        <div className="bg-indigo-50 dark:bg-gray-800 p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Get exclusive deals, new arrivals & insider updates!
          </p>
          <form className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
