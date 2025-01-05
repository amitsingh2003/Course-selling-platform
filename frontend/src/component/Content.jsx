import React, { useState } from "react";
import {  toast }  from "react-hot-toast";


function Content() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success toast
    toast.success("Request Submitted Successfully!");

    // Clear form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 mt-16  dark:bg-slate-900">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8  dark:bg-slate-900 dark:text-slate-600">
        <h2 className="text-3xl font-bold text-pink-500 text-center mb-6">Contact Us</h2>
        <p className="text-gray-600  dark:text-white text-center mb-8">
          Have questions or need help? Fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-pink-500">Phone</h3>
              <p className="text-gray-600  dark:text-white">+1 (234) 567-890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-500">Email</h3>
              <p className="text-gray-600  dark:text-white">support@estore.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-500">Address</h3>
              <p className="text-gray-600  dark:text-white">123 E-Store Street, Tech City, 56789</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-800 font-medium  dark:text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium  dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-800 font-medium  dark:text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* Toast Container */}
     
    </div>
  );
}

export default Content;
