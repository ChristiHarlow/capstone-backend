require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { sequelize, Favorites, connectToDB } = require("./db/db.js");

const app = express();

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
app.use(cors(corsOptions));

// Security headers
app.use(helmet());

// Logging
app.use(morgan("combined"));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter); // Apply rate limiting to API routes

// Body parsing middleware
app.use(express.json());

// Serve static files - adjust "public" to your static assets directory
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.json({ hello: "world!" });
});

// Enhanced favorites route with error handling
app.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorites.findAll({
      order: [["sort", "ASC"]], // Correctly structured order array
    });
    res.json(favorites); // Simplified response
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({
      error: "An error occurred while fetching favorites.",
    });
  }
});

<<<<<<< Updated upstream
// Simplify port configuration
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
=======
// Attempt to connect to the database before starting the server
connectToDB()
  .then(() => {
    console.log("Database connected successfully.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
>>>>>>> Stashed changes
