const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js'); // Import the database connection function
const userRoutes = require('./routes/userRoute.js');
const cors = require('cors');
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes); // Set up user routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
