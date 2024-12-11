const validateDriverData = (req, res, next) => {
  try {
    // Log the incoming data for debugging
    console.log("Incoming data:", req.body);

    // Directly use req.body assuming it is already parsed JSON
    const { basicInfo, cnic, license, vehicle } = req.body;
    const missingFields = [];

    if (!basicInfo) missingFields.push("Basic Info");
    if (!cnic) missingFields.push("CNIC");
    if (!license) missingFields.push("License Info");
    if (!vehicle) missingFields.push("Vehicle Info");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res
        .status(400)
        .json({ message: "Missing required fields", missingFields });
    }

    next();
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(400).json({ message: "Invalid JSON data." });
  }
};

module.exports = validateDriverData;
