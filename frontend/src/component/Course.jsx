import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Brain,
  Sparkles,
  Rocket,
  Target,
  ArrowRight,
  GraduationCap,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import Card from "./Card";

const EnhancedCourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".course-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://course-selling-platform-b.onrender.com/book");
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
    const scrollAmount =
      direction === "left"
        ? -(container.offsetWidth / 2)
        : container.offsetWidth / 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const stats = [
    { icon: Users, value: "10K+", label: "Active Learners" },
    { icon: Clock, value: "100+", label: "Hours of Content" },
    { icon: Award, value: "50+", label: "Expert Instructors" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden course-section">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 opacity-40" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              background: `linear-gradient(${
                120 + i * 60
              }deg, #e879f9, #8b5cf6)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -20,
            rotateX: isVisible ? 0 : -20,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="text-center mb-16 relative perspective-1000"
        >
          <motion.div
            initial={{ scale: 0, rotateZ: -180 }}
            animate={{
              scale: isVisible ? 1 : 0,
              rotateZ: isVisible ? 0 : -180,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.2,
            }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 inline-flex p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-lg"
          >
            <Star className="w-4 h-4 text-white animate-pulse" />
          </motion.div>

          <motion.h2
            className="text-6xl font-bold mb-4"
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Free Courses
            </span>
          </motion.h2>
          <motion.p
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            Embark on a transformative learning journey with our expertly
            crafted free courses
          </motion.p>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section with 3D Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {[
            {
              icon: Rocket,
              title: "Accelerated Learning",
              desc: "Master new skills with our proven fast-track methodology",
              gradient: "from-blue-500 via-indigo-500 to-purple-500",
            },
            {
              icon: Target,
              title: "Structured Progress",
              desc: "Follow a clear roadmap with milestone achievements",
              gradient: "from-purple-500 via-pink-500 to-rose-500",
            },
            {
              icon: Trophy,
              title: "Industry Recognition",
              desc: "Earn certificates valued by top employers",
              gradient: "from-amber-500 via-orange-500 to-red-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, rotateX: -30 },
                visible: { opacity: 1, y: 0, rotateX: 0 },
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              className="relative group perspective-1000"
            >
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 transform-gpu preserve-3d">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {feature.desc}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeFeature === index ? 1 : 0 }}
                  style={{
                    background: `linear-gradient(to right, ${feature.gradient})`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Courses Section with Enhanced Loading State */}
        {isLoading ? (
          <motion.div
            className="flex flex-col items-center justify-center h-64 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
              }}
              className="relative w-16 h-16"
            >
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
              <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-ping opacity-30" />
            </motion.div>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse font-medium">
              Preparing your learning journey...
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative group"
          >
            {/* Enhanced Scroll Buttons */}
            <AnimatePresence>
              {showLeftScroll && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => scroll("left")}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/90 
                           dark:bg-gray-800/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 
                           transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}
              {showRightScroll && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => scroll("right")}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/90 
                           dark:bg-gray-800/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 
                           transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Enhanced Course Cards Container */}
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
              <AnimatePresence mode="wait">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    className="min-w-[calc(33.333%-1.33rem)] w-[calc(33.333%-1.33rem)] snap-start snap-always perspective-1000"
                    initial={{ opacity: 0, y: 30, rotateX: -20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                      },
                    }}
                    whileHover={{
                      scale: 1.03,
                      rotateY: 5,
                      z: 50,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      },
                    }}
                  >
                    <Card course={course} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
};

export default EnhancedCourseSection;
