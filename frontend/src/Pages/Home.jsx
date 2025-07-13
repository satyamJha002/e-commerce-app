import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const categories = [
        { id: 1, src: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg', title: 'Electronics' },
        { id: 2, src: 'https://images.pexels.com/photos/32955012/pexels-photo-32955012.jpeg', title: 'Fashion' },
        { id: 3, src: 'https://images.pexels.com/photos/4050387/pexels-photo-4050387.jpeg', title: 'Home & Garden' },
        { id: 4, src: 'https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg', title: 'Sports' },
    ];

    const products = [
        {
            id: 1,
            cardTitle: 'Shoes',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
            cardDescription: 'A stylish pair of sneakers perfect for daily wear.',
        },
        {
            id: 2,
            cardTitle: 'Smartwatch',
            cardImage: 'https://images.pexels.com/photos/110471/pexels-photo-110471.jpeg',
            cardDescription: 'Track your fitness and stay connected with this elegant smartwatch.',
        },
        {
            id: 3,
            cardTitle: 'Backpack',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
            cardDescription: 'Spacious and durable backpack for school or travel.',
        },
        {
            id: 4,
            cardTitle: 'Headphones',
            cardImage: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
            cardDescription: 'Enjoy immersive sound quality with noise-cancelling headphones.',
        },
    ];


    return (
            <div className="pt-20 px-20 container-fluid py-20">
            <div className="container mx-auto flex flex-wrap items-center justify-around p-8 bg-black text-white">
                <div className="m-6 max-w-xl">
                    <div className="flex flex-col justify-center gap-5">
                        <h1 className="text-5xl font-bold">Summer Sale Upto 70% Off</h1>
                        <p className="text-2xl">
                            Discover amazing deals on your favourite products. <br />
                            Limited time Offer!
                        </p>

                        <button className="bg-white text-blue-500 py-3 px-6 text-lg rounded-md w-fit mt-4">
                            Shop Now
                        </button>

                    </div>
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <img
                        src="https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg"
                        alt="shopping cart"
                        className="w-full h-auto object-cover rounded-md"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mt-12 px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Shop Category</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className="flex flex-col items-center justify-center text-center space-y-3">
                            <img
                                src={category.src}
                                alt={category.title}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="text-lg font-medium">{category.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 px-4">
                <div className={`flex justify-between`}>
                <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
                    <Link to='all-products'>
                        <button className={` text-blue-500`}>
                            View All
                        </button>
                    </Link>

                </div>

                <div className="flex flex-wrap gap-6 justify-around p-8">
                    {products.map((product) => (
                        <div key={product.id} className="card w-72 bg-base-100 shadow-xl">
                            <figure>
                                <img src={product.cardImage} alt={product.cardTitle} className="h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.cardTitle}</h2>
                                <p>{product.cardDescription}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
