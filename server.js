require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const Favorites = require("./models/Favorites");

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

// Example Sequelize integration with a route
app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        console.log("Favorites fetched:", favorites);
        res.json({ favorites });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    // Database connection
    sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
});
