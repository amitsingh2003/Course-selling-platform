import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Award,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import Card from "./Card";
import AOS from "aos";
import "aos/dist/aos.css";

const NumberCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const nextCount = Math.min(
          end,
          Math.floor((progress / duration) * end)
        );
        setCount(nextCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const EnhancedCoursePaid = () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const controls = useAnimation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://course-selling-platform-b.onrender.com/book"
        );
        const data = await res.json();
        setBook(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
    controls.start({ opacity: 1 });
  }, [controls]);

  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: book.length || 16,
      color: "text-pink-500",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      icon: GraduationCap,
      label: "Total Students",
      value: 10000,
      color: "text-purple-500",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Award,
      label: "Certification",
      value: 100,
      suffix: "%",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-pink-500",
    },
  ];

  const courseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute transform animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1,
            }}
          >
            <div
              className={`w-32 h-32 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 blur-xl`}
            />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-down">
          <motion.div
            className="flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-pink-500 w-8 h-8 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Premium Courses
            </h1>
            <Sparkles className="text-pink-500 w-8 h-8 animate-pulse" />
          </motion.div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Unlock your potential with our premium courses. Expert-led
            tutorials, hands-on projects, and industry-recognized
            certifications.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 
                           shadow-xl backdrop-blur-sm transition-all duration-300"
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mb-4`} />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  <NumberCounter
                    end={stat.value}
                    duration={2500}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <motion.div
            variants={courseVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {book.slice(0, visibleCourses).map((item, index) => (
              <motion.div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                className="transform perspective-1000"
              >
                <Card course={item} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {visibleCourses < book.length && (
          <motion.div
            className="flex justify-center mt-12"
            data-aos="fade-up"
            whileHover={{ scale: 1.05 }}
          >
            <button
              onClick={() => setVisibleCourses((prev) => prev + 6)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl
                       transform transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Load More Courses
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EnhancedCoursePaid;
