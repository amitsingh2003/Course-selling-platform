import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import Course from "./Course";
import AOS from "aos";
import "aos/dist/aos.css";

function CourseDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const course = state?.course;
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <Award className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Course not found!
          </p>
        </div>
      </div>
    );
  }

  const topics = [
    {
      title: "Introduction to Course",
      duration: "2 hours",
      subTopics: ["Overview", "Goals", "Structure"],
      completed: true,
    },
    {
      title: "Advanced Techniques",
      duration: "4 hours",
      subTopics: ["Technique 1", "Technique 2", "Technique 3"],
      completed: false,
    },
    {
      title: "Project Work",
      duration: "6 hours",
      subTopics: ["Project Setup", "Execution", "Review"],
      completed: false,
    },
  ];

  const reviews = [
    {
      name: "Nikhil Vidyarthi",
      review: "This course was amazing and very informative!",
      rating: 5,
      date: "2 weeks ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil",
    },
    {
      name: "Shabir Abbas",
      review: "I loved the teaching style and detailed explanations.",
      rating: 4.5,
      date: "1 month ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shabir",
    },
    {
      name: "Aaditya Gauhaukar",
      review: "Helped me improve my skills significantly.",
      rating: 5,
      date: "2 months ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aaditya",
    },
  ];

  const handleBuyNow = () => {
    navigate(`/purchase/${course.id}`, { state: { course } });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Course Info */}
              <div className="flex-1 space-y-6" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">{course.category}</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  {course.name}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Master the art of {course.category} with our comprehensive
                  course designed for all skill levels.
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>12 weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    <span>50+ lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />{" "}
                    {/* Changed from Certificate */}
                    <span>Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    ${course.price}
                  </span>
                  <button
                    onClick={handleBuyNow}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Enroll Now
                  </button>
                </div>
              </div>

              {/* Course Preview */}
              <div className="flex-1 relative" data-aos="fade-left">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-pink-600 text-white transform group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Course Content */}
          <div className="mb-16">
            <h2
              className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
              data-aos="fade-up"
            >
              Course Content
            </h2>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
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
                      {topic.completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          ✓
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                          {index + 1}
                        </div>
                      )}
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {topic.duration}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        activeTopic === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeTopic === index && (
                    <div className="px-6 pb-4 space-y-2">
                      {topic.subTopics.map((subTopic, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-2"
                        >
                          <PlayCircle className="w-4 h-4 text-pink-500" />
                          <span>{subTopic}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Section */}
          <div className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative overflow-hidden">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/teacher-teaching-in-class-6586910-5503720.png"
                    alt="Instructor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    Meet Your Instructor
                  </h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-pink-500" />
                      <span>10,000+ students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-pink-500" />
                      <span>5+ years experience</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Expert instructor with years of industry experience in{" "}
                    {course.category}. Passionate about teaching and helping
                    students achieve their learning goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Student Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default CourseDetail;
