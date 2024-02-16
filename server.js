// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sequelize = require("./db/index");
const Favorites = require("./models/Favorites");

const app = express();

app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === "production"
                ? [
                      "https://christisfavoritethings.com",
                      "https://www.christisfavoritethings.com",
                  ]
                : ["http://localhost:3000"],
    })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.get("/", (req, res) => res.json({ message: "Welcome to the API!" }));

app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Additional routes and logic...

sequelize
    .authenticate()
    .then(() => console.log("Database connected."))
    .catch((err) => console.error("Unable to connect to the database:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
