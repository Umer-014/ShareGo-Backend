const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rider", riderSchema);
