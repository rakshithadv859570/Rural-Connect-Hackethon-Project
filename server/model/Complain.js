// models/Complain.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const complainSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending", // Could be pending, resolved, etc.
  },
  villageId: {
    type: Schema.Types.ObjectId,
    ref: "Village",
    required: false, // Optional: complaint could be about a village
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: false, // Optional: complaint could be about a service
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Export the Mongoose model
module.exports = mongoose.model("Complain", complainSchema);
