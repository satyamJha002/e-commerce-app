import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice.js";
import { useVerifyPaymentMutation } from "../slices/orderApiSlice.js";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (orderId && sessionId) {
        try {
          await verifyPayment({ orderId, sessionId }).unwrap();
          dispatch(clearCart());
          setVerified(true);
        } catch (err) {
          setError(err?.data?.message || "Payment verification failed");
        }
      } else if (orderId) {
        // COD order - no verification needed
        dispatch(clearCart());
        setVerified(true);
      } else {
        navigate("/");
      }
    };

    verify();
  }, [orderId, sessionId, verifyPayment, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="mt-20 min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-6 mb-6">
          <span className="text-4xl">❌</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Verification Failed
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          {error}
        </p>
        <Link
          to="/orders-summary"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          View Orders
        </Link>
      </div>
    );
  }

  if (!verified) {
    return null;
  }

  return (
    <div className="mt-20 min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-200 dark:bg-green-900/30 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-6 inline-block">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Thank you for your purchase
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          Order ID: <span className="font-mono text-indigo-600">{orderId}</span>
        </p>

        {/* Order Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-3">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Order Confirmed
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We'll send you updates via email
              </p>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-700 my-4" />
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• Your order is being processed</p>
            <p>• You will receive shipping updates</p>
            <p>• Estimated delivery: 5-7 business days</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders-summary"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            View My Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/all-products"
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
