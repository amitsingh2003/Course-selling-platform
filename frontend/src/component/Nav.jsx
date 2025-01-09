import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Authprovider";
import Login from "./Login";
import Logout from "./Logout";
import {
  Home,
  BookOpen,
  MessageCircle,
  Info,
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  User,
} from "lucide-react";

const Nav = () => {
  const [authUser, setAuthUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Course", href: "/Course", icon: BookOpen },
    { title: "Contact", href: "/Contact", icon: MessageCircle },
    { title: "About", href: "/About", icon: Info },
    { title: "My Course", href: "/my-courses", icon: GraduationCap },
  ];

  return (
    <nav
      className={`
      fixed top-0 left-0 right-0 z-50 
      transition-all duration-500 ease-in-out
      ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg transform translate-y-0"
          : "bg-white dark:bg-slate-900 transform translate-y-0"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="group relative flex items-center space-x-2">
            <span
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent
              transition-all duration-300 group-hover:scale-110"
            >
              E-Learn
            </span>
            <div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 
              transition-all duration-300 group-hover:w-full"
            ></div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative flex flex-col items-center text-gray-600 dark:text-gray-300 
                  hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
              >
                <item.icon className="w-5 h-5 mb-1 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="text-sm">{item.title}</span>
                <div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-violet-500 
                  transition-all duration-300 group-hover:w-full"
                ></div>
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 
                transition-all duration-300 hover:scale-110 hover:rotate-180"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Auth Section */}
            {authUser ? (
              <div className="relative group">
                <Logout />
              </div>
            ) : (
              <div className="relative group">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="flex items-center space-x-2 px-6 py-2 rounded-full 
                    bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500
                    text-white transition-all duration-300 hover:shadow-lg 
                    hover:shadow-pink-500/30 hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <Login />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 
                transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg
                  text-gray-600 dark:text-gray-300 hover:text-pink-500 
                  dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-slate-800 
                  transition-all duration-300"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
