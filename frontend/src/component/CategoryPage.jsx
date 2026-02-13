import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductsByCategoryNameQuery } from "../slices/productApiSlice.js";
import { useGetSubCategoriesByCategoryNameQuery } from "../slices/subCategoryApiSlice.js";
import { addToCart } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Eye,
  Star,
  ArrowLeft,
  Filter,
  Loader2,
  ShoppingBag,
  Tag,
  ChevronRight,
} from "lucide-react";

const CategoryPage = ({
  categoryName,
  categoryTitle,
  categoryDescription,
  categoryImage,
  categoryIcon,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the new API that properly fetches products by category ObjectId
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsByCategoryNameQuery({ categoryName, limit: 50 });

  const { data: subCategoriesData, isLoading: isLoadingSubCategories } =
    useGetSubCategoriesByCategoryNameQuery(categoryName);

  const products = productsData?.products || [];
  const subCategories = subCategoriesData?.data || [];

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
          Loading {categoryTitle} products...
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

  // Check if category was not found in the database
  const categoryNotFound = productsData?.category === null;
  const availableCategories = productsData?.availableCategories || [];


  return (
    <div className="mt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={categoryImage}
          alt={categoryTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoryIcon}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {categoryTitle}
              </h1>
            </div>
            <p className="text-white/80 mt-2 max-w-xl">{categoryDescription}</p>
            <p className="text-white/60 mt-2">
              {products.length} products found
            </p>
          </div>
        </div>
      </div>

      {/* Category Not Found Warning */}
      {categoryNotFound && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Category Not Found
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-3">
              The category "{categoryName}" doesn't exist in the database yet.
              Please create it in the Admin Panel.
            </p>
            {availableCategories.length > 0 && (
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-2">
                  Available categories in database:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {availableCategories.length === 0 && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                No categories exist yet. Please create categories in the Admin Panel first.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Subcategories Section */}
      {subCategories.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Shop by Subcategory
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subCategories.map((subCategory) => (
              <Link
                key={subCategory._id}
                to={`/category/${categoryName}/${subCategory.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {subCategory.name}
                    </h3>
                    {subCategory.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {subCategory.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0 ml-2" />
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-500/20 transition-colors"></div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Loading subcategories indicator */}
      {isLoadingSubCategories && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading subcategories...</span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All {categoryTitle} Products
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {products.length} items
          </span>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No products found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Check back later for new arrivals in this category.
            </p>
            <Link to="/all-products">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full">
                Browse All Products
              </button>
            </Link>
          </div>
        ) : (
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
                    {product.brand || categoryTitle}
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
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
