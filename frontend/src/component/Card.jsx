import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  ShoppingCart,
  Trophy,
  TrendingUp,
} from "lucide-react";

const Card = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/purchase/${course.id}`, { state: { course } });
  };

  return (
    <motion.div
      className="p-4 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      <div
        className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                    transition-all duration-300 border border-gray-100 dark:border-gray-700"
      >
        {/* Bestseller Badge */}
        {course.isBestSeller && (
          <div className="absolute top-4 left-0 z-10">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-1 px-4 rounded-r-lg
                          flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Bestseller</span>
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden group">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-4 left-4 text-white space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {course.duration || "8 weeks"}
              </p>
              <p className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                {Math.floor(Math.random() * 500) + 100} enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Category & Level */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-600 
                         dark:bg-pink-900/30 dark:text-pink-400"
            >
              {course.category}
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 
                         dark:bg-purple-900/30 dark:text-purple-400"
            >
              {course.level || "Beginner"}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {course.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {course.title}
            </p>
          </div>

          {/* Course Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons || "12"} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{course.rating || "4.8"}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Trending</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {course.price ? `$${course.price}` : "Free"}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white 
                       px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Enroll Now</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
