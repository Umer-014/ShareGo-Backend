const Rider = require("../Models/Rider");

// Create a new rider
exports.createRider = async (req, res) => {
  try {
    const newRider = new Rider(req.body);
    const savedRider = await newRider.save();
    res.status(201).json(savedRider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update rider by ID
exports.updateRiderById = async (req, res) => {
  try {
    const updatedRider = await Rider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRider) return res.status(404).json({ message: "Rider not found" });
    res.status(200).json(updatedRider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete rider by ID
exports.deleteRiderById = async (req, res) => {
  try {
    const deletedRider = await Rider.findByIdAndDelete(req.params.id);
    if (!deletedRider) return res.status(404).json({ message: "Rider not found" });
    res.status(200).json({ message: "Rider deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all riders
exports.getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find();
    res.status(200).json(riders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get rider by ID
exports.getRiderById = async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) return res.status(404).json({ message: "Rider not found" });
    res.status(200).json(rider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
