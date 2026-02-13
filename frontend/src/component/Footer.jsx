import React from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  CreditCard,
  Truck,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/10 rounded-xl">
                <Truck className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Free Shipping</h4>
                <p className="text-xs text-gray-400">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/10 rounded-xl">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Secure Payment</h4>
                <p className="text-xs text-gray-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/10 rounded-xl">
                <CreditCard className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-400">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/10 rounded-xl">
                <HeadphonesIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-400">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EliteMart</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your one-stop destination for premium electronics, fashion, and more. 
              Quality products at unbeatable prices since 1992.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/all-products"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/electronics"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/fashions"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/home-and-appliances"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Home & Appliances
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/sports"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Commerce Street,<br />
                  Tech Park, Mumbai 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  +91 1234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:support@elitemart.com"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  support@elitemart.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} EliteMart Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png"
                alt="Mastercard"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/200px-Stripe_Logo%2C_revised_2016.svg.png"
                alt="Stripe"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
