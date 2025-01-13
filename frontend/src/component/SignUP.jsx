import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import {
  User,
  Mail,
  Lock,
  X,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

function SignUP() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const strength = {
      score: 0,
      hasLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
    };

    let score = 0;
    Object.values(strength).forEach((value) => {
      if (value === true) score++;
    });
    strength.score = score;

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://course-selling-platform-b.onrender.com/user/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("User", JSON.stringify(data.user));
      toast.success("Signup Successful", {
        icon: "🎉",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Error in Signup: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 relative">
        <Link
          to="/"
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <X className="h-5 w-5 text-gray-500" />
        </Link>

        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us and start your journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={handleInputChange}
                className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            {/* Password Strength Indicator */}
            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-full rounded-full transition-all duration-300 ${
                      i < passwordStrength.score
                        ? "bg-gradient-to-r from-purple-600 to-blue-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {passwordStrength.hasLength ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordStrength.hasLength
                        ? "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.hasUpper ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordStrength.hasUpper
                        ? "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.hasNumber ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordStrength.hasNumber
                        ? "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    At least one number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.hasSpecial ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordStrength.hasSpecial
                        ? "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    At least one special character
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || passwordStrength.score < 3}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white 
                ${
                  passwordStrength.score >= 3
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                } 
                transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="font-semibold text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
            Log In
            </button>
          </div>
        </form>
      </div>
      <Login />
    </div>
  );
}

export default SignUP;
