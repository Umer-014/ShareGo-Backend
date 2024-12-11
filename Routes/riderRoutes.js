const express = require("express");
const {
  createRider,
  updateRiderById,
  deleteRiderById,
  getAllRiders,
  getRiderById,
} = require("../Controllers/RiderController");

const router = express.Router();

// Create a new rider
router.post("/", createRider);

// Update rider by ID
router.put("/:id", updateRiderById);

// Delete rider by ID
router.delete("/:id", deleteRiderById);

// Get all riders
router.get("/", getAllRiders);

// Get rider by ID
router.get("/:id", getRiderById);

module.exports = router;
