import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcryptjs.hash(password, 10);

    // Create and save the user
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await createdUser.save();

    res.status(201).json({
      message: "User Created Successfully",
      user: {
        id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
