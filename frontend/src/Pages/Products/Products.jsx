import React from 'react'
import {Link} from "react-router-dom";

const Products = () => {
    const shoes = [
        {
            id: 1,
            name: 'Ultraboost 22',
            brand: 'Adidas',
            price: 15999,
            imageUrl: 'https://imgs.search.brave.com/lMXwtjvIyDizXvPok_C56Ca7LLWcaOALfq-_uiX6i_M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuYWRpZGFzLmNv/bS9pbWFnZXMvd184/NDAsaF84NDAsZl9h/dXRvLHFfYXV0bzpz/ZW5zaXRpdmUsZmxf/bG9zc3kvNDU2Yjkz/NzMxY2RiNDRlNjg0/NTJhZTkyMDEyZmU5/ODZfOTM2Ni9HWDkx/NThfMDlfc3RhbmRh/cmQuanBn',
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
            imageUrl: 'https://imgs.search.brave.com/HhzN96BHXwRpmB9Aol_lsklj4DOBHsgL-fvrXHoC6Ks/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMubmV0c2hvZXMu/Y29tLmJyL3Byb2R1/dG9zL3RlbmlzLWlu/ZmFudGlsLWNvbnZl/cnNlLWFsbC1zdGFy/LWNodWNrLXRheWxv/ci0vODAvRDI2LTAx/MzUtMDgwL0QyNi0w/MTM1LTA4MF96b29t/MS5qcGc_dHM9MTY5/NTExMTcxMCZpbXM9/MzI2eA',
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
            imageUrl: 'https://imgs.search.brave.com/0Sf1QkVauKdWduFeAX8YoL-aO7Mkrsi2dzIktBBbTV4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFWVCt6anljWUwu/anBn',
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
            imageUrl: 'https://imgs.search.brave.com/qzPmiYRFC4M2IC9jWlFl8GLbOOhUiOFuDjUGpoE5O78/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YXBwbGUuY29tL25l/d3Nyb29tL2ltYWdl/cy8yMDIzLzA5L2Fw/cGxlLWludHJvZHVj/ZXMtdGhlLWFkdmFu/Y2VkLW5ldy1hcHBs/ZS13YXRjaC1zZXJp/ZXMtOS9hcnRpY2xl/L0FwcGxlLVdhdGNo/LVM5LVBhbGV0dGUt/d2F0Y2gtZmFjZS0y/MzA5MTJfaW5saW5l/LmpwZy5sYXJnZS5q/cGc',
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
            imageUrl: 'https://imgs.search.brave.com/CSctP0bHZnl-iRePjX73EP7NX2_S4wYhCTko2FV9vh4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vU2Ft/c3VuZy1HYWxheHkt/V2F0Y2g2LUNsYXNz/aWMtNDNtbS1TbWFy/dC1XYXRjaC1CbHVl/dG9vdGgtQmxhY2tf/NWZlMDcwNjMtYmIx/OS00YmE4LWEyOWUt/ZDI0Yjg3NmI4NGJh/LjQ5YmY4ZjM1YmZm/ZTMwZWFmYTAwMTFj/YzVmZmNkYmE3Lmpw/ZWc_b2RuSGVpZ2h0/PTY0MCZvZG5XaWR0/aD02NDAmb2RuQmc9/RkZGRkZG',
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
            imageUrl: 'https://imgs.search.brave.com/5X41emiqUjE9rxzLz0osG6tCvVo43xtHmqhMU6hXPUs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oZXJz/Y2hlbC5jb20vY29u/dGVudC9kYW0vaGVy/c2NoZWwvcHJvZHVj/dHMvMTE1NDYvMTE1/NDYtMDAwMDEtT1Nf/MDMuanBnLnN0aHVt/Ym5haWxzLjIwMDAu/MjUwMC53ZWJw',
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
            imageUrl: 'https://imgs.search.brave.com/huUGHi_oQcibm6-BG1jJru5duW6cLQaCZi--ClW1FaA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxZWdWVWx6UGJM/LmpwZw',
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
            imageUrl: 'https://imgs.search.brave.com/gIKGyyQ33K7H5V9vY3e0SeUAs0HjkLVOd8-h5q3xVyg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY1MDk3NS1NTFU3/MzMyOTEwMDY5Ml8x/MjIwMjMtRS53ZWJw',
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
        <div className="container-fluid py-20 px-20">
            <h1 className={`text-3xl font-bold mb-8 text-center`}>All Products</h1>

            <div>
                <div className={`flex gap-6 items-center`}>
                    <h2 className={`text-2xl font-semibold font-serif`}>Shoes</h2>
                    <Link to={`/products/shoes`}>
                        <button className={`text-white rounded-full px-4 py-2 shadow-2xl cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-800`}>View More</button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-6 justify-around p-8">
                    {shoes.map((shoe) => (
                        <div key={shoe.id} className={`card w-72 bg-base-100 shadow-xl`}>
                            <figure>
                                <img src={shoe.imageUrl} alt={shoe.name}/>
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{shoe.name}</h2>
                                <p>Rs {shoe.price}</p>
                            </div>
                            <button className={`bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-200 hover:text-black cursor-pointer `}>
                                Add to cart
                            </button>
                        </div>
                    ))}

                </div>

            </div>
            <div className={`my-6`}>
                <div className={`flex gap-6 items-center`}>
                    <h2 className={`text-2xl font-semibold font-serif`}>SmartWatches</h2>
                    <Link to={`/products/smartwatches`}>
                        <button className={`text-white rounded-full px-4 py-2 shadow-2xl cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-800`}>View More</button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-6 justify-around p-8">
                    {watches.map((watch) => (
                        <div key={watch.id} className={`card w-72 bg-base-100 shadow-xl`}>
                            <figure>
                                <img src={watch.imageUrl} alt={watch.name}/>
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{watch.name}</h2>
                                <p>Rs {watch.price}</p>
                            </div>
                            <button className={`bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-200 hover:text-black cursor-pointer `}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`my-6`}>
                <div className={`flex gap-6 items-center`}>
                    <h2 className={`text-2xl font-semibold font-serif`}>Backpacks</h2>
                    <Link to={`/products/backpacks`}>
                        <button className={`text-white rounded-full px-4 py-2 shadow-2xl cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-800`}>View More</button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-6 justify-around p-8">
                    {backpacks.map((backpack) => (
                        <div key={backpack.id} className={`card w-72 bg-base-100 shadow-xl`}>
                            <figure>
                                <img src={backpack.imageUrl} alt={backpack.name}/>
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{backpack.name}</h2>
                                <p>Rs {backpack.price}</p>
                            </div>
                            <button className={`bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-200 hover:text-black cursor-pointer `}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`my-6`}>
                <div className={`flex gap-5 items-center`}>
                    <h1 className={`text-2xl font-semibold font-serif`}>HeadPhones</h1>
                    <Link to={`/products/headphones`}>
                        <button className={`text-white rounded-full px-4 py-2 shadow-2xl cursor-pointer hover:bg-blue-200 hover:text-black bg-blue-800`}>View More</button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-6 justify-around p-8">
                    {headphones.map((headphone) => (
                        <div key={headphone.id} className={`card w-72 bg-base-100 shadow-xl`}>
                            <figure>
                                <img src={headphone.imageUrl} alt={headphone.name}/>
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{headphone.name}</h2>
                                <p>Rs {headphone.price}</p>
                            </div>
                            <button className={`bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-200 hover:text-black cursor-pointer `}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default  Products
