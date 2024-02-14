require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const server = express();

// Environment-specific CORS configuration
const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://christisfavoritethings.com",
          "https://www.christisfavoritethings.com",
        ]
      : ["http://localhost:3000"],
};
server.use(cors(corsOptions));

// Security headers
server.use(helmet());

// Logging
server.use(morgan("combined"));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
server.use(apiLimiter);

// Body parsing middleware
server.use(express.json());

// Serve static files - adjust "public" to your static assets directory
server.use(express.static("public"));

// Import database and models
const { db, Favorites } = require("./db/db.js");

// Database connection check
db.authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

// Root route
server.get("/", (req, res) => {
  res.json({ hello: "world!" });
});

// Enhanced favorites route with error handling
server.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorites.findAll({
      order: [["sort", "ASC"]], // Correctly structured order array
    });
    res.json({ favorites }); // Use .json to automatically set Content-Type to application/json
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({
      error: "An error occurred while fetching favorites.",
    });
  }
});

// Simplify port configuration
const port = process.env.PORT || 3001;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
