import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import toast from "react-hot-toast"; // Import the styles

const CoursePurchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state; // Access the course object passed via state

  const [finalPrice, setFinalPrice] = useState(course.price);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method

  useEffect(() => {
    if (course.category === "paid") {
      const discountedPrice = course.price - (course.price * 50) / 100;
      setFinalPrice(discountedPrice);
    }
  }, [course]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value); // Update selected payment method
  };

  const handleCompletePayment = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please choose a payment method!"); // Show error toast if no payment method is selected
    } else {
      toast.success("Payment successful! Redirecting to home..."); // Show success toast
      setTimeout(() => {
        navigate("/"); // Redirect to home after 2 seconds
      }, 2000);
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 mt-16 dark:bg-slate-900 ">
        {/* Page Header */}
        <h1 className="text-4xl font-extrabold text-pink-500 mb-8">Checkout</h1>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section: Billing and Payment */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">
              Billing Address
            </h2>
            <form className="space-y-4 mt-4 ">
              {/* Country */}
              <div>
                <label className="block text-gray-400 mb-2">Country</label>
                <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-gray-600">
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-gray-400 mb-2">
                  State / Union Territory
                </label>
                <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-gray-600">
                  <option value="Haryana">Haryana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              {/* Payment Method */}
              <h2 className="text-2xl font-semibold text-pink-500 mt-6 mb-4">
                Payment Method
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment-method"
                    value="credit-card"
                    onChange={handlePaymentMethodChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <p className="text-gray-600">Credit/Debit Card</p>
                </label>
                <label className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment-method"
                    value="upi"
                    onChange={handlePaymentMethodChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <p className="text-gray-600">UPI</p>
                </label>
                <label className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment-method"
                    value="net-banking"
                    onChange={handlePaymentMethodChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <p className="text-gray-600">Net Banking</p>
                </label>
              </div>

              {/* Terms */}
              <p className="text-sm text-pink-500 mt-6">
                E-learn is required by law to collect applicable transaction taxes
                for purchases made in certain tax jurisdictions.
              </p>
            </form>
          </div>

          {/* Right Section: Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600 ">Original Price:</p>
                <p className="font-medium dark:text-gray-600">${course.price}</p>
              </div>
              {!course.isFree && (
                <div className="flex justify-between">
                  <p className="text-green-600">Discount (50% Off):</p>
                  <p className="font-medium text-green-600">
                    - ${course.price - finalPrice}
                  </p>
                </div>
              )}
              <div className="flex justify-between border-t pt-4">
                <p className="text-lg font-semibold dark:text-blue-600">Total (1 course):</p>
                <p className="text-lg font-semibold text-blue-600">
                  ${finalPrice}
                </p>
              </div>
            </div>

            {/* Terms */}
            <p className="text-sm text-gray-500 mt-6">
              By completing your purchase you agree to these{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>
              .
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong className="text-pink-500">30-Day Money-Back Guarantee:</strong> Not satisfied? Get a
              full refund within 30 days. No questions asked!
            </p>

            {/* Payment Button */}
            <button
              onClick={handleCompletePayment}
              className="w-full mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-700"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
      
    </>
  );
};

export default CoursePurchase;
