import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import  cors from "cors";
import userRoute from "./route/user.route.js";


dotenv.config();

const app = express(); // Initialize `app` before using it
const port = process.env.PORT || 5000;
const muri = process.env.URI;

// Middleware
app.use(express.json()); // To parse JSON requests

app.use(cors());
// Connect to MongoDB
mongoose
  .connect(muri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


  app.use("/book", bookRoute); // Use `app` after initialization
  app.use("/user", userRoute); // Use `app` after initialization


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});  