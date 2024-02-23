require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sequelize = require("./db/db");
const Favorites = require("./models/Favorites");
const ModelName = require("./models/ModelName");

const app = express();

// CORS options
const corsOptions = {
    credentials: true,
    origin:
        process.env.NODE_ENV === "production"
            ? "https://christisfavoritethings.com"
            : "http://localhost:3000",
};

// Enable CORS with the options
app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
    })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

app.get("/favorites", async (req, res) => {
    try {
        const favorites = await Favorites.findAll();
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/modelnames", async (req, res) => {
    try {
        const instances = await ModelName.findAll();
        res.json(instances);
    } catch (error) {
        console.error("Error fetching ModelName instances:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Error handling middleware should be the last piece of middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        // Uncomment below line if your models are not in sync with the db
        // return sequelize.sync();
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
