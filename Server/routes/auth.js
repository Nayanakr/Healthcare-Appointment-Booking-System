const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const User = require("../models/User");

// JWT Secret removed for simplicity

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with that email or username",
      });
    }

    // Create new user (role will default to 'user' if not specified)
    const newUser = new User({
      username,
      email,
      password, // Store password as plain text (NOT recommended for production)
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password (plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile (unprotected, by id)
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an admin user (for initial setup)
router.post("/create-admin", async (req, res) => {
  try {
    const { username, email, password, adminSecret } = req.body;

    // Simple admin creation protection
    if (adminSecret !== "dymie-admin-setup-secret") {
      return res
        .status(403)
        .json({ message: "Not authorized to create admin" });
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with that email or username",
      });
    }

    // Create admin user
    const adminUser = new User({
      username,
      email,
      password,
      role: "admin",
    });

    await adminUser.save();

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
