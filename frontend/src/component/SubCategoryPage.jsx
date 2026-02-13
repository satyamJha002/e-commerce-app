import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductsBySubCategoryQuery } from "../slices/subCategoryApiSlice.js";
import { addToCart } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Eye,
  Star,
  ArrowLeft,
  Loader2,
  ShoppingBag,
  Home,
  ChevronRight,
  Package,
} from "lucide-react";

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryName, subCategoryName } = useParams();

  // Fetch products using the new API endpoint
  const {
    data: responseData,
    isLoading,
    error,
  } = useGetProductsBySubCategoryQuery({
    categoryName,
    subCategoryName,
    limit: 50,
  });

  const products = responseData?.products || [];
  const categoryData = responseData?.category;
  const subCategoryData = responseData?.subCategory;
  const pagination = responseData?.pagination;
  const availableSubCategories = responseData?.availableSubCategories || [];
  const subCategoryNotFound = subCategoryData === null && !isLoading;

  // Format names for display
  const formattedSubCategoryName =
    subCategoryData?.name ||
    subCategoryName
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formattedCategoryName =
    categoryData?.name ||
    categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);

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

  if (isLoading) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Loading {formattedSubCategoryName} products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Failed to load products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link
              to="/"
              className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/categories/${categoryName}`}
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {formattedCategoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-indigo-600 font-medium">
              {formattedSubCategoryName}
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {formattedCategoryName}
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {formattedSubCategoryName}
            </h1>
          </div>
          {subCategoryData?.description && (
            <p className="text-white/80 mt-2 max-w-2xl">
              {subCategoryData.description}
            </p>
          )}
          <p className="text-white/60 mt-3">
            {pagination?.totalProducts || products.length} products found in{" "}
            {formattedCategoryName}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No products found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              There are no products in this subcategory yet. Check back later!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={`/categories/${categoryName}`}>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                  Browse {formattedCategoryName}
                </button>
              </Link>
              <Link to="/all-products">
                <button className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold px-6 py-3 rounded-full border border-indigo-600 transition-colors">
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formattedSubCategoryName} Products
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {products.length} items
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
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
                    {/* Badges */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
                      {product.brand || formattedSubCategoryName}
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.rating || "4.5"}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({product.numReviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{product.price?.toLocaleString()}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice?.toLocaleString()}
                          </p>
                        )}
                      </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;
