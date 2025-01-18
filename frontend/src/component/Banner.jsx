import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Target,
  Trophy,
  Search,
  MessageSquare,
} from "lucide-react";
import Chatbot from "./Chatbot";


const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setIsChatOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatOpen]);

  const handleCourseNavigation = (e) => {
    e.preventDefault();
    window.location.href = "/Course";
  };

  const statsData = [
    { icon: BookOpen, label: "1000+ Courses", color: "text-blue-500" },
    { icon: Target, label: "24/7 Support", color: "text-green-500" },
    { icon: Trophy, label: "Career Ready", color: "text-purple-500" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden mt-16">
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-16">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full hover:scale-105 transition-transform duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-semibold">
                    Transforming Education
                  </span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Learn
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    {" "}
                    Anything{" "}
                  </span>
                  Anywhere
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Unlock your potential with our cutting-edge learning platform.
                  Master new skills, achieve your goals, and shape your future.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <div
                  className={`relative transition-all duration-300 ${
                    isSearchFocused ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for courses, topics, or skills..."
                    className="w-full px-8 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 transition-all duration-300 pr-16"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/Course"
                  onClick={handleCourseNavigation}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:border-pink-500 dark:hover:border-pink-500 transition-all duration-300 hover:scale-105 active:scale-95">
                  View Demo
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  Ask AI
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur-3xl opacity-20">
                  <div className="w-full h-full animate-pulse" />
                </div>
                <img
                  src="/banner.png"
                  alt="E-Learning Platform"
                  className="relative w-full h-auto transform hover:scale-105 transition-transform duration-300 md:block hidden"
                />

                <div className="absolute -right-8 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl animate-bounce md:block hidden">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Banner;
