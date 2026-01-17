import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import { useGetProductsByCategoryQuery } from "../../slices/productApiSlice.js";

const Products = () => {
  const { data, isLoading, error } = useGetProductsByCategoryQuery(4);

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="w-full h-56 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
        </div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-16 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Featured Products
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products with
              exceptional quality and customer satisfaction
            </p>
          </div>
          {/* Loading skeletons */}
          <div className="mb-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn't load the products. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = data?.categories || [];

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-16 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Featured Products
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products with
              exceptional quality and customer satisfaction
            </p>
          </div>
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No Products Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for amazing products!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-16 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Featured Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with
            exceptional quality and customer satisfaction
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.categoryId} className="mb-16">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {category.categoryName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium {category.categoryName.toLowerCase()} for every
                  lifestyle
                </p>
              </div>
              <Link to={`/products/category/${category.categoryId}`}>
                <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All {category.categoryName}
                </button>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  category={category.categoryName.toLowerCase()}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Products);
