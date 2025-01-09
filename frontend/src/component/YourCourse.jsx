import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, Award, Clock, BarChart } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";

const YourCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all"); // all, inProgress, completed

  useEffect(() => {
    // Get purchased courses from localStorage (replace with your backend call)
    const purchasedCourses = JSON.parse(
      localStorage.getItem("purchasedCourses") || "[]"
    );
    setCourses(purchasedCourses);
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter === "inProgress")
      return course.progress > 0 && course.progress < 100;
    if (filter === "completed") return course.progress === 100;
    return true;
  });

  return (
    <>
    <Nav></Nav>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Learning
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress and continue learning
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "all"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setFilter("inProgress")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "inProgress"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "completed"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4">
                        <div className="text-white flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            {course.duration || "8 weeks"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.name}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mb-4">
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
                        <div
                          className="h-full bg-pink-600 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>{course.lessons || "12"} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart className="w-4 h-4" />
                        <span>{course.level || "Beginner"}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                      >
                        {course.progress === 0
                          ? "Start Course"
                          : "Continue Learning"}
                      </button>
                      {course.progress === 100 && !course.certificateEarned && (
                        <button
                          onClick={() => {
                            // Handle certificate claim
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
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          <Award className="w-4 h-4" />
                          Claim Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No courses found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {filter === "all"
                  ? "You haven't purchased any courses yet."
                  : filter === "inProgress"
                  ? "You don't have any courses in progress."
                  : "You haven't completed any courses yet."}
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Explore Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default YourCourse;
