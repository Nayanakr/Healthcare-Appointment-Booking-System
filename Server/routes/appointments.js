const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET a specific appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    let id = req.params.id;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST a new appointment
router.post("/", async (req, res) => {
  try {
    console.log("Received appointment data:", req.body);

    // Delete any id field from the request body to prevent duplicate key errors
    if (req.body.id !== undefined) {
      console.log("Removing id field from request body");
      delete req.body.id;
    }
    // Create a new appointment using the Appointment model
    const newAppointment = new Appointment({
      // Don't set patientId here - we'll generate it after saving
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      doctor: req.body.doctor,
      department: req.body.department,
      reason: req.body.reason,
      status: req.body.status || "Pending",
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    // Use MongoDB _id directly
    console.log("MongoDB _id:", savedAppointment._id);
    console.log("Appointment saved successfully");

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: savedAppointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT (update) an existing appointment
router.put("/:id", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    let id = req.params.id;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid appointment ID format" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE an appointment
router.delete("/:id", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    let id = req.params.id;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid appointment ID format" });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
      data: deletedAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
