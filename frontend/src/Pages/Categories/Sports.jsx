import React from "react";

const Sports = () => {
  const sportsItems = [
    {
      id: 1,
      title: "Football",
      description: "High-quality leather football.",
      image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg",
      path: "/products/football",
    },
    {
      id: 2,
      title: "Cricket Bat",
      description: "Professional grade cricket bat.",
      image:
        "https://images.pexels.com/photos/159494/cricket-sport-bat-ball-159494.jpeg",
      path: "/products/cricket-bat",
    },
    {
      id: 3,
      title: "Tennis Racket",
      description: "Lightweight carbon-fiber tennis racket.",
      image: "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg",
      path: "/products/tennis-racket",
    },
    {
      id: 4,
      title: "Yoga Mat",
      description: "Eco-friendly non-slip yoga mat.",
      image:
        "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      path: "/products/yoga-mat",
    },
  ];

  return (
    <div className="mt-24 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Sports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sportsItems.map((item) => (
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
              <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
