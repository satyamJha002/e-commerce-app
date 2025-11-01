import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import { useGetAllProductsQuery } from "../../slices/productApiSlice.js";

const Products = () => {
  // const { data: productsData, isLoading, error } = useGetAllProductsQuery();
  const shoes = [
    {
      id: 1,
      name: "Ultraboost 22",
      brand: "Adidas",
      price: 15999,
      originalPrice: 18999,
      discount: 16,
      rating: 4.5,
      reviewCount: 1247,
      badge: "Best Seller",
      imageUrl:
        "https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/456b93731cdb44e68452ae92012fe986_9366/GX9158_09_standard.jpg",
      keyFeatures: [
        "Boost Technology",
        "Primeknit Upper",
        "Continental Rubber",
      ],
      description: [
        "Boost midsole for high energy return",
        "Primeknit+ upper for adaptive support",
        "Continental™ Rubber outsole for grip",
        "Made with recycled materials",
      ],
    },
    {
      id: 2,
      name: "Suede Classic XXI",
      brand: "Puma",
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      rating: 4.2,
      reviewCount: 856,
      badge: "Sale",
      imageUrl:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Men's-Sneakers",
      keyFeatures: ["Suede Upper", "Padded Collar", "Rubber Outsole"],
      description: [
        "Timeless suede construction",
        "Padded collar for comfort",
        "Durable rubber outsole",
        "Low-top silhouette for casual wear",
      ],
    },
    {
      id: 3,
      name: "Chuck Taylor All Star",
      brand: "Converse",
      price: 4599,
      rating: 4.0,
      reviewCount: 2103,
      badge: "Classic",
      imageUrl:
        "https://imgs.search.brave.com/iHT15iJzLw_OUZFB8b-dIchalSHukqXWuxYVAbCuS0U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtb3VzZm9vdHdl/YXIuY29tL2Jsb2Iv/cHJvZHVjdC1pbWFn/ZXMvMjAwMDAvMzgv/MDAvOS8zODAwOV9w/YWlyX21lZGl1bS5q/cGc",
      keyFeatures: ["Canvas Upper", "OrthoLite Insole", "Rubber Toe Cap"],
      description: [
        "Iconic canvas upper",
        "OrthoLite insole for cushioning",
        "Classic rubber toe cap",
        "Vintage-inspired design",
      ],
    },
    {
      id: 4,
      name: "Gel-Kayano 29",
      brand: "ASICS",
      price: 13499,
      rating: 4.7,
      reviewCount: 634,
      badge: "New",
      imageUrl: "https://m.media-amazon.com/images/I/61VT+zjycYL.jpg",
      keyFeatures: ["GEL Technology", "FF BLAST Cushioning", "Engineered Knit"],
      description: [
        "Engineered knit upper for breathability",
        "FF BLAST™ cushioning for softness",
        "Rearfoot GEL™ technology for shock absorption",
        "Ideal for long-distance running",
      ],
    },
  ];

  const watches = [
    {
      id: 1,
      name: "Apple Watch Series 9",
      brand: "Apple",
      price: 41999,
      originalPrice: 45999,
      discount: 9,
      rating: 4.8,
      reviewCount: 3421,
      badge: "Best Seller",
      imageUrl:
        "https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-Palette-watch-face-230912_inline.jpg.large.jpg",
      keyFeatures: ["Always-On Display", "Health Tracking", "Water Resistant"],
      description: [
        "Always-On Retina display",
        "Blood Oxygen and ECG apps",
        "Advanced health metrics",
        "Water resistant up to 50m",
      ],
    },
    {
      id: 2,
      name: "Galaxy Watch6",
      brand: "Samsung",
      price: 31999,
      rating: 4.4,
      reviewCount: 1876,
      imageUrl:
        "https://i5.walmartimages.com/seo/Samsung-Galaxy-Watch6-Classic-43mm-Smart-Watch-Bluetooth-Black_5fe07063-bb19-4ba8-a29e-d24b876b84ba.49bf8f35bffe30eafa0011cc5ffcdba7.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      keyFeatures: ["AMOLED Display", "Sleep Tracking", "Sapphire Glass"],
      description: [
        "Super AMOLED display",
        "Sleep and body composition tracking",
        "Sapphire Crystal Glass",
        "Fitness and GPS tracking built-in",
      ],
    },
    {
      id: 3,
      name: "Fossil Gen 6",
      brand: "Fossil",
      price: 22999,
      rating: 4.1,
      reviewCount: 945,
      imageUrl:
        "https://fossil.scene7.com/is/image/FossilPartners/FTW4061_main?$sfcc_fos_large$",
      keyFeatures: ["Wear OS", "Fast Charging", "Stainless Steel"],
      description: [
        "Wear OS by Google",
        "SpO2, heart rate, and GPS tracking",
        "Fast charging support",
        "Stylish stainless steel body",
      ],
    },
    {
      id: 4,
      name: "CMF Watch Pro 2",
      brand: "Nothing",
      price: 3920,
      rating: 4.3,
      reviewCount: 567,
      badge: "New",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0579/8091/1768/files/CMF-Watch-Pro-2_Orange_1.png?v=1720092965",
      keyFeatures: ["Wear OS", "GPS Tracking", "Fast Charging"],
      description: [
        "Wear OS by Google",
        "SpO2, heart rate, and GPS tracking",
        "Fast charging support",
        "Stylish stainless steel body",
      ],
    },
  ];

  const backpacks = [
    {
      id: 1,
      name: "Classic Backpack",
      brand: "Wildcraft",
      price: 1999,
      rating: 4.0,
      reviewCount: 432,
      imageUrl:
        "https://herschel.com/content/dam/herschel/products/11546/11546-00001-OS_03.jpg.sthumbnails.2000.2500.webp",
      keyFeatures: ["Water Resistant", "3 Compartments", "Ergonomic"],
      description: [
        "Water-resistant material",
        "3 spacious compartments",
        "Ergonomic padded straps",
        "Durable and lightweight",
      ],
    },
    {
      id: 2,
      name: "Everyday Backpack 2.0",
      brand: "Peak Design",
      price: 18999,
      rating: 4.6,
      reviewCount: 789,
      badge: "Premium",
      imageUrl:
        "https://imgs.search.brave.com/wfZGlXZ2XtfQ7Fqp0Cxpa7dif5rAWSl_C6Cemp0iTaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2FycnlvbG9neS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDEvUGVhay1E/ZXNpZ24tRXZlcnlk/YXktVjItVlMtWmlw/LWZyb250LXByb2Zp/bGUtNjYweDQwMC5q/cGc",
      keyFeatures: ["Expandable 20-30L", "Weatherproof", "MagLatch Hardware"],
      description: [
        "Expandable capacity (20–30L)",
        "Weatherproof 400D nylon canvas",
        "MagLatch™ hardware for secure top closure",
        "Laptop & tablet sleeves inside",
      ],
    },
    {
      id: 3,
      name: "Puma Academy Backpack",
      brand: "Puma",
      price: 1499,
      rating: 3.8,
      reviewCount: 234,
      imageUrl:
        "https://http2.mlstatic.com/D_Q_NP_2X_650975-MLU73329100692_122023-E.webp",
      keyFeatures: ["Padded Straps", "Side Pockets", "Front Zip"],
      description: [
        "Padded back and shoulder straps",
        "Dual side slip-in pockets",
        "Front zip pocket for easy access",
        "Stylish, minimal design",
      ],
    },
    {
      id: 4,
      name: "Kaslo Camera Bag Tech - 30L",
      brand: "Herschel",
      price: 18000,
      rating: 4.4,
      reviewCount: 156,
      imageUrl:
        "https://herschel.com/content/dam/herschel/products/11590/11590-00001-OS_01.jpg.sthumbnails.2000.2500.webp",
      keyFeatures: ["100% Recycled", "Laptop Sleeve", "Fleece Lined"],
      description: [
        "100% recycled 600D polyester, excluding trims",
        "Tonal stripe liner made from 100% recycled polyester",
        'Padded and fleece lined 15"/16" laptop sleeve with buckle',
        "Zippered closures",
      ],
    },
  ];

  const headphones = [
    {
      id: 1,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 29999,
      originalPrice: 34999,
      discount: 14,
      rating: 4.7,
      reviewCount: 2341,
      badge: "Best Seller",
      imageUrl:
        "https://www.theaudiostore.in/cdn/shop/products/sony-wh-1000xm5-active-noise-canceling-wireless-headphones-black-39213799702783_1024x.jpg?v=1744392258",
      keyFeatures: [
        "Active Noise Cancellation",
        "30hr Battery",
        "Touch Controls",
      ],
      description: [
        "Industry-leading active noise cancellation",
        "Up to 30 hours battery life",
        "Touch sensor controls",
        "Premium lightweight design with foldable structure",
      ],
    },
    {
      id: 2,
      name: "Bose QuietComfort 45",
      brand: "Bose",
      price: 32999,
      rating: 4.6,
      reviewCount: 1876,
      imageUrl:
        "https://lablaab.com/wp-content/uploads/2023/12/51mb-i8N5tL._AC_SL1500_.jpg",
      keyFeatures: ["Noise Cancellation", "24hr Battery", "Adjustable EQ"],
      description: [
        "High-fidelity audio with adjustable EQ",
        "World-class noise cancellation",
        "Up to 24 hours battery life",
        "Comfortable, lightweight fit",
      ],
    },
    {
      id: 3,
      name: "AirPods Max",
      brand: "Apple",
      price: 59999,
      rating: 4.5,
      reviewCount: 1234,
      badge: "Premium",
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1604021221000",
      keyFeatures: ["Dynamic Driver", "Spatial Audio", "Memory Foam"],
      description: [
        "Apple-designed dynamic driver",
        "Active Noise Cancellation with Transparency Mode",
        "Spatial audio with dynamic head tracking",
        "Memory foam ear cushions for all-day comfort",
      ],
    },
    {
      id: 4,
      name: "JBL Live 660NC",
      brand: "JBL",
      price: 10999,
      rating: 4.2,
      reviewCount: 987,
      imageUrl:
        "https://www.designinfo.in/wp-content/uploads/2023/10/JBL-Live-660NC-Blue-1-485x485-optimized.webp",
      keyFeatures: [
        "Adaptive Noise Cancelling",
        "50hr Battery",
        "Voice Assistant",
      ],
      description: [
        "Adaptive noise cancelling",
        "JBL Signature Sound with 40mm drivers",
        "50-hour battery life with quick charge",
        "Voice assistant support (Alexa, Google Assistant)",
      ],
    },
  ];

  const categories = [
    { name: "Shoes", data: shoes, link: "/products/shoes" },
    { name: "SmartWatches", data: watches, link: "/products/smartwatches" },
    { name: "Backpacks", data: backpacks, link: "/products/backpacks" },
    { name: "Headphones", data: headphones, link: "/products/headphones" },
  ];

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
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium {category.name.toLowerCase()} for every lifestyle
                </p>
              </div>
              <Link to={category.link}>
                <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All {category.name}
                </button>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.data.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category.name.toLowerCase()}
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
