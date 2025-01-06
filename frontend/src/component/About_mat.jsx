import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function About_mat() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-6 mt-16 dark:bg-slate-900 ">
        <div className="max-w-7xl mx-auto">
          {/* Header Section with Scroll Animation */}
          <div className="text-center mb-16" data-aos="fade-up">
            {/* Title */}
            <h2 className="text-5xl font-extrabold text-pink-500">
              Welcome to Our World of Learning
            </h2>

            {/* Subsection with Image and Description */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Left: About the Platform */}
              <div className="text-left max-w-lg">
                <h3 className="text-3xl font-bold text-gray-700 dark:text-white"></h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Necessitatibus suscipit est quo maxime delectus magnam
                  corrupti excepturi libero! Deserunt ab eos rerum provident
                  quidem tempora mollitia magni placeat repudiandae
                  obcaecati.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Necessitatibus suscipit est quo maxime delectus magnam
                  corrupti excepturi libero.
                </p>
              </div>

              {/* Right: Image */}
              <div>
                <img
                  src="https://www.pngarts.com/files/7/Online-Education-PNG-Transparent-Image.png"
                  alt="Learning Illustration"
                  className="w-full max-w-sm  p-0 m-0"
                />
              </div>
            </div>
          </div>

          {/* Features Section with Scroll Animation */}
          <div className="grid grid-cols-1  mb-16">
            {/* First Feature (Content on Right, Image on Left) */}
            <div
              className="  p-8 rounded-xl  text-center flex flex-col md:flex-row items-center"
              data-aos="zoom-in"
            >
              {/* Image on Left */}
              <div className="w-full md:w-1/2">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/student-studying-on-laptop-while-sitting-on-big-books-5711045-4779537.png"
                  alt="High-Quality Education"
                  className="w-full max-w-sm p-0 m-0"
                />
              </div>

              {/* Content on Right */}
              <div className="text-left w-full md:w-1/2 mt-1 md:mt-0">
                <h3 className="text-7xl font-semibold text-pink-500">
                  High Quality Education
                </h3>
                <p className="mt-2 text-gray-500 text-1xl  dark:text-white">
                  Learn from top instructors with a focus on quality and
                  expertise.
                </p>
              </div>
            </div>

            {/* Second Feature (Image on Right, Content on Left) */}
            <div
              className="p-8 rounded-xl  text-center flex flex-col-reverse md:flex-row-reverse items-center"
              data-aos="zoom-in"
            >
              {/* Image on Right */}
              <div className="w-full md:w-1/2">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/schoolgirl-learning-from-online-teacher-7572460-6174900.png"
                  alt="Expert Educators"
                  className="w-full max-w-sm p-0 m-0"
                />
              </div>

              {/* Content on Left */}
              <div className="text-left w-full md:w-1/2 mt-1 md:mt-0">
                <h3 className="text-7xl font-semibold text-pink-500">
                  Expert Educators
                </h3>
                <p className="mt-2 text-gray-500 text-1xl dark:text-white">
                  Our educators are pioneers in their fields, ready to guide
                  you.
                </p>
              </div>
            </div>

            {/* Third Feature (Content on Right, Image on Left) */}
            <div
              className=" p-8 rounded-xl  text-center flex flex-col md:flex-row items-center"
              data-aos="zoom-in"
            >
              {/* Image on Left */}
              <div className="w-full md:w-1/2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/312/916/original/student-showing-thumbs-up-3d-illustration-chartoon-character-cute-boy-png.png"
                  alt="Student-Centered Learning"
                  className="w-full max-w-sm p-0 m-0"
                />
              </div>

              {/* Content on Right */}
              <div className="text-left w-full md:w-1/2 mt-1 md:mt-0">
                <h3 className="text-6xl font-semibold text-pink-500">
                  Student Centered Learning
                </h3>
                <p className="mt-2 text-gray-500 text-1xl  dark:text-white">
                  We prioritize student success with interactive and practical
                  learning.
                </p>
              </div>
            </div>
          </div>

          {/* Educators Section with Scroll Animation */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-extrabold text-pink-500 mb-8">
              Meet Our Top Educators
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Educator 1 */}
              <div
                className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-xl shadow-xl text-center transform transition-all hover:scale-105 neomorphism"
                data-aos="flip-left"
              >
                <img
                  src="https://th.bing.com/th/id/OIP.k3ZfVJqxkc64MlyWaJp5JAHaHa?rs=1&pid=ImgDetMain"
                  alt="John Doe"
                  className="w-32 h-32 rounded-full mx-auto transition-all duration-500 transform hover:scale-110"
                />
                <h3 className="text-xl font-semibold mt-4 text-pink-500">
                  John Doe
                </h3>
                <p className="text-gray-300">Digital Marketing Expert</p>
              </div>
              {/* Educator 2 */}
              <div
                className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-xl shadow-xl text-center transform transition-all hover:scale-105 neomorphism"
                data-aos="flip-left"
              >
                <img
                  src="https://th.bing.com/th/id/R.23a8b92e408d77554077f39acf8a9a01?rik=mHY4QSDf8Bq48w&riu=http%3a%2f%2fww1.prweb.com%2fprfiles%2f2018%2f06%2f19%2f15574951%2f16114837_10154855433134360_7166660686350361752_n.jpg&ehk=2lD5JqWRhnRO7t9gfJivP%2boK7B%2baodCm1knjm0ruEl0%3d&risl=&pid=ImgRaw&r=0"
                  alt="Jane Smith"
                  className="w-32 h-32 rounded-full mx-auto transition-all duration-500 transform hover:scale-110"
                />
                <h3 className="text-xl font-semibold mt-4 text-pink-500">
                  Jane Smith
                </h3>
                <p className="text-gray-300">Data Science Specialist</p>
              </div>
              {/* Educator 3 */}
              <div
                className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-xl shadow-xl text-center transform transition-all hover:scale-105 neomorphism"
                data-aos="flip-left"
              >
                <img
                  src="https://th.bing.com/th/id/OIP.H5THO9hrKv2Cc5CWQkIQRwHaHa?rs=1&pid=ImgDetMain"
                  alt="Emily Johnson"
                  className="w-32 h-32 rounded-full mx-auto transition-all duration-500 transform hover:scale-110"
                />
                <h3 className="text-xl font-semibold mt-4 text-pink-500">
                  Emily Johnson
                </h3>
                <p className="text-gray-300">Creative Writing Instructor</p>
              </div>
            </div>
          </div>

          {/* Ratings Section with Scroll Animation */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-extrabold text-pink-500">
              Student Ratings
            </h2>
            <div className="flex justify-center mt-8">
              <div className="flex items-center">
                <span className="text-2xl text-yellow-500">★★★★★</span>
                <span className="ml-2 text-xl text-gray-600">(4.9/5)</span>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-extrabold text-pink-500">
              Join Us Today!
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Start your learning journey with us and explore endless
              opportunities.
            </p>
            <Link
              to="/SignUp"
              className="mt-6 inline-block bg-pink-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all"
            >
              SignUp Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About_mat;
