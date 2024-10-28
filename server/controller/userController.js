const User = require("../model/userModel.js");
const Village = require("../model/Village.js");
const Service = require("../model/Service.js");
const Feedback = require("../model/Feedback.js");
const Complaint = require("../model/Complain.js");
const axios = require("axios");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv=require('dotenv');
const OTP = require('../model/otpModel.js');
dotenv.config()



// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = user.generateAuthToken();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};




// Configure Nodemailer with your email provider
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  // Helper function to generate a 6-digit OTP
  function generateVerificationCode() {
    return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
  }
  
  // Function to send verification email with OTP
  async function sendVerificationEmail(email, otp) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'Verify your email address',
        text: `Welcome to Rural Connect! Your verification code is: ${otp}`,
      };
      await transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully.");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw error;
    }
  }
  
  const register = async (req, res) => {
    const { fname, lname, email, pincode, password } = req.body;

    // Basic validations
    if (!fname || !lname || !email || !pincode || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
        return res.status(400).json({ message: "Pincode must be a 6-digit number" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password before saving
        const hashedPassword = password;
        const user = new User({ fname, lname, email, pincode, password: hashedPassword });
        await user.save();

        // Check for existing village data
        const existingVillage = await Village.findOne({ pincode });
        if (!existingVillage) {
            // Fetch village data if not present
            const villageResponse = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const villageData = villageResponse.data;

            // Check if pincode data is valid
            if (villageData[0].Status === "Success" && villageData[0].PostOffice.length > 0) {
                const postOffice = villageData[0].PostOffice[0]; // Take the first post office for simplicity
                const village = new Village({
                    pincode: postOffice.Pincode,
                    name: postOffice.Name,
                    district: postOffice.District,
                    division: postOffice.Division,
                    region: postOffice.Region,
                    block: postOffice.Block,
                    state: postOffice.State,
                });
                await village.save();
            }
        }

        // Return user data excluding password
        const { password: _, ...userData } = user.toObject(); // Exclude password from the returned object
        res.status(201).json({ message: "User registered successfully", user: userData });
    } catch (error) {
        console.error("Registration error:", error); // Log the error for debugging
        res.status(500).json({ message: "Error registering user" });
    }
};
const village = async (req, res) => {
    const { villageId } = req.params; // Here villageId is expected to be the pincode

    try {
        let villageData;

        // Attempt to fetch village by pincode
        villageData = await Village.findOne({ pincode: villageId });
        
        // If no data is found, return "Village not found"
        if (!villageData) {
            return res.status(404).json({ message: "Village not found" });
        }

        res.status(200).json(villageData);
    } catch (error) {
        console.error("Error fetching village information:", error);
        res.status(500).json({ message: "Error fetching village information", error: error.message });
    }
};

// Get District Information
const district = async (req, res) => {
    const { districtId } = req.params;
    try {
        const district = await District.findById(districtId);
        if (!district) return res.status(404).send("District not found");
        res.status(200).json(district);
    } catch (error) {
        res.status(500).send("Error fetching district information");
    }
};

// Get User Profile
const profile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Error fetching user profile");
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        user.password = newPassword;
        await user.save();
        res.status(200).send("Password updated successfully");
    } catch (error) {
        res.status(500).send("Error updating password");
    }
};

// Get Service List for a Village
const serviceList = async (req, res) => {
    const { villageId } = req.params;
    try {
        const services = await Service.find({ villageId });
        if (!services || services.length === 0) return res.status(404).send("No services found for this village");
        res.status(200).json(services);
    } catch (error) {
        res.status(500).send("Error fetching services");
    }
};

// Apply for a Service
const serviceApply = async (req, res) => {
    const { villageId, serviceId } = req.params;
    const { userId } = req.body;
    try {
        const service = await Service.findOne({ _id: serviceId, villageId });
        if (!service) return res.status(404).send("Service not found");

        res.status(200).send(`User ${userId} applied for service: ${serviceId}`);
    } catch (error) {
        res.status(500).send("Error applying for service");
    }
};

// Check Application Status
const serviceStatus = async (req, res) => {
    const { villageId, applicationId } = req.params;
    try {
        const application = await Application.findOne({ _id: applicationId, villageId });
        if (!application) return res.status(404).send("Application not found");
        res.status(200).json(application.status);
    } catch (error) {
        res.status(500).send("Error fetching application status");
    }
};

// View Feedback for a Village
const feedback = async (req, res) => {
    const { villageId } = req.params;
    try {
        const feedbacks = await Feedback.find({ villageId });
        if (!feedbacks || feedbacks.length === 0) return res.status(404).send("No feedback found");
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).send("Error fetching feedback");
    }
};

