import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
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
  DollarSign,
  Gift,
  Calendar,
  Award,
  BookOpen,
  Timer,
  CheckCircle2,
  AlertCircle,
  CreditCard as VisaIcon,
  Coffee,
  CircleDollarSign,
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
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedMobileWallet, setSelectedMobileWallet] = useState("apple");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (!course) {
    navigate("/courses");
    return null;
  }

  const paymentMethods = {
    card: {
      icon: CreditCard,
      title: "Credit/Debit Card",
      description: "Pay securely with your card",
      logos: [
        
       
      ],
    },
    paypal: {
      icon: Wallet,
      title: "PayPal",
      description: "Fast and secure payment with PayPal",
      logos: [], // PayPal logo
    },
    crypto: {
      icon: Globe,
      title: "Cryptocurrency",
      description: "Pay with Bitcoin, Ethereum, or other crypto",
      logos: [
       
      ],
    },
    mobile: {
      icon: Smartphone,
      title: "Mobile Payment",
      description: "Apple Pay, Google Pay, or other mobile wallets",
      logos: [
      
      ],
    },
  };

  const courseFeatures = [
    { icon: BookOpen, text: "Comprehensive curriculum" },
    { icon: Timer, text: "Lifetime access" },
    { icon: Award, text: "Certificate of completion" },
    { icon: Coffee, text: "1-on-1 mentorship" },
    { icon: Globe, text: "Global community access" },
    { icon: CircleDollarSign, text: "Money-back guarantee" },
  ];

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "welcome") {
      setDiscount(10);
    }
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <Nav />
      <div
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50
dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 mt-16
transition-colors duration-500"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {step === 1 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Summary - Left Panel */}
                <div className="lg:col-span-1">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-24"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Course Image Banner */}
                    <div className="relative h-48">
                      <motion.img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                            {course.category || "Development"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {course.name}
                      </h3>

                      {/* Course Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {courseFeatures.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <feature.icon className="w-4 h-4 text-pink-500" />
                            <span className="text-sm">{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* What's Included Accordion */}
                      <motion.div
                        className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6"
                        initial={false}
                        animate={{ height: isAccordionOpen ? "auto" : "48px" }}
                      >
                        <button
                          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                          className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            What's included
                          </span>
                          <motion.div
                            animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isAccordionOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 py-3"
                            >
                              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  Full course access
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  Downloadable resources
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  Certificate of completion
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  24/7 support access
                                </li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Price Summary */}
                      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                          <span>Original Price</span>
                          <span className="font-medium">${course.price}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Discount</span>
                            <span className="font-medium">
                              -${((course.price * discount) / 100).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2">
                          <span>Total</span>
                          <span>
                            $
                            {((course.price * (100 - discount)) / 100).toFixed(
                              2
                            )}
                          </span>
                        </div>

                        {/* Promo Code Section */}
                        <div className="pt-4">
                          {!showPromoCode ? (
                            <button
                              onClick={() => setShowPromoCode(true)}
                              className="text-pink-600 dark:text-pink-400 text-sm font-medium flex items-center gap-2"
                            >
                              <Gift className="w-4 h-4" />
                              Have a promo code?
                            </button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="flex gap-2"
                            >
                              <input
                                type="text"
                                placeholder="Enter code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
bg-white dark:bg-gray-700 text-sm"
                              />
                              <button
                                onClick={handlePromoCode}
                                className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium"
                              >
                                Apply
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Payment Section - Right Panel */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Payment Methods */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Select Payment Method
                      </h2>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(paymentMethods).map(
                          ([key, { icon: Icon, title, logos }]) => (
                            <motion.button
                              key={key}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedPaymentMethod(key)}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-200
${
  selectedPaymentMethod === key
    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
}`}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <Icon
                                  className={`w-6 h-6 ${
                                    selectedPaymentMethod === key
                                      ? "text-pink-500"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                />
                                <span className="text-sm font-medium">
                                  {title}
                                </span>

                                {/* Payment Method Logos */}
                                <div className="flex gap-2 mt-2">
                                  {logos.map((logo, index) => (
                                    <img
                                      key={index}
                                      src={logo}
                                      alt={`${title} logo`}
                                      className="h-5 object-contain"
                                    />
                                  ))}
                                </div>
                              </div>
                              {selectedPaymentMethod === key && (
                                <motion.div
                                  layoutId="selectedIndicator"
                                  className="absolute -top-px -right-px p-1 bg-pink-500 rounded-bl-xl rounded-tr-xl"
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                >
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Payment Details Form */}
                    <form onSubmit={handlePaymentSubmit} className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Payment Details
                      </h3>

                      <div className="space-y-4">
                        {selectedPaymentMethod === "card" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Card Number
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={paymentDetails.cardNumber}
                                  onChange={(e) =>
                                    setPaymentDetails({
                                      ...paymentDetails,
                                      cardNumber: e.target.value,
                                    })
                                  }
                                  placeholder="1234 5678 9012 3456"
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  required
                                />
                                <VisaIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                value={paymentDetails.cardName}
                                onChange={(e) =>
                                  setPaymentDetails({
                                    ...paymentDetails,
                                    cardName: e.target.value,
                                  })
                                }
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  value={paymentDetails.expiry}
                                  onChange={(e) =>
                                    setPaymentDetails({
                                      ...paymentDetails,
                                      expiry: e.target.value,
                                    })
                                  }
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  CVV
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={paymentDetails.cvv}
                                    onChange={(e) =>
                                      setPaymentDetails({
                                        ...paymentDetails,
                                        cvv: e.target.value,
                                      })
                                    }
                                    placeholder="123"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                  />
                                  <Info className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedPaymentMethod === "paypal" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              PayPal Email
                            </label>
                            <input
                              type="email"
                              value={paypalEmail}
                              onChange={(e) => setPaypalEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              required
                            />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              You will be redirected to PayPal to complete your
                              payment
                            </p>
                          </div>
                        )}

                        {selectedPaymentMethod === "crypto" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Select Cryptocurrency
                              </label>
                              <select
                                value={selectedCrypto}
                                onChange={(e) =>
                                  setSelectedCrypto(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                              >
                                <option value="btc">Bitcoin (BTC)</option>
                                <option value="eth">Ethereum (ETH)</option>
                                <option value="usdt">Tether (USDT)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your {selectedCrypto.toUpperCase()} Address
                              </label>
                              <input
                                type="text"
                                value={cryptoAddress}
                                onChange={(e) =>
                                  setCryptoAddress(e.target.value)
                                }
                                placeholder="Enter your wallet address"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                              />
                            </div>
                          </>
                        )}

                        {selectedPaymentMethod === "mobile" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Select Mobile Wallet
                              </label>
                              <select
                                value={selectedMobileWallet}
                                onChange={(e) =>
                                  setSelectedMobileWallet(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                              >
                                <option value="apple">Apple Pay</option>
                                <option value="google">Google Pay</option>
                                <option value="samsung">Samsung Pay</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Mobile Number
                              </label>
                              <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) =>
                                  setMobileNumber(e.target.value)
                                }
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                required
                              />
                            </div>
                          </>
                        )}

                        {/* Security Note - Keep this for all payment methods */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-6">
                          <Lock className="w-4 h-4" />
                          <span>
                            Your payment information is secure and encrypted
                          </span>
                        </div>

                        {/* Submit Button - Keep this for all payment methods */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white 
               rounded-xl font-medium transition-colors duration-200 flex items-center 
               justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Clock className="w-5 h-5" />
                              </motion.div>
                              Processing...
                            </>
                          ) : (
                            <>
                              Complete Purchase
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Success State
              <motion.div
                className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full 
                           flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Purchase Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Thank you for your purchase. You can now access your course in
                  My course.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/my-Courses")}
                  className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl 
                           font-medium transition-colors duration-200"
                >
                  Go to My Courses
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PurchasePage;
