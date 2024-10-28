const dotenv = require("dotenv");

dotenv.config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.DB_URI || "mongodb://localhost:27017/your_database",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "default_jwt_secret_key",
        expiresIn: "1h", // Token expiration time
    },
};

module.exports = config;