// Submit Feedback for a Village
const feedbackSubmit = async (req, res) => {
    const { villageId } = req.params;
    const { userId, feedbackText } = req.body;
    try {
        const feedback = new Feedback({ villageId, userId, feedbackText });
        await feedback.save();
        res.status(201).send("Feedback submitted successfully");
    } catch (error) {
        res.status(500).send("Error submitting feedback");
    }
};

// View Specific Feedback
const feedbackOne = async (req, res) => {
    const { villageId, feedbackId } = req.params;
    try {
        const feedback = await Feedback.findOne({ _id: feedbackId, villageId });
        if (!feedback) return res.status(404).send("Feedback not found");
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).send("Error fetching feedback");
    }
};

// Chatbot
const Chat = async (req, res) => {
    res.status(200).send("Chat history retrieved");
};

const getChat = async (req, res) => {
    const { message } = req.body;
    res.status(200).send(`Chat received: ${message}`);
};

// View Village Resources
const viewResource = async (req, res) => {
    const { villageId } = req.params;
    try {
        const resources = await Resource.find({ villageId });
        if (!resources || resources.length === 0) return res.status(404).send("No resources found for this village");
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).send("Error fetching resources");
    }
};

// AI-Based Resource Predictions
const AIPredictions = async (req, res) => {
    const { villageId } = req.params;
    res.status(200).send(`AI-based resource predictions for village: ${villageId}`);
};

// View Village Dashboard
const villageDashboard = async (req, res) => {
    const { villageId } = req.params;
    res.status(200).send(`Dashboard for village: ${villageId}`);
};

// View District Dashboard
const districtDahboard = async (req, res) => {
    const { districtId } = req.params;
    res.status(200).send(`Dashboard for district: ${districtId}`);
};

// View Village Performance
const villagePerformance = async (req, res) => {
    const { districtId, villageId } = req.params;
    res.status(200).send(`Performance of village: ${villageId} in district: ${districtId}`);
};

// Generate Village Reports
const villageReports = async (req, res) => {
    const { villageId } = req.params;
    res.status(200).send(`Report for village: ${villageId}`);
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send("User not found");
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting user");
    }
};

// Complaint Submission
const complain = async (req, res) => {
    const { villageId } = req.params;
    const { userId, title, description } = req.body;

    try {
        const newComplaint = await Complaint.create({ villageId, userId, title, description });
        res.status(201).json({ message: "Complaint submitted successfully", data: newComplaint });
    } catch (error) {
        res.status(500).json({ message: "Error submitting complaint", error });
    }
};

// View Complaints List
const viewComplaints = async (req, res) => {
    const { villageId } = req.params;

    try {
        const complaints = await Complaint.find({ villageId });
        res.status(200).json({ data: complaints });
    } catch (error) {
        res.status(500).json({ message: "Error fetching complaints", error });
    }
};
const getPincodeByEmail= async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ pincode: user.pincode });
    } catch (error) {
      console.error("Error retrieving pincode:", error);
      res.status(500).json({ error: 'Internal server error' });
    }}
    const verifyOTP = async (req, res) => {
        const { email, otp } = req.body;
      
        if (!email || !otp) {
          return res.status(400).json({ message: "Email and OTP are required" });
        }
      
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Retrieve OTP from the OTP collection
          const otpDoc = await OTP.findOne({ email, otp });
          if (!otpDoc) {
            // If OTP is invalid, delete the user and OTP document
            await OTP.deleteMany({ email }); // Remove any OTP records for this email
            await User.deleteOne({ email }); // Delete the unverified user record
            return res.status(400).json({ message: "Invalid OTP. User registration has been cancelled." });
          }
      
          // If OTP matches, update user verification status
          user.isVerified = true;
          await user.save();
      
          // Delete the OTP document after successful verification
          await OTP.deleteOne({ _id: otpDoc._id });
      
          res.status(200).json({ message: "OTP verified successfully. Your registration is now confirmed!" });
        } catch (error) {
          console.error("OTP verification error:", error);
          res.status(500).json({ message: "Error verifying OTP" });
        }
      };
      const getvillageblockbypincode=async (req,res)=>
        {
        const {pincode}=req.params;
        try {
            const village = await Village.findOne({ pincode });
            
            if (!village) {
              return res.status(404).json({ error: 'village not found' });
            }
            
            res.json({ pincode: village.block });
          } catch (error) {
            console.error("Error retrieving pincode:", error);
            res.status(500).json({ error: 'Internal server error' });

      }
    }
      
module.exports = {
    login,
    register,
    village,
    district,
    profile,
    changePassword,
    serviceList,
    serviceApply,
    serviceStatus,
    feedback,
    feedbackSubmit,
    feedbackOne,
    Chat,
    getChat,
    viewResource,
    AIPredictions,
    villageDashboard,
    districtDahboard,
    villagePerformance,
    villageReports,
    deleteUser,
    complain,
    viewComplaints,
    getPincodeByEmail,
    verifyOTP,
    generateVerificationCode,
};
