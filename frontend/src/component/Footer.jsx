import React, { useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  Trophy,
  Mail,
  ArrowUpCircle,
  Sparkles,
  Brain,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [showSubscribeSuccess, setShowSubscribeSuccess] = useState(false);

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setShowSubscribeSuccess(true);
      setEmail("");
      setTimeout(() => setShowSubscribeSuccess(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative  bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-white overflow-hidden transition-colors duration-300 border-t border-pink-500 dark:border-purple-500">
      {/* Animated Background Mesh */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${
            mousePosition.y
          }px, 
            ${
              showSubscribeSuccess
                ? "rgba(34,197,94,0.3)"
                : "rgba(219,39,119,0.3)"
            } 0%, transparent 60%)`,
          transition: "background-position 0.3s ease-out",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1,
            }}
          >
            {i % 2 === 0 ? (
              <Sparkles size={Math.random() * 20 + 10} />
            ) : (
              <GraduationCap size={Math.random() * 20 + 10} />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Top Section with Course Categories */}
        

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
              Explore
            </h4>
            {["Home", "Course", "Contact", "About"].map((item) => (
              <a
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="block text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transform hover:translate-x-2 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Join Our Community
            </h4>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 
                         focus:border-pink-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50
                         placeholder-gray-500"
              />
              <button
                onClick={handleSubscribe}
                className="mt-3 px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white
                         transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-pink-500/25 
                         transition-all duration-300 w-full relative overflow-hidden"
              >
                {showSubscribeSuccess ? (
                  <span className="flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Successfully Subscribed!</span>
                  </span>
                ) : (
                  "Get Learning Updates"
                )}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Mail, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 
                           transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25
                           border border-gray-200 dark:border-gray-700"
                >
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Learning Impact
            </h4>
            <div className="space-y-4">
              {[
                { label: "Active Students", value: "10,000+" },
                { label: "Course Completion Rate", value: "94%" },
                { label: "Career Transitions", value: "2,500+" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    {label}
                  </span>
                  <span className="font-bold text-pink-500 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500 dark:border-pink-500 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} E-learn Academy. Empowering learners
              worldwide.
            </p>
            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 
                       transform hover:scale-110 transition-all duration-300 group"
            >
              <ArrowUpCircle className="w-6 h-6 text-white group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
