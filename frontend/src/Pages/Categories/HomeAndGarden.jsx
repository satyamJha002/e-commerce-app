import React from "react";

const HomeAndGarden = () => {
  const homeItems = [
    {
      id: 1,
      title: "Sofa Set",
      description: "Comfortable and modern sofa set.",
      image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
      path: "/products/sofa",
    },
    {
      id: 2,
      title: "Dining Table",
      description: "Elegant wooden dining table.",
      image:
        "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg",
      path: "/products/dining-table",
    },
    {
      id: 3,
      title: "Indoor Plant",
      description: "Beautiful indoor plant for your home.",
      image:
        "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg",
      path: "/products/indoor-plant",
    },
    {
      id: 4,
      title: "Wall Art",
      description: "Modern abstract wall art piece.",
      image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      path: "/products/wall-art",
    },
  ];

  return (
    <div className="mt-24 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Home & Garden
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {homeItems.map((item) => (
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
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAndGarden;
