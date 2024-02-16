require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Importing Sequelize instance and models
const sequelize = require("../db/db");
const Favorites = require("./models/Favorites");
const ModelName = require("./models/ModelName"); // Ensure this model is correctly defined and exported

const app = express();

// Middleware
app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? ["https://example.com"] // Replace with your production domain
                : ["http://localhost:3000"],
    })
);
app.use(helmet());
app.use(morgan("dev")); // 'dev' for development, 'combined' for production
app.use(express.json());

// Apply rate limiting to all requests
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per window
    })
);

// Serve static files from 'public' directory
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

// Route for fetching all favorites
app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Example route for another model
app.get("/modelnames", async (req, res) => {
    try {
        const instances = await ModelName.findAll();
        res.json(instances);
    } catch (error) {
        console.error("Error fetching ModelName instances:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Database connection and server start
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, "0.0.0.0", () =>
            console.log(`Server running on port ${PORT}.`)
        );
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
