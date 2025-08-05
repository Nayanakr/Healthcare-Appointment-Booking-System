const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const bcrypt = require('bcryptjs');

// GET all users (admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from results
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      const { email, password } = req.body;
      console.log("--- LOGIN ATTEMPT ---");
      console.log("Received from frontend:", { email, password });
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (!user) {
      console.log("No user found in MongoDB for email:", email);
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("User found in MongoDB:", user);
    // Check password (plain text)
    if (user.password !== password) {
      console.log("Password does not match for user:", email);
      console.log(
        "Password mismatch. Entered:",
        password,
        "Stored:",
        user.password
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("Login successful for user:", email);
    console.log("Login successful for user:", email);
    res.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("--- REGISTER ATTEMPT ---");
    console.log("Received from frontend:", req.body);
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create new user (plain text password, not secure)
    user = new User({
      username,
      email,
      password,
      role: "user", // Default role
    });

    // Save user
    await user.save();
    console.log("User registered and saved to MongoDB:", user);

    const responseData = {
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
    console.log("API response for registration:", responseData);
    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      const { email, password } = req.body;
      console.log("--- LOGIN ATTEMPT ---");
      console.log("Received from frontend:", { email, password });
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (!user) {
      console.log("No user found in MongoDB for email:", email);
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("User found in MongoDB:", user);
    // Check password (plain text)
    if (user.password !== password) {
      console.log("Password does not match for user:", email);
      console.log(
        "Password mismatch. Entered:",
        password,
        "Stored:",
        user.password
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("Login successful for user:", email);
    console.log("Login successful for user:", email);
    res.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const updateData = { username, email, role };

    // If password is provided, store as plain text (no hashing)
    if (password) {
      updateData.password = password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
