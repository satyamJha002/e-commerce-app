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
  Mail,
  Quote,
  ArrowUpRight,
  Gift,
  Flame,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: productsData, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const categories = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg",
      title: "Electronics",
      path: "/categories/electronics",
      icon: "📱",
      count: "120+ Products",
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/32955012/pexels-photo-32955012.jpeg",
      title: "Fashion",
      path: "/categories/fashions",
      icon: "👗",
      count: "80+ Products",
      color: "from-pink-500/20 to-rose-500/20 text-pink-400",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/4050387/pexels-photo-4050387.jpeg",
      title: "Home & Kitchen",
      path: "/categories/home-and-appliances",
      icon: "🏠",
      count: "95+ Products",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg",
      title: "Sports",
      path: "/categories/sports",
      icon: "⚽",
      count: "60+ Products",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
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
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      toast.success("Thank you for subscribing to our newsletter!");
      setNewsletterEmail("");
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
      }),
    );
    toast.success("Added to cart!");
  };

  // Get featured products (first 8)
  const featuredProducts = productsData?.products?.slice(0, 8) || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Section with Carousel */}
      <div className="pt-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 bg-radial from-gray-900 via-slate-900 to-black text-white rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
          
          {/* Ambient Glow Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/35 rounded-full blur-3xl animate-pulse duration-[8000ms]"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/25 rounded-full blur-3xl animate-pulse duration-[10000ms] delay-1000"></div>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          </div>

          {/* Left Text Column */}
          <div className="z-10 max-w-xl space-y-6 lg:w-1/2">
            <div className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm animate-bounce duration-1000">
              <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
              <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">New Season Collection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">EliteMart</span>
            </h1>
            
            <h2 className="text-xl md:text-3xl font-bold text-gray-300 flex items-center gap-2">
              Up to <span className="text-pink-400 font-extrabold text-2xl md:text-4xl animate-pulse">70% Off</span> This Season!
            </h2>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
              Explore handpicked premium products at unbeatable prices. Elevate your daily lifestyle with our curated categories.
            </p>
            
            <div className="flex gap-4 flex-wrap pt-2">
              <Link to="/all-products">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3.5 px-8 rounded-full hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/all-products">
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                  Explore Categories
                </button>
              </Link>
            </div>
          </div>

          {/* Right Carousel Column */}
          <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center z-10">
            <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/15 p-2 bg-white/5 backdrop-blur-md shadow-2xl">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                {carouselImages.map((src, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      index === currentSlide
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-105 rotate-1"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                    <img
                      src={src}
                      alt={`EliteMart Collection ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}

                {/* Glassmorphic Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/35 hover:bg-indigo-600/90 text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/35 hover:bg-indigo-600/90 text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentSlide
                          ? "bg-indigo-400 w-6"
                          : "bg-white/40 hover:bg-white/70 w-2"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Search Bar Section */}
      <div className="my-10 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-50"></div>
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700/60 overflow-hidden">
            <Search className="absolute left-5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full py-4.5 pl-14 pr-32 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm md:text-base font-light"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-full text-sm shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders ₹500+", glow: "group-hover:text-blue-500" },
            { icon: Shield, title: "Secure Payment", desc: "100% Protected", glow: "group-hover:text-emerald-500" },
            { icon: Headphones, title: "24/7 Support", desc: "Dedicated help", glow: "group-hover:text-purple-500" },
            { icon: TrendingUp, title: "Best Prices", desc: "Guaranteed quality", glow: "group-hover:text-pink-500" },
          ].map((badge, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-5 bg-white dark:bg-gray-800/80 hover:bg-gray-100/50 dark:hover:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="p-3.5 bg-gray-50 dark:bg-gray-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <badge.icon className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-colors duration-300 ${badge.glow}`} />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm tracking-wide">
                  {badge.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" /> Curated Collections
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm md:text-base font-light">
            Discover catalog items tailored perfectly to your daily routine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.path} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
                <img
                  src={category.src}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Overlay Vignette with Brand Colors */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Category Card Label Details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl filter drop-shadow-sm">{category.icon}</span>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 font-light tracking-wide">{category.count}</p>
                    </div>
                    
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-xs text-white border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Animated Inner Border on Hover */}
                <div className="absolute inset-3 border border-white/0 group-hover:border-white/10 rounded-xl transition-all duration-500 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 dark:bg-pink-400/10 rounded-full text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 fill-pink-500/10" /> Hot Picks
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm text-sm font-light">
              Top quality and trending items selected especially for you.
            </p>
          </div>
          <Link to="/all-products">
            <button className="group flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-500 transition-colors text-sm cursor-pointer">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/80 overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4.5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Media Box */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Backdrop Blur Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <Link to={`/product/${product._id}`}>
                      <button
                        className="p-3 bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full transition-all duration-200 shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>

                  {/* Stock Alert Badge */}
                  {product.countInStock < 5 && product.countInStock > 0 && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm z-20">
                      Low Stock
                    </span>
                  )}
                  {product.countInStock === 0 && (
                    <span className="absolute top-3 left-3 bg-gray-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm z-20">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Meta Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                      {product.category?.name || "Product"}
                    </p>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.ratings || 4.5)
                                ? "fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">
                        {product.ratings || "4.5"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-base font-black text-indigo-600 dark:text-indigo-400">
                      ₹{product.price?.toLocaleString()}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <span className="text-xs font-bold text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-0.5">
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-16">
        <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden shadow-2xl border border-indigo-800/40">
          
          {/* Geometric Pattern Overlays */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-bl from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none"></div>

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-pink-300 border border-white/10 backdrop-blur-xs">
              Weekly Special
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              New Arrivals Every Single Week!
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
              Stay ahead of the curve. Discover design-focused tech accessories, stylish wardrobes, and home decors refreshed regularly.
            </p>
            <div className="pt-2">
              <Link to="/all-products">
                <button className="bg-white hover:bg-gray-100 text-indigo-900 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-white/15 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer">
                  Explore Catalogue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Reviews
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Loved By Thousands
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto text-sm md:text-base font-light">
            Here's what our community says about their shopping experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              role: "Verified Buyer",
              text: "EliteMart has the best selection and super fast shipping! Absolutely love the tech collection I ordered.",
              rating: 5,
              color: "from-blue-500 to-indigo-500",
            },
            {
              name: "Rahul Mehra",
              role: "Premium Member",
              text: "Amazing quality products and excellent customer service. The delivery was protected and secure.",
              rating: 5,
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Anita Kapoor",
              role: "Verified Buyer",
              text: "My go-to store for all my home and kitchen shopping needs. Great prices and completely genuine items.",
              rating: 5,
              color: "from-orange-500 to-pink-500",
            },
          ].map((testimonial, index) => {
            const initials = testimonial.name.split(" ").map(n => n[0]).join("");
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Quote Icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 dark:text-gray-700 group-hover:text-indigo-500/10 transition-colors pointer-events-none" />

                <div className="space-y-4 z-10">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic text-sm md:text-base leading-relaxed font-light">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50 dark:border-gray-700/60">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="max-w-7xl mx-auto my-20 px-4 md:px-8 lg:px-16">
        <div className="bg-gradient-to-r from-gray-100 to-indigo-50/40 dark:from-gray-800/50 dark:to-indigo-950/20 border border-gray-200/55 dark:border-gray-800 p-8 md:p-16 rounded-3xl text-center relative overflow-hidden">
          
          {/* Subtle details */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl"></div>

          <div className="relative z-10 max-w-lg mx-auto space-y-4">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Join Our Newsletter
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto">
              Get premium members-only deals, early collection drops, and fashion updates directly to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-full shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;

