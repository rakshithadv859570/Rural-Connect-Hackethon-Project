// models/Feedback.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service", // Reference to the Service model
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Export the Mongoose model
module.exports = mongoose.model("Feedback", feedbackSchema);
