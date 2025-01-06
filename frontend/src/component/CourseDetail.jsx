import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Course from "./Course";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

function CourseDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const course = state?.course;

  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    AOS.init(); // Initialize AOS when the component mounts
  }, []);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Course not found!</p>
      </div>
    );
  }

  const topics = [
    {
      title: "Introduction to Course",
      subTopics: ["Overview", "Goals", "Structure"],
    },
    {
      title: "Advanced Techniques",
      subTopics: ["Technique 1", "Technique 2", "Technique 3"],
    },
    {
      title: "Project Work",
      subTopics: ["Project Setup", "Execution", "Review"],
    },
  ];

  const reviews = [
    {
      name: "Nikhil Vidyarthi",
      review: "This course was amazing and very informative!",
    },
    {
      name: "Shabir Abbas",
      review: "I loved the teaching style and detailed explanations.",
    },
    {
      name: "Aaditya Gauhaukar",
      review: "Helped me improve my skills significantly.",
    },
  ];

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Course Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 items-center">
          {/* Right Section: Course Image */}
          <div
            className="order-1 lg:order-none flex-1 flex justify-center"
            data-aos="fade-left"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full max-w-md h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* Left Section: Course Details */}
          <div
            className="order-2 lg:order-none flex-1 text-center lg:text-left"
            data-aos="fade-right"
          >
            <h1 className="text-6xl font-bold mb-6 text-pink-500">
              {course.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6 dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus aliquid incidunt tenetur quis laboriosam pariatur.
              Nostrum ab vitae ratione, nemo rerum commodi vero voluptatum
              tempore beatae, error odit! Sint, vero! Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Temporibus aliquid incidunt
              tenetur quis laboriosam pariatur. Nostrum ab vitae ratione, nemo
              rerum commodi vero voluptatum tempore beatae, error odit! Sint,
              vero!
            </p>
            <p className="text-xl font-semibold mb-4">
              Category:{" "}
              <span className="text-2xl font-semibold mb-4 text-pink-500">
                {course.category}
              </span>
            </p>
            <p className="text-lg font-semibold text-green-600">
              Price: ${course.price}
            </p>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="mb-16">
          <h2
            className="text-4xl font-bold mb-8 text-pink-500"
            data-aos="zoom-in"
          >
            Topics Covered
          </h2>
          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-pink-500 transition-colors duration-300 shadow-md"
                onClick={() =>
                  setActiveTopic(activeTopic === index ? null : index)
                }
                data-aos="fade-up"
              >
                <h3 className="text-1xl font-bold text-gray-800 hover:text-white dark:text-white">
                  {topic.title}
                </h3>
                {activeTopic === index && (
                  <ul className="mt-4 ml-6 list-disc space-y-2">
                    {topic.subTopics.map((subTopic, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-gray-700 hover:text-white"
                      >
                        {subTopic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* About the Teacher */}
        <div className="mb-16 flex flex-col-reverse lg:flex-row gap-8 items-center">
          {/* Teacher Details */}
          <div
            className="flex-1 text-center lg:text-left"
            data-aos="fade-right"
          >
            <h2 className="text-4xl font-bold mb-6 text-pink-500">
              About the Teacher
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
              malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras
              venenatis euismod malesuada.
            </p>
          </div>
          {/* Teacher Image */}
          <div className="flex-1 flex justify-center" data-aos="fade-left">
            <img
              src="https://pngimg.com/uploads/teacher/teacher_PNG50.png"
              alt="Teacher"
              className="w-full max-w-sm h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Student Reviews */}
        <div>
          <h2
            className="text-4xl font-bold mb-8 text-pink-500"
            data-aos="zoom-in"
          >
            Student Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-6 shadow-md transition-transform duration-300 hover:scale-105"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-600">
                  {review.name}
                </h3>
                <p className="text-gray-700 dark:text-white">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Course />
      <Footer />
    </>
  );
}

export default CourseDetail;
