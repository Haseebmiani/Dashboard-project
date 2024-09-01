const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    try {
      // Extract the token part from "Bearer <token>"
      token = token.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, "e-comrace"); // Ensure this key matches the one used in login
      req.user = decoded; // Attach the decoded token payload to req.user
    } catch (error) {
      console.log("Invalid token:", error.message); // Log the specific error message
    }
  } else {
    console.log("Authorization header is missing or malformed");
  }

  next(); // Proceed to the next middleware or route handler
}

module.exports = verifyToken;
