import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Lock,
  CheckCircle,
  ArrowRight,
  Shield,
  Wallet,
  Smartphone,
  Globe,
  Clock,
  Info,
  ChevronDown,
} from "lucide-react";
import Footer from "./Footer";
import Nav from "./Nav";

const PurchasePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  if (!course) {
    navigate("/courses");
    return null;
  }

  const paymentMethods = {
    card: {
      icon: CreditCard,
      title: "Credit/Debit Card",
      description: "Pay securely with your card",
    },
    paypal: {
      icon: Wallet,
      title: "PayPal",
      description: "Fast and secure payment with PayPal",
    },
    crypto: {
      icon: Globe,
      title: "Cryptocurrency",
      description: "Pay with Bitcoin, Ethereum, or other crypto",
    },
    mobile: {
      icon: Smartphone,
      title: "Mobile Payment",
      description: "Apple Pay, Google Pay, or other mobile wallets",
    },
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const purchasedCourse = {
      ...course,
      purchaseDate: new Date().toISOString(),
      progress: 0,
      certificateEarned: false,
      paymentMethod: selectedPaymentMethod,
    };

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
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {step === 1 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Summary - Left Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Course Summary
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

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{course.duration || "Self-paced"}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Globe className="w-4 h-4 mr-2" />
                          <span>{course.level || "All Levels"}</span>
                        </div>
                      </div>

                      {/* Custom Accordion */}
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                          className="w-full px-4 py-3 flex justify-between items-center text-left text-gray-900 dark:text-white"
                        >
                          <span className="font-medium">What's included</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              isAccordionOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isAccordionOpen && (
                          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                              <li>✓ Lifetime access</li>
                              <li>✓ Certificate of completion</li>
                              <li>✓ Downloadable resources</li>
                              <li>✓ Mobile & desktop access</li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                            <span>Course Price</span>
                            <span className="font-semibold">
                              ${course.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                            <span>Platform Fee</span>
                            <span className="font-semibold">$0</span>
                          </div>
                          <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white pt-2">
                            <span>Total</span>
                            <span>${course.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Section - Right Panel */}
                <div className="lg:col-span-2">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Payment Method
                    </h2>

                    {/* Custom Payment Method Tabs */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {Object.entries(paymentMethods).map(
                        ([key, { icon: Icon, title }]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedPaymentMethod(key)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                              selectedPaymentMethod === key
                                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-sm">{title}</span>
                          </button>
                        )
                      )}
                    </div>

                    {/* Payment Forms */}
                    <div>
                      {selectedPaymentMethod === "card" && (
                        <form
                          onSubmit={handlePaymentSubmit}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
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

                            <div className="md:col-span-2">
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

                          {/* Custom Alert */}
                          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Your card will be charged ${course.price}{" "}
                              immediately. Refunds available within 30 days.
                            </p>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
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
                      )}

                      {selectedPaymentMethod === "paypal" && (
                        <div className="text-center p-8">
                          <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                          <h3 className="text-xl font-semibold mb-2">
                            Pay with PayPal
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You'll be redirected to PayPal to complete your
                            purchase
                          </p>
                          <button
                            onClick={handlePaymentSubmit}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                Processing...
                              </>
                            ) : (
                              "Continue to PayPal"
                            )}
                          </button>
                        </div>
                      )}

                      {selectedPaymentMethod === "crypto" && (
                        <div className="text-center p-8">
                          <Globe className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                          <h3 className="text-xl font-semibold mb-2">
                            Pay with Cryptocurrency
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Choose your preferred cryptocurrency
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                              className="p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                              onClick={handlePaymentSubmit}
                            >
                              <img
                                src="/api/placeholder/24/24"
                                alt="BTC"
                                className="w-6 h-6"
                              />
                              Bitcoin
                            </button>
                            <button
                              className="p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                              onClick={handlePaymentSubmit}
                            >
                              <img
                                src="/api/placeholder/24/24"
                                alt="ETH"
                                className="w-6 h-6"
                              />
                              Ethereum
                            </button>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Current Exchange Rate:
                              <br />
                              1 BTC = $45,000 USD
                              <br />1 ETH = $3,200 USD
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                              <p className="text-sm">
                                Amount due: ${course.price}
                                <br />≈ {(course.price / 45000).toFixed(6)} BTC
                                <br />≈ {(course.price / 3200).toFixed(6)} ETH
                              </p>
                            </div>
                            <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-400">
                              <Shield className="w-4 h-4" />
                              <span>
                                Secure crypto payment processed by Coinbase
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === "mobile" && (
                        <div className="text-center p-8">
                          <Smartphone className="w-16 h-16 mx-auto mb-4 text-green-500" />
                          <h3 className="text-xl font-semibold mb-2">
                            Mobile Payment
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Choose your preferred mobile payment method
                          </p>
                          <div className="space-y-4">
                            <button
                              onClick={handlePaymentSubmit}
                              className="w-full p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-3"
                            >
                              <img
                                src="/api/placeholder/24/24"
                                alt="Apple Pay"
                                className="w-6 h-6"
                              />
                              Pay with Apple Pay
                            </button>
                            <button
                              onClick={handlePaymentSubmit}
                              className="w-full p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-3"
                            >
                              <img
                                src="/api/placeholder/24/24"
                                alt="Google Pay"
                                className="w-6 h-6"
                              />
                              Pay with Google Pay
                            </button>
                            <button
                              onClick={handlePaymentSubmit}
                              className="w-full p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-3"
                            >
                              <img
                                src="/api/placeholder/24/24"
                                alt="Samsung Pay"
                                className="w-6 h-6"
                              />
                              Pay with Samsung Pay
                            </button>
                          </div>
                          <div className="mt-6 flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>Secure mobile payment processing</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
      <Footer />
    </>
  );
};

export default PurchasePage;
