// PurchasePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Lock,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import Footer from "./Footer";
import Nav from "./Nav";

const PurchasePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [step, setStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  if (!course) {
    navigate("/courses");
    return null;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add course to user's purchased courses (you'll need to implement this with your backend)
    const purchasedCourse = {
      ...course,
      purchaseDate: new Date().toISOString(),
      progress: 0,
      certificateEarned: false,
    };

    // Store in localStorage for demo purposes (replace with your backend logic)
    const existingCourses = JSON.parse(
      localStorage.getItem("purchasedCourses") || "[]"
    );
    localStorage.setItem(
      "purchasedCourses",
      JSON.stringify([...existingCourses, purchasedCourse])
    );

    setStep(2);
    setLoading(false);
  };

  return (
    <>
      <Nav></Nav>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Course Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {course.name}
                    </h3>
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                      <span>Course Price</span>
                      <span className="font-semibold">${course.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                      <span>Platform Fee</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>${course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Details
                  </h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                          value={paymentDetails.cardNumber}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardNumber: e.target.value,
                            })
                          }
                          required
                        />
                        <CreditCard className="absolute right-3 top-3 w-6 h-6 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                        value={paymentDetails.cardName}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                          value={paymentDetails.expiry}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              expiry: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                            value={paymentDetails.cvv}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                cvv: e.target.value,
                              })
                            }
                            required
                          />
                          <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Pay ${course.price}
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Secure payment processed by Stripe</span>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              // Success Screen
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  You now have access to "{course.name}". Get ready to start
                  learning!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/my-courses")}
                    className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Go to My Courses
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Start Learning
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PurchasePage;
