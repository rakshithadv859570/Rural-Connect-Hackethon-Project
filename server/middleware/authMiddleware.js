const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    console.log("Request Headers:", req.headers); // Log headers for debugging
    const token = req.headers['authorization']?.split(' ')[1]; // Use lowercase 'authorization'

    if (!token) {
        return res.status(401).json({ message: "Access token is required" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error("Token Verification Error:", err); // Log the verification error
            return res.status(401).json({ message: "Failed to authenticate token" });
        }
        req.userEmail = decoded.email; // Store email from token in request
        next(); // Call next middleware or route handler
    });
};

module.exports = authMiddleware;
