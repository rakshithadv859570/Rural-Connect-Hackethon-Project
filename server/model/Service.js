// models/Service.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional field
  },
  villageId: {
    type: Schema.Types.ObjectId,
    ref: "Village", // Reference to the Village model
    required: true, // Adjust based on your requirements
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Export the Mongoose model
module.exports = mongoose.model("Service", serviceSchema);
