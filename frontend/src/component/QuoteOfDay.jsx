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
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
  ];

  const fetchQuote = async () => {
    setLoading(true);
    setIsVisible(false);
    setLiked(false);
    setBookmarked(false);

    try {
      const response = await fetch("https://qapi.vercel.app/api/random");
      if (!response.ok) throw new Error("Failed to fetch quote");
      const data = await response.json();
      setQuote({
        quote: data.quote,
        author: data.author,
      });
      setTimeout(() => setIsVisible(true), 100);
    } catch (err) {
      console.error("Error fetching quote:", err);
      const fallbackQuote =
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setQuote(fallbackQuote);
      setTimeout(() => setIsVisible(true), 100);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    // Load thoughts from localStorage
    const savedThoughts = localStorage.getItem("quoteThoughts");
    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts));
    }
  }, []);

  useEffect(() => {
    // Save thoughts to localStorage whenever they change
    localStorage.setItem("quoteThoughts", JSON.stringify(thoughts));
  }, [thoughts]);

  const handleCopy = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
      setCopied(true);
      toast.success("Quote copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy quote");
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    const shareText = `"${quote.quote}" - ${quote.author}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Quote of the Day",
          text: shareText,
          url: window.location.href,
        });
        toast.success("Quote shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Quote copied to clipboard!");
      }
    } catch (err) {
      toast.error("Failed to share quote");
    }
  };

  const handleDeleteThought = (thoughtId) => {
    const thought = thoughts.find((t) => t.id === thoughtId);
    if (!thought) return;

    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Delete this thought?</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => {
                setThoughts((prev) => prev.filter((t) => t.id !== thoughtId));
                toast.success("Thought deleted successfully");
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  const handleAddThought = () => {
    if (userThought.trim()) {
      const newThought = {
        id: Date.now(),
        text: userThought,
        likes: 0,
        timestamp: new Date().toISOString(),
        isNew: true,
      };

      setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
      setUserThought("");
      setShowThoughtInput(false);
      toast.success("Thought shared successfully!");

      setTimeout(() => {
        setThoughts((prev) =>
          prev.map((t) => (t.id === newThought.id ? { ...t, isNew: false } : t))
        );
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddThought();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <div className="relative w-full h-full min-h-[600px] perspective-1000 mt-10">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* 3D Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Main Quote Card */}
      <div
        className={`relative max-w-3xl mx-auto transform-gpu transition-all duration-1000 
        ${
          isVisible
            ? "translate-y-0 opacity-100 rotate-y-0"
            : "translate-y-10 opacity-0 rotate-y-180"
        }`}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-50 transition duration-1000 animate-gradient-shift" />

          <div className="relative backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 rounded-xl p-8 shadow-2xl hover:shadow-purple-500/20">
            {/* Quote Icon */}
            <div className="absolute -top-8 -left-8 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float">
              <Quote className="w-8 h-8 text-white" />
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-300 animate-ping" />
            </div>

            {/* Quote Content */}
            <div className="mt-8 mb-8">
              <blockquote className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 leading-relaxed animate-gradient-text">
                "{quote.quote}"
              </blockquote>
            </div>

            {/* Author and Interactive Section */}
            <div className="flex flex-col gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  - {quote.author}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setLiked(!liked);
                      toast.success(
                        liked ? "Removed from favorites" : "Added to favorites"
                      );
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95"
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
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95"
                  >
                    <Copy
                      className={`w-6 h-6 transition-all duration-300 ${
                        copied ? "text-blue-500 scale-110" : "text-gray-400"
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      setBookmarked(!bookmarked);
                      toast.success(
                        bookmarked
                          ? "Removed from bookmarks"
                          : "Added to bookmarks"
                      );
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95"
                  >
                    <Bookmark
                      className={`w-6 h-6 transition-all duration-300 ${
                        bookmarked
                          ? "fill-yellow-500 text-yellow-500 scale-110"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95"
                  >
                    <Share2 className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                  </button>

                  <button
                    onClick={fetchQuote}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95"
                  >
                    <RefreshCw className="w-6 h-6 text-gray-400 hover:text-purple-500" />
                  </button>
                </div>
              </div>

              {/* Add Thought Section */}
              <div className="relative">
                {!showThoughtInput ? (
                  <button
                    onClick={() => setShowThoughtInput(true)}
                    className="w-full px-6 py-3 text-left text-gray-500 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      Share your thoughts on this quote...
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userThought}
                      onChange={(e) => setUserThought(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your thoughts..."
                      className="flex-1 px-4 py-2 dark:bg-gray-800 dark:text-white rounded-lg border-2 border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                      onClick={handleAddThought}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Display Thoughts */}
              {thoughts.length > 0 && (
                <div className="space-y-4 mt-4">
                  {thoughts.map((thought) => (
                    <div
                      key={thought.id}
                      className={`flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:opacity-90 ${
                        thought.isNew ? "animate-fade-in" : ""
                      }`}
                    >
                      <MessageCircle className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 dark:text-gray-300 break-words">
                          {thought.text}
                        </p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatTimestamp(thought.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            const newThoughts = thoughts.map((t) =>
                              t.id === thought.id
                                ? { ...t, likes: t.likes + 1 }
                                : t
                            );
                            setThoughts(newThoughts);
                            toast.success("Liked!");
                          }}
                          className="flex items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors duration-300 group"
                        >
                          <ThumbsUp className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                          <span className="text-sm transform group-hover:scale-110 transition-transform">
                            {thought.likes}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteThought(thought.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300 group p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No thoughts message */}
              {thoughts.length === 0 && showThoughtInput && (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                  <p>Be the first to share your thoughts on this quote!</p>
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
