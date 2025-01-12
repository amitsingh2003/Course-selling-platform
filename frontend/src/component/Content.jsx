import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Link,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I access my course after purchase?",
      answer:
        "After purchase, you'll receive login credentials via email. Access your courses through the dashboard.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
  ];

  const validateForm = () => {
    const errors = [];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.push("Please enter a valid phone number");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
    setLoading(false);
  };

  // Animated background patterns
  const Pattern = () => (
    <div className="absolute inset-0 overflow-hidden ">
      <div className="absolute w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen overflow-hidden relative py-12 px-4 mt-20">
        <Pattern />

        <div className="max-w-7xl mx-auto relative">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16 relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-20 left-1/2 transform -translate-x-1/2"
            >
              <Sparkles className="w-16 h-16 text-fuchsia-500 animate-pulse" />
            </motion.div>

            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Let's Connect
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to collaborate? We'd love to hear from
              you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-xl transform -rotate-6 scale-105" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form fields */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1 w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-2  focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 dark:focus:ring-fuchsia-800 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-1 w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-2  focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 dark:focus:ring-fuchsia-800 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-2  focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 dark:focus:ring-fuchsia-800 transition-all duration-300"
                      required
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows="4"
                      className="mt-1 w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-2  focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 dark:focus:ring-fuchsia-800 transition-all duration-300"
                      required
                      onMouseEnter={() => setCursorVariant("text")}
                      onMouseLeave={() => setCursorVariant("default")}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-fuchsia-500/25"
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-3xl blur-xl transform rotate-6 scale-105" />
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {/* Contact Info Items */}
                    {[
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+1 (234) 567-890",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: "hello@example.com",
                      },
                      {
                        icon: MapPin,
                        label: "Address",
                        value: "123 Innovation Ave, Tech City",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="flex items-center space-x-4 group"
                        onMouseEnter={() => setCursorVariant("button")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-all duration-300">
                          <item.icon className="text-fuchsia-500" />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Social Media Links */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-4">
                        Connect With Us
                      </h3>
                      <div className="flex space-x-4">
                        {[Facebook, Twitter, Link, Instagram].map(
                          (Icon, index) => (
                            <motion.div
                              key={index}
                              whileHover={{
                                scale: 1.2,
                                rotate: 5,
                                backgroundColor: "rgba(244, 114, 182, 0.2)",
                              }}
                              className="p-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 cursor-pointer"
                              onMouseEnter={() => setCursorVariant("button")}
                              onMouseLeave={() => setCursorVariant("default")}
                            >
                              <Icon className="w-5 h-5 text-gray-600 hover:text-fuchsia-500 dark:text-gray-300 dark:hover:text-fuchsia-400 transition-colors" />
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced FAQ Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-xl transform -rotate-3 scale-105" />
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={false}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                      >
                        <motion.button
                          onClick={() =>
                            setSelectedFaq(selectedFaq === index ? null : index)
                          }
                          className="w-full flex justify-between items-center text-left py-2"
                          whileHover={{ x: 5 }}
                          onMouseEnter={() => setCursorVariant("button")}
                          onMouseLeave={() => setCursorVariant("default")}
                        >
                          <span className="font-medium text-gray-900 dark:text-white flex items-center gap-3">
                            {faq.icon}
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{
                              rotate: selectedFaq === index ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-5 h-5 text-fuchsia-500" />
                          </motion.div>
                        </motion.button>
                        <AnimatePresence>
                          {selectedFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="py-4 text-gray-600 dark:text-gray-300 pl-11">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
