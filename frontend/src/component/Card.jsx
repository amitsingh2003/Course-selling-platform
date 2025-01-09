import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Star, Clock, DollarSign, ShoppingCart } from "lucide-react";

function Card({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${item.id}`, { state: { course: item } });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent card click event from triggering
    navigate(`/purchase/${item.id}`, { state: { course: item } });
  };

  return (
    <div className="p-4" onClick={handleCardClick}>
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-[0.2px] dark:border-slate-700">
        {/* Ribbon for bestseller or featured courses */}
        {item.isBestSeller && (
          <div className="absolute top-4 left-0 bg-pink-600 text-white py-1 px-4 text-sm font-medium rounded-r-lg z-10">
            Bestseller
          </div>
        )}

        {/* Image container with overlay on hover */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {item.duration || "8 weeks"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="badge bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {item.name}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
            {item.title}
          </p>

          {/* Course Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{item.lessons || "12"} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{item.rating || "4.8"}</span>
            </div>
          </div>

          {/* Price and Buy Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {item.price}
              </span>
            </div>
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;