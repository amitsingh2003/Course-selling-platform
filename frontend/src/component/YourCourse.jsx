import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlayCircle,
  Award,
  Clock,
  BarChart,
  BookOpen,
  Star,
  Calendar,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Footer from "./Footer";

const YourCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    const purchasedCourses = JSON.parse(
      localStorage.getItem("purchasedCourses") || "[]"
    );
    setCourses(purchasedCourses);
  }, []);

  const stats = {
    totalCourses: courses.length,
    inProgress: courses.filter((c) => c.progress > 0 && c.progress < 100)
      .length,
    completed: courses.filter((c) => c.progress === 100).length,
    totalHours: courses.reduce((acc, curr) => acc + (curr.duration || 8), 0),
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === "inProgress")
      return course.progress > 0 && course.progress < 100;
    if (filter === "completed") return course.progress === 100;
    return true;
  });

  return (
    <>
      <Nav />
      <div
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 mt-16 
                      transition-colors duration-500"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent 
                           bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                           animate-gradient"
              >
                My Learning Journey
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Track your progress and continue your educational adventure
              </p>
            </motion.div>

            {/* Stats Section */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                  <StatsCard
                    icon={<BookOpen className="w-6 h-6" />}
                    title="Total Courses"
                    value={stats.totalCourses}
                    color="from-pink-500 to-pink-600"
                  />
                  <StatsCard
                    icon={<Clock className="w-6 h-6" />}
                    title="In Progress"
                    value={stats.inProgress}
                    color="from-purple-500 to-purple-600"
                  />
                  <StatsCard
                    icon={<CheckCircle2 className="w-6 h-6" />}
                    title="Completed"
                    value={stats.completed}
                    color="from-blue-500 to-blue-600"
                  />
                  <StatsCard
                    icon={<Trophy className="w-6 h-6" />}
                    title="Total Hours"
                    value={`${stats.totalHours}h`}
                    color="from-indigo-500 to-indigo-600"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <FilterButton
                active={filter === "all"}
                onClick={() => setFilter("all")}
                icon={<BookOpen className="w-4 h-4" />}
                label="All Courses"
              />
              <FilterButton
                active={filter === "inProgress"}
                onClick={() => setFilter("inProgress")}
                icon={<Clock className="w-4 h-4" />}
                label="In Progress"
              />
              <FilterButton
                active={filter === "completed"}
                onClick={() => setFilter("completed")}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Completed"
              />
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl 
                                  transform hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex justify-between items-center text-white">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {course.duration || "8 weeks"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {course.startDate || "Flexible"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="px-3 py-1 text-xs font-medium text-pink-600 bg-pink-100 
                                         dark:text-pink-400 dark:bg-pink-900/30 rounded-full"
                          >
                            {course.category || "Development"}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {course.rating || "4.8"}
                            </span>
                          </div>
                        </div>

                        <h3
                          className="text-xl font-bold text-gray-900 dark:text-white mb-3 
                                     line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 
                                     transition-colors duration-200"
                        >
                          {course.name}
                        </h3>

                        {/* Progress Section */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {course.progress}% Complete
                            </span>
                            {course.progress === 100 && (
                              <span className="flex items-center gap-1 text-sm text-green-500">
                                <Award className="w-4 h-4" />
                                Completed
                              </span>
                            )}
                          </div>
                          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </div>

                        {/* Course Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 
                                          flex items-center justify-center"
                            >
                              <PlayCircle className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                            </div>
                            <span>{course.lessons || "12"} lessons</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 
                                          flex items-center justify-center"
                            >
                              <BarChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span>{course.level || "Beginner"}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 
                                     hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl
                                     transform hover:scale-105 transition-all duration-200 shadow-lg 
                                     hover:shadow-pink-500/25"
                          >
                            {course.progress === 0
                              ? "Start Course"
                              : "Continue Learning"}
                          </button>
                          {course.progress === 100 &&
                            !course.certificateEarned && (
                              <button
                                onClick={() => {
                                  const updatedCourses = courses.map((c) =>
                                    c.id === course.id
                                      ? { ...c, certificateEarned: true }
                                      : c
                                  );
                                  setCourses(updatedCourses);
                                  localStorage.setItem(
                                    "purchasedCourses",
                                    JSON.stringify(updatedCourses)
                                  );
                                }}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 
                                       hover:from-green-600 hover:to-emerald-600 text-white font-medium px-4 
                                       py-2.5 rounded-xl transform hover:scale-105 transition-all duration-200 
                                       shadow-lg hover:shadow-green-500/25"
                              >
                                <Award className="w-4 h-4" />
                                Claim Certificate
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState filter={filter} navigate={navigate} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const StatsCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} 
                      flex items-center justify-center text-white`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const FilterButton = ({ active, onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${
                  active
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                }`}
  >
    {icon}
    {label}
  </motion.button>
);

const EmptyState = ({ filter, navigate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div
      className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 
                    rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <PlayCircle className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      No courses found
    </h2>
    <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
      {filter === "all"
        ? "Start your learning journey by exploring our courses."
        : filter === "inProgress"
        ? "You don't have any courses in progress yet."
        : "Complete your first course to see it here!"}
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/course")}
      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 
                 hover:to-purple-600 text-white font-medium px-8 py-4 rounded-xl
                 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
    >
      Explore Courses
    </motion.button>
  </motion.div>
);

export default YourCourse;
