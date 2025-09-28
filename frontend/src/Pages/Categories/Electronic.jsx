import React from "react";

const Electronics = () => {
  const electronicsItems = [
    {
      id: 1,
      title: "Smartphone",
      description: "Latest 5G smartphone with high-resolution camera.",
      image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
      path: "/products/smartphones",
    },
    {
      id: 2,
      title: "Laptop",
      description: "Powerful laptop for work and gaming.",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      path: "/products/laptops",
    },
    {
      id: 3,
      title: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      image:
        "https://images.pexels.com/photos/3394655/pexels-photo-3394655.jpeg",
      path: "/products/headphones",
    },
    {
      id: 4,
      title: "Smartwatch",
      description: "Track fitness and stay connected on the go.",
      image: "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg",
      path: "/products/smartwatches",
    },
  ];

  return (
    <div className="mt-24 px-6 md:px-12 lg:px-20">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Electronics
      </h1>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {electronicsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
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
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
