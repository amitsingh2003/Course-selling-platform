import React, { useState } from "react";
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
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.",
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our courses? We're here to help you achieve
            your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-600 dark:text-pink-400 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-transparent focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
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
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="text-pink-600 dark:text-pink-400" />
                  <div>
                    <p className="font-medium dark:text-white">Phone</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      +1 (234) 567-890
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-pink-600 dark:text-pink-400" />
                  <div>
                    <p className="font-medium dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@estore.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-pink-600 dark:text-pink-400" />
                  <div>
                    <p className="font-medium dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 E-Store Street, Tech City, 56789
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-pink-600 dark:text-pink-400 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <Facebook className="w-6 h-6 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 cursor-pointer transition-colors" />
                  <Link className="w-6 h-6 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 cursor-pointer transition-colors" />
                  <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() =>
                        setSelectedFaq(selectedFaq === index ? null : index)
                      }
                      className="w-full text-left"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium dark:text-white">
                          {faq.question}
                        </h3>
                        <span className="text-pink-600 dark:text-pink-400">
                          {selectedFaq === index ? "−" : "+"}
                        </span>
                      </div>
                    </button>
                    {selectedFaq === index && (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
