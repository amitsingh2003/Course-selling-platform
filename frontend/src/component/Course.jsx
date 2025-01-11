import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  
  Trophy,
  Brain,
} from "lucide-react";

import Card from "./Card";

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5001/book");
        const freeCourses = res.data.filter((data) => data.category === "free");
        setCourses(freeCourses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const scroll = (direction) => {
    const container = document.getElementById("course-container");
    // Adjust scroll amount to match card width plus gap
    const scrollAmount =
      direction === "left"
        ? -(container.offsetWidth / 3)
        : container.offsetWidth / 3;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 transition-colors duration-300">
      <motion.div
        className="max-w-screen-2xl mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header and Stats sections remain the same */}
        {/* ... */}

        {/* Courses Scroll Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Scroll Buttons */}
            {showLeftScroll && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 
                         dark:bg-gray-800/80 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            {showRightScroll && (
              <button
                onClick={() => scroll("right")}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 
                         dark:bg-gray-800/80 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: BookOpen,
                  title: "Popular Courses",
                  desc: "Trending tech skills & certifications",
                },
                {
                  icon: Brain,
                  title: "Learn Anywhere",
                  desc: "Access content on any device",
                },
                {
                  icon: Trophy,
                  title: "Get Certified",
                  desc: "Industry-recognized credentials",
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-lg 
                         hover:shadow-[0_0_30px_rgba(219,39,119,0.2)] transform hover:-translate-y-2 transition-all duration-300
                         border border-gray-200 dark:border-gray-700/50 hover:border-pink-500/50"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <Icon className="w-10 h-10 text-pink-500 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
            {/* Course Container with Smooth Scroll */}
            <div
              id="course-container"
              className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 
                       scrollbar-none hover:scrollbar-thin hover:scrollbar-track-transparent 
                       hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-600"
              onScroll={handleScroll}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-[calc(33.333%-1.33rem)] w-[calc(33.333%-1.33rem)] snap-start snap-always"
                >
                  <Card course={course} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CourseSection;
