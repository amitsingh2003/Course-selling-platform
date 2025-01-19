import React, { useState, useEffect } from "react";
import {
  Quote,
  Heart,
  Copy,
  Share2,
  RefreshCw,
  Bookmark,
  Sparkles,
  Send,
  MessageCircle,
  ThumbsUp,
  Star,
} from "lucide-react";

const QuoteOfDay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userThought, setUserThought] = useState("");
  const [showThoughtInput, setShowThoughtInput] = useState(false);
  const [thoughts, setThoughts] = useState([]);
  const [reaction, setReaction] = useState('');

  const FALLBACK_QUOTES = [
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
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
      const fallbackQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setQuote(fallbackQuote);
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
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const handleAddThought = () => {
    if (userThought.trim()) {
      setThoughts([...thoughts, { text: userThought, likes: 0 }]);
      setUserThought("");
      setShowThoughtInput(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="relative">
          <RefreshCw className="w-12 h-12 text-purple-500 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[600px] perspective-1000">
      {/* 3D Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Main Quote Card with 3D Transform */}
      <div className={`relative max-w-3xl mx-auto transform-gpu transition-all duration-1000 
        ${isVisible ? "translate-y-0 opacity-100 rotate-y-0" : "translate-y-10 opacity-0 rotate-y-180"}`}>
        
        {/* Glass Card Effect */}
        <div className="relative group hover:transform hover:rotate-y-5 transition-transform duration-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-gradient-shift" />

          <div className="relative backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 rounded-xl p-8 shadow-2xl hover:shadow-purple-500/20">
            {/* Floating Quote Icon */}
            <div className="absolute -top-8 -left-8 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300 animate-float">
              <Quote className="w-8 h-8 text-white" />
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-300 animate-ping" />
            </div>

            {/* Quote Content */}
            <div className="mt-8 mb-8 relative">
              <blockquote className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 leading-relaxed animate-gradient-text">
                "{quote.quote}"
              </blockquote>
              
              {/* Floating Stars */}
              <Star className="absolute -top-4 right-4 w-6 h-6 text-yellow-400 animate-pulse" />
              <Star className="absolute top-0 right-12 w-4 h-4 text-yellow-400 animate-float-delayed" />
            </div>

            {/* Author and Interactive Section */}
            <div className="flex flex-col gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  - {quote.author}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button onClick={() => setLiked(!liked)} 
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110">
                    <Heart className={`w-6 h-6 transition-all duration-300 ${liked ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-400"}`} />
                  </button>

                  <button onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110">
                    <Copy className={`w-6 h-6 transition-all duration-300 ${copied ? "text-blue-500 scale-110" : "text-gray-400"}`} />
                  </button>

                  <button onClick={() => setBookmarked(!bookmarked)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110">
                    <Bookmark className={`w-6 h-6 transition-all duration-300 ${bookmarked ? "fill-yellow-500 text-yellow-500 scale-110" : "text-gray-400"}`} />
                  </button>

                  <button onClick={fetchQuote}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110">
                    <RefreshCw className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                  </button>
                </div>
              </div>

              {/* Add Thought Section */}
              <div className="relative">
                {!showThoughtInput ? (
                  <button
                    onClick={() => setShowThoughtInput(true)}
                    className="w-full px-6 py-3 text-left text-gray-500 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300"
                  >
                    Share your thoughts on this quote...
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userThought}
                      onChange={(e) => setUserThought(e.target.value)}
                      placeholder="Type your thoughts..."
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all duration-300"
                    />
                    <button
                      onClick={handleAddThought}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Display Thoughts */}
              {thoughts.length > 0 && (
                <div className="space-y-4 mt-4">
                  {thoughts.map((thought, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-purple-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300">{thought.text}</p>
                      </div>
                      <button
                        onClick={() => {
                          const newThoughts = [...thoughts];
                          newThoughts[index].likes += 1;
                          setThoughts(newThoughts);
                        }}
                        className="flex items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors duration-300"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{thought.likes}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfDay;