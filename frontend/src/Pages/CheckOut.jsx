import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} from "../slices/cartSlice.js";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "../slices/orderApiSlice.js";
import { toast } from "react-toastify";
import {
  MapPin,
  Phone,
  CreditCard,
  Truck,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation();

  // Form state
  const [address, setAddress] = useState(cart.shippingAddress?.address || "");
  const [city, setCity] = useState(cart.shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    cart.shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(
    cart.shippingAddress?.country || "India"
  );
  const [phone, setPhone] = useState(cart.shippingAddress?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod || "Razorpay"
  );

  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cart.cartItems, navigate]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country || !phone) {
      toast.error("Please fill all shipping fields");
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country, phone }));
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setCurrentStep(3);
  };

  const handleRazorpayPayment = async (orderData) => {
    const options = {
      key: orderData.razorpayKeyId,
      amount: orderData.amount,
      currency: "INR",
      name: "EliteMart",
      description: "Order Payment",
      order_id: orderData.razorpayOrderId,
      handler: async function (response) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderData.order._id,
          }).unwrap();

          dispatch(clearCart());
          toast.success("Payment successful! Order placed.");
          navigate(`/orders-summary`);
        } catch (err) {
          toast.error(err?.data?.message || "Payment verification failed");
        }
      },
      prefill: {
        name: `${userInfo?.firstName || ""} ${userInfo?.lastName || ""}`,
        email: userInfo?.email || "",
        contact: phone,
      },
      theme: {
        color: "#6366f1",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const placeOrderHandler = async () => {
    try {
      const orderData = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
          phone,
        },
        paymentMethod,
        itemPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (paymentMethod === "Razorpay") {
        handleRazorpayPayment(orderData);
      } else {
        // COD - Order placed directly
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate(`/orders-summary`);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  const steps = [
    { number: 1, title: "Shipping", icon: MapPin },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: CheckCircle },
  ];

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentStep >= step.number
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                    currentStep > step.number
                      ? "bg-indigo-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-indigo-600" />
                  Shipping Address
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main Street, Apartment 4B"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="400001"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="India"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                  Payment Method
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "Razorpay"
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("Razorpay")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "Razorpay"}
                        onChange={() => setPaymentMethod("Razorpay")}
                        className="w-5 h-5 text-indigo-600"
                      />
                      <div className="flex items-center gap-3">
                        <img
                          src="https://razorpay.com/assets/razorpay-glyph.svg"
                          alt="Razorpay"
                          className="w-8 h-8"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Razorpay
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            UPI, Cards, Net Banking, Wallets
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("COD")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="w-5 h-5 text-indigo-600"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">
                            ₹
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-indigo-600" />
                  Review Order
                </h2>

                {/* Shipping Summary */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Shipping Address
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {address}, {city}, {postalCode}, {country}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Phone: {phone}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Payment Method
                    </h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {paymentMethod === "Razorpay"
                      ? "Razorpay (UPI, Cards, Net Banking)"
                      : "Cash on Delivery"}
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity)?.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={isCreatingOrder || isVerifying}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:cursor-not-allowed"
                  >
                    {isCreatingOrder || isVerifying
                      ? "Processing..."
                      : paymentMethod === "COD"
                      ? "Place Order"
                      : "Pay Now"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Items ({cart.cartItems.length})</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ₹{cart.itemsPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {cart.shippingPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${cart.shippingPrice}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (18% GST)</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ₹{cart.taxPrice?.toLocaleString()}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{cart.totalPrice?.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Fast delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="w-4 h-4 text-purple-500" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
