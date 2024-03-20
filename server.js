require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Sequelize connection
const sequelize = require("./db/db");
// Sequelize models
const Favorites = require("./models/Favorites");

const app = express();

// Middleware
app.use(cors()); // Apply CORS with default settings
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
    })
);

// Route Handlers
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

// Example Sequelize integration with a route
app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3020;

app.get("/", (req, res) => {
    res.send("Hello from server.js!");
});

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
