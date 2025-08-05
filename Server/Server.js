const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - IMPORTANT: This must come BEFORE other middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// Additional CORS headers for extra safety
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://n54366712:2bWSf3BiqIcUEdrK@cluster0.fehtsad.mongodb.net/hospital-db";

// Connect to MongoDB Atlas - simplified connection
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas successfully");

    // Create a unique index on patientId field using createIndex
    mongoose.connection.db
      .collection("appointments")
      .createIndex(
        { patientId: 1 },
        { unique: true, sparse: true },
        (err, result) => {
          if (err) {
            console.error("Error creating index:", err);
          } else {
            console.log("Index created successfully:", result);
          }
        }
      );

    // Insert 5 dummy doctors if not already present
    try {
      const User = require("./models/User");
      const doctors = [
        {
          username: "drsmith",
          email: "drsmith@example.com",
          password: "doc12345",
          role: "doctor",
        },
        {
          username: "drjones",
          email: "drjones@example.com",
          password: "doc12345",
          role: "doctor",
        },
        {
          username: "drlee",
          email: "drlee@example.com",
          password: "doc12345",
          role: "doctor",
        },
        {
          username: "drpatel",
          email: "drpatel@example.com",
          password: "doc12345",
          role: "doctor",
        },
        {
          username: "drwong",
          email: "drwong@example.com",
          password: "doc12345",
          role: "doctor",
        },
      ];
      for (const doc of doctors) {
        const exists = await User.findOne({ email: doc.email });
        if (!exists) {
          await User.create(doc);
          console.log(`Dummy doctor created: ${doc.username}`);
        }
      }
    } catch (err) {
      console.error("Error inserting dummy doctors:", err);
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Nayana Hospital API is running");
});

// API test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Connection to Nayana Hospital backend successful!",
    success: true,
  });
});

// Import routes
const appointmentRoutes = require("./routes/appointments");
const userRoutes = require("./routes/users");

// Use routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
