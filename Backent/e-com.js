require("dotenv").config(); // Load environment variables from .env file

// Export the JWT secret key from the environment variable
module.exports = process.env.JWT_SECRET;
