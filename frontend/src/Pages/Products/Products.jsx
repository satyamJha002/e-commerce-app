import React from 'react';
import { Link } from "react-router-dom";

const Products = () => {
    const shoes = [
        {
            id: 1,
            name: 'Ultraboost 22',
            brand: 'Adidas',
            price: 15999,
            imageUrl: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/456b93731cdb44e68452ae92012fe986_9366/GX9158_09_standard.jpg',
            description: [
                'Boost midsole for high energy return',
                'Primeknit+ upper for adaptive support',
                'Continental™ Rubber outsole for grip',
                'Made with recycled materials'
            ]
        },
        {
            id: 2,
            name: 'Suede Classic XXI',
            brand: 'Puma',
            price: 6999,
            imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Men\'s-Sneakers',
            description: [
                'Timeless suede construction',
                'Padded collar for comfort',
                'Durable rubber outsole',
                'Low-top silhouette for casual wear'
            ]
        },
        {
            id: 3,
            name: 'Chuck Taylor All Star',
            brand: 'Converse',
            price: 4599,
            imageUrl: 'https://imgs.search.brave.com/iHT15iJzLw_OUZFB8b-dIchalSHukqXWuxYVAbCuS0U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtb3VzZm9vdHdl/YXIuY29tL2Jsb2Iv/cHJvZHVjdC1pbWFn/ZXMvMjAwMDAvMzgv/MDAvOS8zODAwOV9w/YWlyX21lZGl1bS5q/cGc',
            description: [
                'Iconic canvas upper',
                'OrthoLite insole for cushioning',
                'Classic rubber toe cap',
                'Vintage-inspired design'
            ]
        },
        {
            id: 4,
            name: 'Gel-Kayano 29',
            brand: 'ASICS',
            price: 13499,
            imageUrl: 'https://m.media-amazon.com/images/I/61VT+zjycYL.jpg',
            description: [
                'Engineered knit upper for breathability',
                'FF BLAST™ cushioning for softness',
                'Rearfoot GEL™ technology for shock absorption',
                'Ideal for long-distance running'
            ]
        }
    ];

    const watches = [
        {
            id: 1,
            name: 'Apple Watch Series 9',
            brand: 'Apple',
            price: 41999,
            imageUrl: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-Palette-watch-face-230912_inline.jpg.large.jpg',
            description: [
                'Always-On Retina display',
                'Blood Oxygen and ECG apps',
                'Advanced health metrics',
                'Water resistant up to 50m'
            ]
        },
        {
            id: 2,
            name: 'Galaxy Watch6',
            brand: 'Samsung',
            price: 31999,
            imageUrl: 'https://i5.walmartimages.com/seo/Samsung-Galaxy-Watch6-Classic-43mm-Smart-Watch-Bluetooth-Black_5fe07063-bb19-4ba8-a29e-d24b876b84ba.49bf8f35bffe30eafa0011cc5ffcdba7.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
            description: [
                'Super AMOLED display',
                'Sleep and body composition tracking',
                'Sapphire Crystal Glass',
                'Fitness and GPS tracking built-in'
            ]
        },
        {
            id: 3,
            name: 'Fossil Gen 6',
            brand: 'Fossil',
            price: 22999,
            imageUrl: 'https://fossil.scene7.com/is/image/FossilPartners/FTW4061_main?$sfcc_fos_large$',
            description: [
                'Wear OS by Google',
                'SpO2, heart rate, and GPS tracking',
                'Fast charging support',
                'Stylish stainless steel body'
            ]
        },
        {
            id: 4,
            name: 'CMF Watch Pro 2',
            brand: 'Nothing',
            price: 3920,
            imageUrl: 'https://cdn.shopify.com/s/files/1/0579/8091/1768/files/CMF-Watch-Pro-2_Orange_1.png?v=1720092965',
            description: [
                'Wear OS by Google',
                'SpO2, heart rate, and GPS tracking',
                'Fast charging support',
                'Stylish stainless steel body'
            ]
        }
    ];

    const backpacks = [
        {
            id: 1,
            name: 'Classic Backpack',
            brand: 'Wildcraft',
            price: 1999,
            imageUrl: 'https://herschel.com/content/dam/herschel/products/11546/11546-00001-OS_03.jpg.sthumbnails.2000.2500.webp',
            description: [
                'Water-resistant material',
                '3 spacious compartments',
                'Ergonomic padded straps',
                'Durable and lightweight'
            ]
        },
        {
            id: 2,
            name: 'Everyday Backpack 2.0',
            brand: 'Peak Design',
            price: 18999,
            imageUrl: 'https://imgs.search.brave.com/wfZGlXZ2XtfQ7Fqp0Cxpa7dif5rAWSl_C6Cemp0iTaI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Y2FycnlvbG9neS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDEvUGVhay1E/ZXNpZ24tRXZlcnlk/YXktVjItVlMtWmlw/LWZyb250LXByb2Zp/bGUtNjYweDQwMC5q/cGc',
            description: [
                'Expandable capacity (20–30L)',
                'Weatherproof 400D nylon canvas',
                'MagLatch™ hardware for secure top closure',
                'Laptop & tablet sleeves inside'
            ]
        },
        {
            id: 3,
            name: 'Puma Academy Backpack',
            brand: 'Puma',
            price: 1499,
            imageUrl: 'https://http2.mlstatic.com/D_Q_NP_2X_650975-MLU73329100692_122023-E.webp',
            description: [
                'Padded back and shoulder straps',
                'Dual side slip-in pockets',
                'Front zip pocket for easy access',
                'Stylish, minimal design'
            ]
        },
        {
            id: 4,
            name: 'Kaslo Camera Bag Tech - 30L',
            brand: 'Herschel',
            price: 18000,
            imageUrl: 'https://herschel.com/content/dam/herschel/products/11590/11590-00001-OS_01.jpg.sthumbnails.2000.2500.webp',
            description: [
                '100% recycled 600D polyester, excluding trims',
                'Tonal stripe liner made from 100% recycled polyester',
                'Padded and fleece lined 15"/16" laptop sleeve with buckle',
                'Zippered closures'
            ]
        }
    ];

    const headphones = [
        {
            id: 1,
            name: 'Sony WH-1000XM5',
            brand: 'Sony',
            price: 29999,
            imageUrl: 'https://www.theaudiostore.in/cdn/shop/products/sony-wh-1000xm5-active-noise-canceling-wireless-headphones-black-39213799702783_1024x.jpg?v=1744392258',
            description: [
                'Industry-leading active noise cancellation',
                'Up to 30 hours battery life',
                'Touch sensor controls',
                'Premium lightweight design with foldable structure'
            ]
        },
        {
            id: 2,
            name: 'Bose QuietComfort 45',
            brand: 'Bose',
            price: 32999,
            imageUrl: 'https://lablaab.com/wp-content/uploads/2023/12/51mb-i8N5tL._AC_SL1500_.jpg',
            description: [
                'High-fidelity audio with adjustable EQ',
                'World-class noise cancellation',
                'Up to 24 hours battery life',
                'Comfortable, lightweight fit'
            ]
        },
        {
            id: 3,
            name: 'AirPods Max',
            brand: 'Apple',
            price: 59999,
            imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1604021221000',
            description: [
                'Apple-designed dynamic driver',
                'Active Noise Cancellation with Transparency Mode',
                'Spatial audio with dynamic head tracking',
                'Memory foam ear cushions for all-day comfort'
            ]
        },
        {
            id: 4,
            name: 'JBL Live 660NC',
            brand: 'JBL',
            price: 10999,
            imageUrl: 'https://www.designinfo.in/wp-content/uploads/2023/10/JBL-Live-660NC-Blue-1-485x485-optimized.webp',
            description: [
                'Adaptive noise cancelling',
                'JBL Signature Sound with 40mm drivers',
                '50-hour battery life with quick charge',
                'Voice assistant support (Alexa, Google Assistant)'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 animate-gradient py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">All Products</h1>

            {/* Shoes Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold font-serif text-gray-800 dark:text-gray-200">Shoes</h2>
                    <Link to="/products/shoes">
                        <button className="bg-indigo-600 text-white rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-200">
                            View More
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {shoes.map((shoe) => (
                        <div key={shoe.id} className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <figure className="relative">
                                <img
                                    src={shoe.imageUrl}
                                    alt={shoe.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    width="288"
                                    height="192"
                                    style={{ willChange: 'transform' }}
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300"></div>
                            </figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {shoe.name} <span className="text-sm text-gray-500 dark:text-gray-400">by {shoe.brand}</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">Rs {shoe.price.toLocaleString()}</p>
                            </div>
                            <div className="p-4">
                                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SmartWatches Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold font-serif text-gray-800 dark:text-gray-200">SmartWatches</h2>
                    <Link to="/products/smartwatches">
                        <button className="bg-indigo-600 text-white rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-200">
                            View More
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watches.map((watch) => (
                        <div key={watch.id} className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <figure className="relative">
                                <img
                                    src={watch.imageUrl}
                                    alt={watch.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    width="288"
                                    height="192"
                                    style={{ willChange: 'transform' }}
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300"></div>
                            </figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {watch.name} <span className="text-sm text-gray-500 dark:text-gray-400">by {watch.brand}</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">Rs {watch.price.toLocaleString()}</p>
                            </div>
                            <div className="p-4">
                                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Backpacks Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold font-serif text-gray-800 dark:text-gray-200">Backpacks</h2>
                    <Link to="/products/backpacks">
                        <button className="bg-indigo-600 text-white rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-200">
                            View More
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {backpacks.map((backpack) => (
                        <div key={backpack.id} className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <figure className="relative">
                                <img
                                    src={backpack.imageUrl}
                                    alt={backpack.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    width="288"
                                    height="192"
                                    style={{ willChange: 'transform' }}
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300"></div>
                            </figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {backpack.name} <span className="text-sm text-gray-500 dark:text-gray-400">by {backpack.brand}</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">Rs {backpack.price.toLocaleString()}</p>
                            </div>
                            <div className="p-4">
                                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Headphones Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold font-serif text-gray-800 dark:text-gray-200">Headphones</h2>
                    <Link to="/products/headphones">
                        <button className="bg-indigo-600 text-white rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-200">
                            View More
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {headphones.map((headphone) => (
                        <div key={headphone.id} className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <figure className="relative">
                                <img
                                    src={headphone.imageUrl}
                                    alt={headphone.name}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    width="288"
                                    height="192"
                                    style={{ willChange: 'transform' }}
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-all duration-300"></div>
                            </figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {headphone.name} <span className="text-sm text-gray-500 dark:text-gray-400">by {headphone.brand}</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">Rs {headphone.price.toLocaleString()}</p>
                            </div>
                            <div className="p-4">
                                <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Products);
