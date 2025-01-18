import React, { useState, useEffect } from "react";
import {
  Quote,
  Heart,
  Copy,
  Share2,
  RefreshCw,
  Bookmark,
  Sparkles,
} from "lucide-react";

const AdvancedQuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const FALLBACK_QUOTES = [
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Inspiration",
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      category: "Leadership",
    },
  ];

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) throw new Error();
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
        category: data.tags[0] || "Wisdom",
      });
    } catch {
      setQuote(
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${quote?.text}" - ${quote?.author}`);
    setCopied(true);
    showSuccessMessage();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Inspiring Quote",
        text: `"${quote?.text}" - ${quote?.author}`,
        url: window.location.href,
      });
    }
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="relative max-w-2xl mx-auto">
        {/* Success Message */}
        <div
          className={`absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
            showSuccess
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Copied to clipboard!</span>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Animated Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 rounded-2xl blur-lg  opacity-40 group-hover:opacity-70 transition duration-1000">
            
          </div>

          {/* Card Content */}
          <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 shadow-xl transition-all duration-300">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute  bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-sm rounded-full"></div>
                  <Quote className="w-6 h-6 text-white relative z-10" />
                </div>
                <span className=" bg-clip-text font-semibold text-slate-600  dark:text-white">
                  {quote.category}
                </span>
              </div>

              <button
                onClick={fetchQuote}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group/btn"
              >
                <RefreshCw className="w-5 h-5 text-gray-400 group-hover/btn:text-purple-500 transition-colors" />
              </button>
            </div>

            {/* Quote Text */}
            <div className="relative mb-8">
              <blockquote className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 leading-relaxed">
                "{quote.text}"
              </blockquote>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-lg font-medium  bg-clip-text text-slate-600  dark:text-white">
                - {quote.author}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group/like"
                >
                  <Heart
                    className={`w-5 h-5 transition-all text-slate-600  dark:text-white duration-300 ${
                      liked
                        ? "fill-pink-500 text-pink-500 scale-110"
                        : "text-gray-400 group-hover/like:text-pink-500"
                    }`}
                  />
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group/bookmark"
                >
                  <Bookmark
                    className={`w-5 h-5 transition-all text-slate-600  dark:text-white duration-300 ${
                      bookmarked
                        ? "fill-purple-500 text-purple-500 scale-110"
                        : "text-gray-400 group-hover/bookmark:text-purple-500"
                    }`}
                  />
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-gray-100  dark:hover:bg-gray-800 transition-all group/copy"
                >
                  <Copy
                    className={`w-5 h-5 transition-all text-slate-600  dark:text-white duration-300 ${
                      copied
                        ? "text-blue-500 scale-110"
                        : "text-gray-400 group-hover/copy:text-blue-500"
                    }`}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group/share"
                >
                  <Share2 className="w-5 h-5 text-slate-600 dark:text-white group-hover/share:text-purple-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedQuoteCard;
