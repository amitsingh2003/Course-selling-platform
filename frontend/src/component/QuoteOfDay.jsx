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
import toast from "react-hot-toast";

const QuoteOfDay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const FALLBACK_QUOTES = [
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
  ];

  const fetchQuote = async () => {
    setLoading(true);
    setIsVisible(false);
    try {
      const response = await fetch("https://qapi.vercel.app/api/random");
      if (!response.ok) throw new Error("Failed to fetch quote");
      const data = await response.json();
      setQuote(data);
      setTimeout(() => setIsVisible(true), 100);
    } catch (err) {
      console.error("Error fetching quote:", err);
      const fallbackQuote =
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setQuote(fallbackQuote);
      toast.error("Using a local quote instead");
      setTimeout(() => setIsVisible(true), 100);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleCopy = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
      setCopied(true);
      toast.success("Quote copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-500/20 rounded-full animate-pulse delay-700" />
      </div>

      {/* Main quote card */}
      <div
        className={`relative max-w-2xl w-full transition-all duration-1000 transform 
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="relative group">
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-shift" />

          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl transition-all duration-300">
            {/* Quote icon with animated sparkles */}
            <div className="absolute -top-6 -left-6 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
              <Quote className="w-6 h-6 text-white animate-pulse" />
              <Sparkles className="absolute top-1 right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
            </div>

            {/* Quote text with animated reveal */}
            <div className="mt-6 mb-8">
              <blockquote className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 leading-relaxed animate-gradient-text">
                "{quote.quote}"
              </blockquote>
            </div>

            {/* Author and actions section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xl font-medium text-gray-800 dark:text-white">
                - {quote.author}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setLiked(!liked);
                    if (!liked) toast.success("Quote liked!");
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110"
                >
                  <Heart
                    className={`w-6 h-6 transition-all duration-300 ${
                      liked
                        ? "fill-pink-500 text-pink-500 scale-110"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110"
                >
                  <Copy
                    className={`w-6 h-6 transition-all duration-300 ${
                      copied ? "text-blue-500 scale-110" : "text-gray-400"
                    }`}
                  />
                </button>

                <button
                  onClick={fetchQuote}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110"
                >
                  <RefreshCw className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfDay;
