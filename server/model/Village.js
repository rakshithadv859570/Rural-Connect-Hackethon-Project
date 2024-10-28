// models/Village.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const villageSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    unique: true // Setting this field as unique to act as a primary key
  },
  name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Export the Mongoose model
const Village = mongoose.model('Village', villageSchema);
module.exports = Village;