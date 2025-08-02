import React from 'react'
import StarRating from "./StarRating.jsx";
import {Heart, ShoppingCart, Eye} from "lucide-react"


const ProductCard = ({product}) => {
    return (
        <div
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-3 left-3 z-10">
          <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                </div>
            )}

            {/* Wishlist Button */}
            <button
                className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-110">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"/>
            </button>

            {/* Product Image */}
            <div
                className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                {/* Quick Actions */}
                <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button
                        className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110">
                        <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300"/>
                    </button>
                    <button
                        className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110">
                        <ShoppingCart className="w-4 h-4 text-gray-700 dark:text-gray-300"/>
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                {/* Brand */}
                <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {product.brand}
          </span>
                    {product.discount && (
                        <span
                            className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
                    )}
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="mb-3">
                    <StarRating rating={product.rating} reviewCount={product.reviewCount}/>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ₹{product.price.toLocaleString()}
            </span>
                        {product.originalPrice && (
                            <span
                                className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {product.keyFeatures?.slice(0, 2).map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                            >
                {feature}
              </span>
                        ))}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
