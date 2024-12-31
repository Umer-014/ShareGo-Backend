const mongoose = require('mongoose');

// Define schemas for modularity

// Schema for Basic Information
const basicInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  profileImage: { type: String, required: true }, 
});

// Schema for CNIC Information
const cnicSchema = new mongoose.Schema({
  cnicNumber: { type: String, required: true, unique: true }, 
});

// Schema for License Information
const licenseSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  frontImage: { type: String, required: true }, 
  backImage: { type: String, required: true },  
});

// Schema for Vehicle Information
const bikeInfoSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  company: { type: String, required: true },
  model: { type: String, required: true },
  engineNumber: { type: String, required: true },
  front: { type: String, required: true }, 
  right: { type: String, required: true },
  left: { type: String, required: true },
  back: { type: String, required: true },
});

const carInfoSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  company: { type: String, required: true },
  model: { type: String, required: true },
  engineNumber: { type: String, required: true },
  front: { type: String, required: true }, 
  right: { type: String, required: true },
  left: { type: String, required: true },
  back: { type: String, required: true },
});

// Main Driver Schema
const driverSchema = new mongoose.Schema({
  basicInfo: basicInfoSchema, // Embeds Basic Info
  cnic: cnicSchema,          // Embeds CNIC Info
  license: licenseSchema,    // Embeds License Info
  vehicle: {
    type: { type: String, enum: ['Bike', 'Car'], required: true }, // Bike or Car
    bikeInfo: bikeInfoSchema, // Embedded Bike Info
    carInfo: carInfoSchema,   // Embedded Car Info
  },
  verification: { type: String, default: 'pending'},
  createdAt: { type: Date, default: Date.now },
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
