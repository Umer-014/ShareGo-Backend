const express = require("express");
const multer = require("multer");
const {
  createDriver,
  updateDriverById,
  deleteDriverById,
  getAllDrivers,
  getDriverById,
} = require("../Controllers/DriverController");
const validateDriverData = require("../Middlewares/validateDriverData");

const router = express.Router();

// Multer setup for handling file uploads
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// Define fields for image uploads
const uploadFields = [
  { name: "frontCnic", maxCount: 1 },
  { name: "backCnic", maxCount: 1 },
  { name: "frontLicense", maxCount: 1 },
  { name: "backLicense", maxCount: 1 },
  { name: "frontVehicle", maxCount: 1 },
  { name: "rightVehicle", maxCount: 1 },
  { name: "leftVehicle", maxCount: 1 },
  { name: "backVehicle", maxCount: 1 },
];

// Create a new driver with image uploads
router.post("/",  validateDriverData, createDriver);

// Update driver by ID
router.put("/:id", validateDriverData, updateDriverById);

// Delete driver by ID
router.delete("/:id", deleteDriverById);

// Get all drivers
router.get("/", getAllDrivers);

// Get driver by ID
router.get("/:id", getDriverById);

module.exports = router;
