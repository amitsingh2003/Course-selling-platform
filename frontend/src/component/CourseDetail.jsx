import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Star,
  User,
  PlayCircle,
  GraduationCap,
  Download,
  Globe,
  ShoppingCart,
  ChevronDown,
  Award,
  Users,
  Calendar,
  Check,
  Lock,
  BarChart,
  Book,
  MessageCircle,
  Share2,
  Bookmark,
  Heart,
  ThumbsUp,
  Coffee,
  Target,
  Layout,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import Nav from "./Nav";

const CourseDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const course = state?.course;
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <Award className="w-24 h-24 text-pink-500 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            Course Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            The course you're looking for might have been moved or doesn't
            exist.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-transparent border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            Browse Courses
          </button>
        </motion.div>
      </div>
    );
  }

  const courseStats = [
    { icon: <Users className="w-5 h-5" />, label: "Enrolled", value: "12,345" },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Duration",
      value: "12 weeks",
    },
    { icon: <Book className="w-5 h-5" />, label: "Lessons", value: "50+" },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Languages",
      value: "3",
    },

    {
      icon: <Target className="w-5 h-5" />,
      label: "Level",
      value: "All Levels",
    },
  ];

  const syllabus = [
    {
      title: "Getting Started",
      duration: "2 hours",
      lessons: [
        {
          title: "Course Overview",
          duration: "15 min",
          type: "video",
          free: true,
        },
        {
          title: "Setting Up Environment",
          duration: "30 min",
          type: "lab",
          free: true,
        },
        {
          title: "Basic Concepts",
          duration: "45 min",
          type: "video",
          free: false,
        },
      ],
    },
    {
      title: "Core Fundamentals",
      duration: "4 hours",
      lessons: [
        {
          title: "Key Principles",
          duration: "1 hour",
          type: "video",
          free: false,
        },
        {
          title: "Hands-on Practice",
          duration: "2 hours",
          type: "lab",
          free: false,
        },
        {
          title: "Real-world Examples",
          duration: "1 hour",
          type: "video",
          free: false,
        },
      ],
    },
  ];

  const learningOutcomes = [
    "Master fundamental concepts and principles",
    "Build real-world projects from scratch",
    "Learn industry best practices and patterns",
    "Gain practical problem-solving skills",
    "Understand advanced techniques and optimizations",
    "Develop professional-grade applications",
  ];

  const TabButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg transition-all duration-300 ${
        active
          ? "bg-pink-500 text-white shadow-lg"
          : "bg-transparent text-gray-600 hover:bg-pink-50"
      }`}
    >
      {children}
    </button>
  );

  const reviews = Array(6)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      user: `User ${index + 1}`,
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Great course! The instructor explains complex concepts in a way that's easy to understand. The practical examples were especially helpful.",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${index}`,
    }));

  return (
    <>
      <Nav></Nav>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-pink-500 z-50"
          style={{ scaleX: scrollProgress / 100 }}
        />

        {/* Hero Section */}
        <div className="relative pt-24 pb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Course Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {course.category}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.9 (2.3k reviews)
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  {course.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Master the art of {course.category} with our comprehensive
                  course designed for all skill levels.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-6"
                >
                  {courseStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    >
                      {stat.icon}
                      <span>{stat.value}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-6"
                >
                  <div className="space-y-1">
                    <span className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                      ${course.price}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      One-time payment
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/purchase/${course.id}`, { state: { course } });
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-pink-500/25 flex items-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Enroll Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-lg border ${
                      isBookmarked
                        ? "text-pink-500 border-pink-500"
                        : "text-gray-500 border-gray-300"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-lg border ${
                      isLiked
                        ? "text-pink-500 border-pink-500"
                        : "text-gray-500 border-gray-300"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Course Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative group"
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-pink-600 text-white"
                    >
                      <PlayCircle className="w-10 h-10" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Custom Tabs */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            {["content", "overview", "instructor", "reviews"].map((tab) => (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {syllabus.map((section, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <button
                        className="w-full px-6 py-4 flex items-center justify-between"
                        onClick={() =>
                          setActiveTopic(activeTopic === index ? null : index)
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {section.duration} • {section.lessons.length}{" "}
                              lessons
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeTopic === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeTopic === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-4 space-y-2"
                          >
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.type === "video" ? (
                                    <PlayCircle className="w-5 h-5 text-pink-500" />
                                  ) : (
                                    <Code className="w-5 h-5 text-blue-500" />
                                  )}
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {lesson.title}
                                  </span>
                                  {lesson.free && (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                                      Free
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {lesson.duration}
                                  </span>
                                  {!lesson.free && (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {learningOutcomes.map((outcome, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {outcome}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">
                      Course Description
                    </h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        This comprehensive course takes you from beginner to
                        advanced level in {course.category}. Through practical
                        examples, hands-on projects, and real-world
                        applications, you'll gain the skills needed to excel in
                        your career.
                      </p>
                      <h4 className="text-xl font-semibold mt-6 mb-3">
                        Prerequisites
                      </h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Basic understanding of programming concepts</li>
                        <li>Familiarity with web technologies</li>
                        <li>Desire to learn and practice</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "instructor" && (
                <motion.div
                  key="instructor"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-xl overflow-hidden aspect-square"
                      >
                        <img
                          src="/api/placeholder/400/400"
                          alt="Instructor"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Sarah Johnson
                        </h3>
                        <p className="text-pink-500 font-medium">
                          Senior Developer & Educator
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span className="font-medium">
                            4.9 Instructor Rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-pink-500" />
                          <span>10,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-5 h-5 text-pink-500" />
                          <span>15 Courses</span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        With over 10 years of industry experience and a passion
                        for teaching, Sarah has helped thousands of students
                        master complex technical concepts through her practical,
                        hands-on teaching approach.
                      </p>

                      <div className="flex gap-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <Share2 className="w-4 h-4" />
                          Share Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.user}</h4>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            Report
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed Bottom Bar for Mobile */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
        >
          <div>
            <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              ${course.price}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/purchase/${course.id}`, {
                state: { course },
              });
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Enroll Now
          </motion.button>
        </motion.div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CourseDetail;
