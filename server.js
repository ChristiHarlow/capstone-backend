require("dotenv").config();

const express = require("express");
const cors = require("cors");
const server = express();

// Apply CORS with specific origin and credentials
server.use(
    cors({
        credentials: true,
        origin: [
            "https://christisfavoritethings.com",
            "https://www.christisfavoritethings.com",
            "http://localhost:3000",
        ],
    })
);

// Import database and models
const { db, Favorites } = require("./db/db.js");

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
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
