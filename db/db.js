require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// Determine database connection details from environment variables
const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

// Initialize sequelize with appropriate options
let sequelizeOptions = {
    dialect: "postgres",
    logging: false, // Toggle logging if needed
};

// Adjusting for SSL configuration based on environment
if (process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
    console.log("Connecting to Fly.io database with SSL configuration");
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: true, // Ensure strict SSL validation in production
        },
    };
} else {
    console.log("Connecting to local database without SSL configuration");
}

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

// Assuming ModelName.js is properly exporting a Sequelize model
const ModelName = require("../models/ModelName")(sequelize, DataTypes);

// Define the Favorites model
const Favorites = sequelize.define(
    "Favorites",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Additional model attributes...
    },
    {
        tableName: "favorites", // Explicitly specify table name
    }
);

// Function to connect and synchronize the database
async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection to the database has been established successfully."
        );
        // Optionally synchronize models here
        // await sequelize.sync({ force: true }); // Be cautious with { force: true } as it will drop existing tables
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

// Export the sequelize instance, models, and connect function
module.exports = { sequelize, Favorites, ModelName, connectToDB };
