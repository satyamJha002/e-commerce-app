import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from "../../slices/productApiSlice.js";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice.js';
import { toast } from 'react-toastify';

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images?.[0] || "/placeholder.svg",
        quantity: quantity,
      })
    )
    navigate("/cart");
    toast.success("Product added to cart");
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn't find this product. It may have been removed or the link
            is incorrect.
          </p>
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const product = data?.product;

  if (!product) {
    return null;
  }

  const images = product.images || [];
  const selectedImage = images[selectedImageIndex] || "/placeholder.svg";

  // Star rating component
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : index < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-full ${
                    product.badge === "Best Seller"
                      ? "bg-orange-500 text-white"
                      : product.badge === "New"
                      ? "bg-green-500 text-white"
                      : product.badge === "Sale"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <button className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110">
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-600 ring-2 ring-blue-600/20"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating || 0)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                ₹{product.price?.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  {product.discount && (
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.countInStock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    In Stock ({product.countInStock} available)
                  </span>
                </>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Key Features */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.keyFeatures.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.countInStock, quantity + 1))
                  }
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                disabled={product.countInStock === 0}
                className="flex-1 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white disabled:bg-gray-400 text-white dark:text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Free Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.description && product.description.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Product Description
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <ul className="space-y-3">
                {product.description.map((desc, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Category Info */}
        {product.category && (
          <div className="mt-8">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Category:{" "}
              <Link
                to={`/products/category/${
                  product.category._id || product.category
                }`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {product.category.categoryName || "View Category"}
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
