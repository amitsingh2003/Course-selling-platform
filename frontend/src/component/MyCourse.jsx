import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import axios from "axios"; // Import axios for API calls

const MyCourses = () => {
  const [courses, setCourses] = useState([]); // State to store purchased courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch purchased courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://course-selling-platform-b.onrender.com/book"); // Replace with your API endpoint
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 py-10 dark:bg-slate-900">
        <h1 className="text-4xl font-extrabold text-pink-500 mb-8 text-center">
          My Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not purchased any courses yet.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-md rounded-lg p-4 dark:bg-slate-800"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-pink-500">
                  {course.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.title}
                </p>
                <p className="text-blue-600 font-medium mt-2">
                  ${course.price} - {course.category}
                </p>
                <button
                  className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700"
                  onClick={() => {
                    alert(`Launching ${course.name}!`);
                  }}
                >
                  Start Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;
