// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const sequelize = require("./db/db"); // Import Sequelize instance
const Favorites = require("./Favorites"); // Import Favorites model

// Create Express application instance
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

// Example route to fetch favorites
app.get("/favorites", async (req, res) => {
    try {
        // Fetch all records from the Favorites table
        const favorites = await Favorites.findAll();
        console.log("Favorites fetched:", favorites);
        res.json({ favorites }); // Send fetched records as JSON response
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

    // Connect to the database
    sequelize.authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
});

