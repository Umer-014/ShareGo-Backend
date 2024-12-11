const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const riderRoutes = require("./Routes/riderRoutes");
const driverRoutes = require("./Routes/DriverRoutes"); // Add driver routes

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(bodyParser.json()); // Parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded requests
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Add options for connection
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });



// API routes
app.use("/api/riders", riderRoutes);
app.use("/api/drivers", driverRoutes); // Add driver API routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the ShareGo API!");
});

// Start server only after successful DB and Cloudinary connection
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on PORT ${process.env.PORT || 4000}`);
});
