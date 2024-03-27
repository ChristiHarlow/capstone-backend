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

// Enable trust proxy to trust headers set by proxies
app.set('trust proxy', true);

// Middleware
app.use(cors()); // Apply CORS with default settings
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.static("public"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later." // Optional message to be sent when the limit is exceeded
});

// Apply rate limiter to all requests
app.use(limiter);

// Define the root route
app.get('/debugonly', (req, res) => {
    res.send('Welcome to the application!');
});

// Example Sequelize integration with a route
app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        console.log("Favorites fetched:", favorites);
        res.json({ message: "Route is working" });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Christi1 Server Error", details: error.message });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Internal Christi2Global Server Error", details: err.message});
});

// Example route
app.get('/api', (req, res) => {
    res.send('Hello, World!');
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
