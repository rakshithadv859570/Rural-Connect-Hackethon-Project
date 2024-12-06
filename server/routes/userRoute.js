const express = require("express");
const {
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
} = require("../controller/userController.js");

const authenticateToken = require("../middleware/authMiddleware.js");
const route = express.Router();

// Public routes
route.post("/login", login);
route.post("/register", register);

// Protected routes with authentication
route.get("/village/:villageId", authenticateToken, village); // Protect the village route
route.get("/district/:districtId", authenticateToken, district);
route.get("/user/:userId/profile", authenticateToken, profile);
route.put("/user/:userId/change-password", authenticateToken, changePassword);
route.get("/village/:villageId/services", authenticateToken, serviceList);
route.get("/village/:villageId/services/:serviceId/apply", authenticateToken, serviceApply);
route.get("/village/:villageId/services/:applicationId/status", authenticateToken, serviceStatus);
route.get("/village/:villageId/feedback", authenticateToken, feedback);
route.post("/village/:villageId/feedback", authenticateToken, feedbackSubmit);  
route.get("/village/:villageId/feedback/:feedbackId", authenticateToken, feedbackOne);
route.get("/assistant/chat", authenticateToken, Chat);
route.post("/assistant/chat", authenticateToken, getChat);
route.get("/village/:villageId/resources", authenticateToken, viewResource);
route.get("/village/:villageId/resources/predictions", authenticateToken, AIPredictions);
route.get("/village/:villageId/dashboard", authenticateToken, villageDashboard);
route.get("/district/:districtId/dashboard", authenticateToken, districtDahboard);
route.get("/district/:districtId/villages/:villageId/performance", authenticateToken, villagePerformance);
route.get("/village/:villageId/reports", authenticateToken, villageReports);
route.delete("/delete/:id", authenticateToken, deleteUser);
route.post("/village/:villageId/complain", authenticateToken, complain); // Protect the complaint submission route
route.get("/village/:villageId/complaints", authenticateToken, viewComplaints);
route.get('/getPincodeByEmail/:email',getPincodeByEmail);
route.get('/verifyOTP',verifyOTP);
route.get('/generateVerificationCode',generateVerificationCode);

module.exports = route;
