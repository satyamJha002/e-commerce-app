import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice.js";
import { Trash2, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart data from Redux store
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  // Handle quantity update
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      addToCart({
        ...item,
        quantity: newQuantity,
      })
    );
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="mt-20 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/all-products"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 bg-white dark:bg-gray-800 px-4 py-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ₹{item.price?.toLocaleString()}
                    </h3>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-auto flex flex-col justify-between items-end">
                  {/* Delete & Wishlist */}
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-pink-500 transition-colors" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200 shadow-sm hover:bg-gray-700 dark:hover:bg-white transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white dark:text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-6 h-max shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Order Summary
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3">
              <li className="flex justify-between text-sm">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{itemsPrice?.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {shippingPrice === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${shippingPrice}`
                  )}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Tax (18% GST)</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{taxPrice?.toLocaleString()}
                </span>
              </li>
              <hr className="border-gray-200 dark:border-gray-700 my-2" />
              <li className="flex justify-between text-base font-bold text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span>₹{totalPrice?.toLocaleString()}</span>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <Link to="/checkout">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>
              <Link to="/all-products">
                <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-xl transition-colors mt-2">
                  Continue Shopping
                </button>
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
                We accept
              </p>
              <div className="flex justify-center gap-3">
                <img
                  src="https://readymadeui.com/images/master.webp"
                  alt="Mastercard"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/visa.webp"
                  alt="Visa"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/american-express.webp"
                  alt="American Express"
                  className="w-10 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;