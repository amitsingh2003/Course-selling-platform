import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  Building,
  Globe,
  GraduationCap,
  Clock,
  Award,
  Heart,
  Target,
  Rocket,
  Check,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const section = document.querySelector(".about-section");
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  const impactStats = [
    { icon: Users, value: "100K+", label: "Active Learners" },
    { icon: BookOpen, value: "500+", label: "Courses" },
    { icon: Building, value: "12", label: "Global Offices" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="relative min-h-screen about-section">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 opacity-50" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section - Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex p-3 mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.div>

          <h1 className="text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Empowering Dreams Through Education
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Founded in 2020, EduPlatform emerged from a simple yet powerful
            vision: making quality education accessible to everyone, everywhere.
            What started as a small team of passionate educators has grown into
            a global community of learners and experts united by the goal of
            democratizing education.
          </p>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-purple-500 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To break down barriers to education by providing affordable,
                accessible, and high-quality learning experiences that empower
                individuals to achieve their full potential.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-pink-500 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To create a world where quality education knows no boundaries,
                enabling millions to transform their lives through learning and
                skill development.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          className="mb-24"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Our Global Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="relative group"
              >
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
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
          </div>
        </motion.div>

        {/* What Sets Us Apart */}
        <motion.div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Industry-Leading Expertise",
                description:
                  "Our courses are crafted and taught by recognized experts, ensuring you learn from the best in each field. Our instructors come from top companies like Google, Amazon, and Microsoft.",
                icon: Trophy,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Practical Learning Approach",
                description:
                  "Every course combines theoretical knowledge with real-world applications, featuring hands-on projects, case studies, and industry-relevant assignments.",
                icon: Target,
                gradient: "from-pink-500 to-purple-500",
              },
              {
                title: "Career Support",
                description:
                  "Beyond courses, we offer career guidance, resume reviews, interview preparation, and direct connections to industry opportunities through our partner network.",
                icon: Briefcase,
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                title: "Flexible Learning",
                description:
                  "Learn at your own pace with lifetime access to course materials, mobile-friendly content, and downloadable resources for offline learning.",
                icon: Clock,
                gradient: "from-purple-500 to-indigo-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-sm"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Global Presence */}
        <motion.div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Our Global Presence
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "San Francisco",
                country: "United States",
                role: "Global Headquarters",
                team: "150+ employees",
              },
              {
                city: "London",
                country: "United Kingdom",
                role: "European Hub",
                team: "100+ employees",
              },
              {
                city: "Singapore",
                country: "Singapore",
                role: "Asia Pacific Center",
                team: "80+ employees",
              },
            ].map((office, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-sm"
              >
                <MapPin className="w-6 h-6 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {office.city}, {office.country}
                </h3>
                <p className="text-purple-500 font-medium mb-2">
                  {office.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {office.team}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Journey Timeline */}
        <motion.div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Our Journey
          </h2>
          <div className="space-y-12">
            {[
              {
                year: "2020",
                title: "The Beginning",
                description:
                  "Started with a team of 5 passionate educators and 10 courses",
              },
              {
                year: "2021",
                title: "Rapid Growth",
                description:
                  "Expanded to 100+ courses and reached 50,000 students globally",
              },
              {
                year: "2022",
                title: "Global Expansion",
                description:
                  "Opened offices in 5 countries and launched enterprise solutions",
              },
              {
                year: "2023",
                title: "Innovation Leader",
                description:
                  "Introduced AI-powered learning paths and mobile learning solutions",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-24">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-center font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our global community of learners and start your journey towards
            success today.
          </p>
          <Link
            to="/Course"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Learning Now
            <Rocket className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
