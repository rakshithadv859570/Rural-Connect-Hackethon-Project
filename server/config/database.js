const mongoose = require("mongoose");
const config = require("./config.js");

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
