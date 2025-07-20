import React from 'react'

const AboutUs = () => {
    return (
        <div className="mt-20 px-4">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>

            <div className="space-y-6  leading-relaxed text-base md:text-lg">
                <p>
                    Welcome to <span className="font-semibold text-cyan-500">EliteShop</span>, your one-stop destination for high-quality products and exceptional shopping experiences.
                </p>
                <p>
                    At <span className="font-semibold text-cyan-500">EliteShop</span>, we believe in delivering more than just products—we offer style, convenience, and reliability right at your fingertips. Whether you're looking for the latest trends, everyday essentials, or unique finds, we’ve got you covered.
                </p>

                <h3 className="font-bold text-2xl mt-8">Why Choose Us?</h3>
                <ul className="list-disc pl-6 space-y-3">
                    <li>
                        <span className="font-semibold text-lg text-cyan-500">Curated Selection</span> — We handpick every item to ensure top-notch quality and value.
                    </li>
                    <li>
                        <span className="font-semibold text-lg text-cyan-500">Customer-Centric Approach</span> — Your satisfaction is our priority, with hassle-free returns and 24/7 support.
                    </li>
                    <li>
                        <span className="font-semibold text-lg text-cyan-500">Fast & Secure Shipping</span> — Get your orders delivered quickly and safely, no matter where you are.
                    </li>
                    <li>
                        <span className="font-semibold text-lg text-cyan-500">Affordable Prices</span> — Enjoy great deals, discounts, and exclusive offers without compromising on quality.
                    </li>
                </ul>

                <p>
                    Our mission is simple: to make online shopping easy, enjoyable, and accessible for everyone.
                </p>
                <p>Thank you for choosing <span className="font-semibold text-cyan-500">EliteShop</span> — we’re excited to serve you!</p>
                <p className="mt-4">
                    <strong>Have questions?</strong> Contact us at <a href="mailto:eliteshop@yopmail.com" className="text-blue-600 underline">eliteshop@yopmail.com</a> or call <a href="tel:+1234563980" className="text-blue-600 underline">+123-4563-980</a>.
                </p>
            </div>
        </div>
    )
}

export default AboutUs
