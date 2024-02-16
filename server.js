require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { sequelize, connectToDB } = require("./db/db");
const { Favorites } = require("./db/Favorites");

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

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

// Use the connectToDB function to ensure DB connection before starting the server
connectToDB()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen("0.0.0.0.", () => {
            console.log(`Server running on port ${port}.`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process with an error code
    });
