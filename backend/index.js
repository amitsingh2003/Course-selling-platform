import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT ;
const muri = process.env.URI;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyAor6sJJ0e0ZsnnEquz5ZfvxrimKjquw2w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000" , "https://course-selling-platform-front.onrender.com" ], // Add your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Connect to MongoDB
mongoose
  .connect(muri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if MongoDB fails to connect
  });


// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Chatbot endpoint with better error handling
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Prompt is required",
    });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error with Google Generative AI:", error);
    res.status(500).json({
      error: "AI Service Error",
      message: "Error communicating with Google Generative AI",
      details: error.message,
    });
  }
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Press Ctrl+C to stop the server");
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
