const Driver = require("../Models/Driver");

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);

    if (!req.body) {
      console.log("Request body is missing");
      return res.status(400).json({ message: "Missing driver data." });
    }

    const { basicInfo, cnic, license, vehicle } = req.body;

    // Log individual sections of the data
    console.log("Basic Info:", basicInfo);
    console.log("CNIC Info:", cnic);
    console.log("License Info:", license);
    console.log("Vehicle Info:", vehicle);

    const missingFields = [];

    // Validate Basic Info
    if (!basicInfo) {
      missingFields.push("basicInfo");
    } else {
      if (!basicInfo.firstName) missingFields.push("basicInfo.firstName");
      if (!basicInfo.lastName) missingFields.push("basicInfo.lastName");
      if (!basicInfo.email) missingFields.push("basicInfo.email");
      if (!basicInfo.phoneNumber) missingFields.push("basicInfo.phoneNumber"); // Validate phone number
      if (!basicInfo.gender) missingFields.push("basicInfo.gender");
      if (!basicInfo.address) missingFields.push("basicInfo.address");
      if (!basicInfo.dateOfBirth) missingFields.push("basicInfo.dateOfBirth");
      if (!basicInfo.profileImage) missingFields.push("basicInfo.profileImage");
    }

    // Validate CNIC Info
    if (!cnic) {
      missingFields.push("cnic");
    } else {
      if (!cnic.cnicNumber) missingFields.push("cnic.cnicNumber");
    }

    // Validate License Info
    if (!license) {
      missingFields.push("license");
    } else {
      if (!license.licenseNumber) missingFields.push("license.licenseNumber");
      if (!license.issueDate) missingFields.push("license.issueDate");
      if (!license.expiryDate) missingFields.push("license.expiryDate");
      if (!license.frontImage) missingFields.push("license.frontImage");
      if (!license.backImage) missingFields.push("license.backImage");
    }

    // Validate Vehicle Info
    if (!vehicle) {
      missingFields.push("vehicle");
    } else if (vehicle.type === "Bike" && vehicle.bikeInfo) {
      if (!vehicle.bikeInfo.vehicleNumber)
        missingFields.push("vehicle.bikeInfo.vehicleNumber");
      if (!vehicle.bikeInfo.company) missingFields.push("vehicle.bikeInfo.company");
      if (!vehicle.bikeInfo.model) missingFields.push("vehicle.bikeInfo.model");
      if (!vehicle.bikeInfo.front) missingFields.push("vehicle.bikeInfo.front");
      if (!vehicle.bikeInfo.back) missingFields.push("vehicle.bikeInfo.back");
      if (!vehicle.bikeInfo.right) missingFields.push("vehicle.bikeInfo.right");
      if (!vehicle.bikeInfo.left) missingFields.push("vehicle.bikeInfo.left");
    }

    // If there are missing fields, return a detailed error response
    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    // Create and save the new driver with verification set to "pending"
    const newDriver = new Driver({ basicInfo, cnic, license, vehicle, verification: "pending" });
    await newDriver.validate();
    const savedDriver = await newDriver.save();

    res.status(201).json(savedDriver);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      console.error("Validation errors:", errors);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error("Error creating driver:", err);
    res.status(500).json({ message: "Error creating driver: " + err.message });
  }
};


// Update driver by ID
exports.updateDriverById = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDriver)
      return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(updatedDriver);
  } catch (err) {
    res.status(500).json({ message: "Error updating driver: " + err.message });
  }
};

// Delete driver by ID
exports.deleteDriverById = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver)
      return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting driver: " + err.message });
  }
};

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drivers: " + err.message });
  }
};

// Get driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json({ message: "Error fetching driver: " + err.message });
  }
};