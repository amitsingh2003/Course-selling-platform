import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  Clock,
  PlayCircle,
  GraduationCap,
  Download,
  Globe,
  ShoppingCart,
  ChevronDown,
  Award,
  Calendar,
  Check,
  Lock,
  BarChart,
  Book,
  MessageCircle,
  Share2,
  Bookmark,
  Heart,
  Coffee,
  Target,
  Layout,
  Code,
  Trophy,
  HelpCircle,
  Medal,
  Lightbulb,
  Timer,
  Gift,
  Circle,
  CheckCircle,
  BarChart2,
  Zap,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import Nav from "./Nav";
import {
  User,
  Users,
  UserCircle,
  UserCheck,
  Star,
  ThumbsUp,
} from "lucide-react";

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
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const videoRef = useRef(null);

  const courseStats = [
    {
      icon: <Users className="w-5 h-5  text-blue-500" />,
      label: "Enrolled",
      value: "12,345",
    },
    {
      icon: <Clock className="w-5 h-5 text-pink-500" />,
      label: "Duration",
      value: "12 weeks",
    },
    {
      icon: <Book className="w-5 h-5 text-yellow-500" />,
      label: "Lessons",
      value: "50+",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      label: "Languages",
      value: "3",
    },
    {
      icon: <Target className="w-5 h-5 text-green-500" />,
      label: "Level",
      value: "All Levels",
    },
  ];

  const learningOutcomes = [
    "Master fundamental concepts and best practices in software development",
    "Build real-world applications using modern technologies",
    "Implement secure and scalable solutions",
    "Write clean, maintainable, and efficient code",
    "Debug and troubleshoot common programming issues",
    "Work with databases and handle data effectively",
    "Understand design patterns and architectural principles",
    "Deploy applications to production environments",
    "Collaborate effectively using version control systems",
    "Apply test-driven development practices",
    "Optimize application performance",
    "Create responsive and user-friendly interfaces",
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

  // New achievement data
  const achievements = [
    {
      id: 1,
      title: "Quick Starter",
      icon: <Zap className="w-6 h-6" />,
      description: "Complete first 3 lessons within 24 hours",
      progress: 2,
      total: 3,
      reward: "Early Bird Badge",
    },
    {
      id: 2,
      title: "Code Warrior",
      icon: <Trophy className="w-6 h-6" />,
      description: "Submit 5 perfect assignments",
      progress: 3,
      total: 5,
      reward: "+50 XP Points",
    },
    {
      id: 3,
      title: "Discussion Champion",
      icon: <MessageCircle className="w-6 h-6" />,
      description: "Participate in 10 discussions",
      progress: 7,
      total: 10,
      reward: "Community Badge",
    },
  ];

  const reviews = [
    {
      user: "John Smith",
      icon: "User", // We'll use different Lucide icons for each user
      date: "2 weeks ago",
      rating: 5,
      comment:
        "This course exceeded my expectations. The content is well-structured and the instructor explains complex concepts in a very understandable way.",
    },
    {
      user: "Emma Wilson",
      icon: "Users",
      date: "1 month ago",
      rating: 4,
      comment:
        "Great course overall. The practical examples really helped cement my understanding. Would recommend to others looking to learn this subject.",
    },
    {
      user: "Michael Brown",
      icon: "UserCircle",
      date: "2 months ago",
      rating: 5,
      comment:
        "The instructor's teaching style is engaging and the course projects are very practical. I've already started applying what I learned in my work.",
    },
    {
      user: "Sarah Davis",
      icon: "User",
      date: "3 months ago",
      rating: 4,
      comment:
        "Very comprehensive course material. The hands-on exercises were particularly helpful in understanding the concepts.",
    },
    {
      user: "David Lee",
      icon: "UserCheck",
      date: "3 months ago",
      rating: 5,
      comment:
        "Outstanding course! The instructor's expertise really shines through. The pace was perfect and the content was up-to-date.",
    },
    {
      user: "Lisa Anderson",
      icon: "UserCircle",
      date: "4 months ago",
      rating: 4,
      comment:
        "Well-structured content with good examples. Would have loved more advanced topics, but overall a solid foundation course.",
    },
  ];

  // Weekly challenges
  const weeklyChallenges = [
    {
      id: 1,
      title: "Speed Learning",
      description: "Complete 3 lessons in one day",
      reward: "100 XP",
      deadline: "2 days left",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% in next quiz",
      reward: "Achievement Badge",
      deadline: "5 days left",
      difficulty: "Medium",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "What are the prerequisites for this course?",
      answer:
        "Basic understanding of programming concepts and familiarity with web technologies is recommended. However, we provide additional resources for complete beginners.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.",
    },
    {
      question: "How long do I have access to the course?",
      answer:
        "Once enrolled, you have lifetime access to the course content including all future updates.",
    },
    {
      question: "Are there any live sessions?",
      answer:
        "Yes, we conduct weekly live Q&A sessions and monthly masterclasses with industry experts.",
    },
  ];

  // Learning path progress
  const learningPath = [
    { id: 1, title: "Fundamentals", completed: true },
    { id: 2, title: "Advanced Concepts", completed: true },
    { id: 3, title: "Real-world Projects", completed: false },
    { id: 4, title: "Expert Techniques", completed: false },
  ];

  // Add new section to render achievements
  const renderAchievements = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-purple-500" />
        <span className="text-2xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {" "}
          Achievements & Rewards
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-white">
                {achievement.icon}
              </div>
              <h4 className="text-xl text-slate-600 dark:text-white">
                {achievement.title}
              </h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {achievement.description}
            </p>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (achievement.progress / achievement.total) * 100
                    }%`,
                  }}
                  className="h-full bg-pink-500"
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {achievement.progress}/{achievement.total}
                </span>
                <span className="text-pink-500">{achievement.reward}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Add new section to render learning path
  const renderLearningPath = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart2 className="w-6 h-6 text-pink-500" />
        <span className="text-2xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {" "}
          Learning Path Progress{" "}
        </span>
      </h3>
      <div className="relative">
        {learningPath.map((step, index) => (
          <div key={step.id} className="flex items-center mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div className="ml-4">
              <h4 className="font-medium">{step.title}</h4>
              {index < learningPath.length - 1 && (
                <div className="absolute left-4 ml-[-0.5px] w-0.5 h-8 bg-gray-300 dark:bg-gray-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Add new section to render weekly challenges
  const renderWeeklyChallenges = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-green-500" />
        <span className="text-3xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {" "}
          Weekly Challenges{" "}
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weeklyChallenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-slate-600 dark:text-white ">
                {challenge.title}
              </h4>
              <span className="px-2 py-1 text-xs rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {challenge.description}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-pink-500">{challenge.reward}</span>
              <span className="text-gray-500">{challenge.deadline}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Add new section to render FAQs
  const renderFaqs = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-purple-500" />
        <span className="text-3xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {" "}
          Frequently Asked Questions{" "}
        </span>
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between"
              onClick={() =>
                setSelectedFaq(selectedFaq === index ? null : index)
              }
            >
              <span className="font-medium">{faq.question}</span>
              <motion.div
                animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {selectedFaq === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

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

  // Error handling for missing course data
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

  const TabButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg transition-all duration-300 ${
        active
          ? "text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400"
          : "bg-transparent text-gray-600 hover:text-pink-500 hover:scale-105"
      }`}
    >
      {children}
    </button>
  );

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      toast.success("Added to Bookmarked");
    } else {
      toast.success("Removed from Bookmarked");
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      toast.success("Added to Favorites");
    } else {
      toast.success("Removed from Favorites");
    }
  };

  // Modify the existing return statement to include new sections
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <div className="space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                >
                  {course.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-500">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {course.category}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    4.9 (2.3k reviews)
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Master the art of {course.name} with our comprehensive course
                  designed for all skill levels.
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
                    <span className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                      ${course.price}
                    </span>
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
                    onClick={handleBookmarkClick}
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
                    onClick={handleLikeClick}
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
                    className=" transition-transform duration-500 group-hover:scale-105"
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
          {/* Modified tabs to include new sections */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2  ">
            {[
              "content",
              "overview",
              "achievements",
              "challenges",
              "instructor",
              "reviews",
              "faq",
            ].map((tab) => (
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
            <AnimatePresence mode="sync">
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
                            <h3 className="text-xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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
                    <h3 className="text-2xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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
                    <h3 className="text-2xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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

                      <h4 className="text-2xl font-extrabold mt-5 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        Key Features
                      </h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>
                          Comprehensive curriculum covering both basics and
                          advanced topics
                        </li>
                        <li>Hands-on projects and real-world applications</li>
                        <li>Interactive coding exercises and challenges</li>
                        <li>Regular updates to keep content current</li>
                        <li>24/7 support community access</li>
                      </ul>

                      <h4 className="text-2xl font-extrabold mt-5 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        Prerequisites
                      </h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Basic understanding of programming concepts</li>
                        <li>Familiarity with web technologies</li>
                        <li>A computer with internet access</li>
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
                          src="https://cdn.dribbble.com/users/323673/screenshots/14147317/media/0eff5aa671929d1bcc3e9338193e5b15.png"
                          alt="Instructor"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-6">
                      <div>
                        <h3 className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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
                        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 ">
                          <MessageCircle className="w-4 h-4 text-pink-500" />
                          Message
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <Share2 className="w-4 h-4 text-pink-500" />
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
                          <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            {/* Dynamically render the appropriate Lucide icon */}
                            {review.icon === "User" && (
                              <User className="w-6 h-6 text-pink-600" />
                            )}
                            {review.icon === "Users" && (
                              <Users className="w-6 h-6 text-pink-600" />
                            )}
                            {review.icon === "UserCircle" && (
                              <UserCircle className="w-6 h-6 text-pink-600" />
                            )}
                            {review.icon === "UserCheck" && (
                              <UserCheck className="w-6 h-6 text-pink-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                              {review.user}
                            </h4>
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
                            <ThumbsUp className="w-4 h-4 text-pink-500" />
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

              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {renderLearningPath()}
                  {renderAchievements()}
                </motion.div>
              )}

              {activeTab === "challenges" && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderWeeklyChallenges()}
                </motion.div>
              )}

              {activeTab === "faq" && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderFaqs()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
      <Footer />
    </>
  );
};

export default CourseDetail;
