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
