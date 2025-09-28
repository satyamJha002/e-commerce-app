import React from "react";

const Fashions = () => {
  const fashionItems = [
    {
      id: 1,
      title: "Men’s Jacket",
      description: "Stylish leather jacket for men.",
      image: "https://images.pexels.com/photos/170807/pexels-photo-170807.jpeg",
      path: "/products/mens-jacket",
    },
    {
      id: 2,
      title: "Women’s Dress",
      description: "Elegant evening dress for women.",
      image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      path: "/products/womens-dress",
    },
    {
      id: 3,
      title: "Sneakers",
      description: "Trendy sneakers for all-day comfort.",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      path: "/products/sneakers",
    },
    {
      id: 4,
      title: "Handbag",
      description: "Premium leather handbag for women.",
      image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
      path: "/products/handbag",
    },
  ];

  return (
    <div className="mt-24 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Fashion
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {fashionItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fashions;
